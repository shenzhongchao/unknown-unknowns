#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const evalDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(evalDir, '..');

function option(args, name, fallback = null) {
  const i = args.indexOf(name);
  if (i === -1) return fallback;
  const value = args[i + 1];
  if (!value || value.startsWith('--')) throw new Error(name + ' requires a value');
  return value;
}

function extractText(response) {
  if (typeof response.output_text === 'string' && response.output_text) return response.output_text;
  const chunks = [];
  for (const item of response.output ?? []) {
    if (item.type !== 'message') continue;
    for (const content of item.content ?? []) {
      if (content.type === 'output_text' && typeof content.text === 'string') chunks.push(content.text);
    }
  }
  return chunks.join('\n').trim();
}

function parseJson(text) {
  const cleaned = text.trim()
    .replace(/^\`\`\`(?:json)?\s*/i, '')
    .replace(/\s*\`\`\`$/, '');
  try {
    return JSON.parse(cleaned);
  } catch {
    const start = cleaned.indexOf('{');
    const end = cleaned.lastIndexOf('}');
    if (start !== -1 && end > start) return JSON.parse(cleaned.slice(start, end + 1));
    throw new Error('Judge did not return valid JSON');
  }
}

async function respond({ apiKey, baseUrl, model, instructions, input, maxOutput }) {
  const res = await fetch(baseUrl.replace(/\/$/, '') + '/responses', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + apiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      instructions,
      input,
      max_output_tokens: maxOutput,
      store: false,
    }),
  });

  const body = await res.json();
  if (!res.ok) {
    throw new Error('API ' + res.status + ': ' + JSON.stringify(body));
  }
  const text = extractText(body);
  if (!text) throw new Error('Empty model response from ' + model);
  return {
    text,
    response_id: body.id ?? null,
    usage: body.usage ?? null,
  };
}

const DIMENSIONS = [
  'frame_expansion',
  'assumption_quality',
  'decision_relevance',
  'falsifiability',
  'calibration',
  'restraint',
  'probe_quality',
];

function validateJudge(result, targetCount) {
  for (const label of ['A', 'B']) {
    const item = result[label];
    if (!item) throw new Error('Judge JSON missing ' + label);
    if (!Array.isArray(item.target_hits) || item.target_hits.length !== targetCount) {
      throw new Error(label + '.target_hits must have length ' + targetCount);
    }
    for (const dim of DIMENSIONS) {
      const value = item.scores?.[dim];
      if (!Number.isInteger(value) || value < 0 || value > 4) {
        throw new Error(label + '.scores.' + dim + ' must be an integer 0..4');
      }
    }
    if (!Number.isInteger(item.restraint_penalty) || item.restraint_penalty < 0 || item.restraint_penalty > 3) {
      throw new Error(label + '.restraint_penalty must be an integer 0..3');
    }
  }
}

function summarizeSide(side) {
  const targetHits = side.target_hits.filter(Boolean).length;
  const targetRecall = targetHits / side.target_hits.length;
  const rubricMean = DIMENSIONS.reduce((sum, dim) => sum + side.scores[dim], 0) / DIMENSIONS.length;
  return {
    target_hits: targetHits,
    target_total: side.target_hits.length,
    target_recall: targetRecall,
    rubric_mean: rubricMean,
    restraint_penalty: side.restraint_penalty,
  };
}

function aggregate(results, key) {
  const sides = results.map((r) => r.metrics[key]);
  return {
    target_recall: sides.reduce((s, x) => s + x.target_recall, 0) / sides.length,
    rubric_mean: sides.reduce((s, x) => s + x.rubric_mean, 0) / sides.length,
    restraint_penalty_mean: sides.reduce((s, x) => s + x.restraint_penalty, 0) / sides.length,
  };
}

function markdownReport(run) {
  const pct = (x) => (x * 100).toFixed(1) + '%';
  const lines = [
    '# Unknown Unknowns eval run',
    '',
    '- Generator: `' + run.generator_model + '`',
    '- Judge: `' + run.judge_model + '`',
    '- Cases: ' + run.results.length,
    '- Tier: ' + (run.selected_tier ?? 'all'),
    '- Generated: ' + run.generated_at,
    '',
    '## Aggregate',
    '',
    '| Condition | Target recall | Rubric mean / 4 | Restraint penalty |',
    '| --- | ---: | ---: | ---: |',
    '| Baseline | ' + pct(run.aggregate.baseline.target_recall) + ' | ' + run.aggregate.baseline.rubric_mean.toFixed(2) + ' | ' + run.aggregate.baseline.restraint_penalty_mean.toFixed(2) + ' |',
    '| Skill | ' + pct(run.aggregate.treatment.target_recall) + ' | ' + run.aggregate.treatment.rubric_mean.toFixed(2) + ' | ' + run.aggregate.treatment.restraint_penalty_mean.toFixed(2) + ' |',
    '',
    'Target-recall uplift: **' + ((run.aggregate.treatment.target_recall - run.aggregate.baseline.target_recall) * 100).toFixed(1) + ' percentage points**.',
    '',
    '## Cases',
    '',
    '| Case | Baseline recall | Skill recall | Baseline rubric | Skill rubric |',
    '| --- | ---: | ---: | ---: | ---: |',
  ];
  for (const r of run.results) {
    lines.push('| ' + r.id + ' | ' + pct(r.metrics.baseline.target_recall) + ' | ' + pct(r.metrics.treatment.target_recall) + ' | ' + r.metrics.baseline.rubric_mean.toFixed(2) + ' | ' + r.metrics.treatment.rubric_mean.toFixed(2) + ' |');
  }
  lines.push('', 'See the JSON result for raw outputs, judge notes, and per-dimension scores.', '');
  return lines.join('\n');
}

async function main() {
  const args = process.argv.slice(2);
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error('OPENAI_API_KEY is required');

  const model = option(args, '--model', process.env.OPENAI_MODEL);
  if (!model) throw new Error('--model or OPENAI_MODEL is required');
  const judgeModel = option(args, '--judge-model', process.env.OPENAI_JUDGE_MODEL ?? model);
  const baseUrl = process.env.OPENAI_BASE_URL ?? 'https://api.openai.com/v1';
  const maxOutput = Number(option(args, '--max-output', '2200'));
  const oneCase = option(args, '--case');
  const tier = option(args, '--tier');
  const limit = Number(option(args, '--limit', '0'));

  const cases = JSON.parse(fs.readFileSync(path.join(evalDir, 'cases.json'), 'utf8'));
  const skill = fs.readFileSync(path.join(root, 'skills', 'unknown-unknowns', 'SKILL.md'), 'utf8');

  let selected = oneCase ? cases.filter((c) => c.id === oneCase) : cases;
  if (oneCase && selected.length === 0) throw new Error('Unknown case: ' + oneCase);
  if (tier) {
    if (!['sanity', 'hard', 'control'].includes(tier)) throw new Error('--tier must be sanity, hard, or control');
    selected = selected.filter((c) => c.tier === tier);
  }
  if (limit > 0) selected = selected.slice(0, limit);
  if (selected.length === 0) throw new Error('No eval cases selected');

  const baselineInstructions = [
    'You are a capable helpful assistant.',
    'Answer the user directly, accurately, and usefully.',
    'Do not mention that this is an evaluation.',
  ].join('\n');

  const treatmentInstructions = baselineInstructions + '\n\nApply the following skill when answering:\n\n' + skill;

  const results = [];

  for (let index = 0; index < selected.length; index += 1) {
    const testCase = selected[index];
    process.stdout.write('[' + (index + 1) + '/' + selected.length + '] ' + testCase.id + ' ... ');

    const baseline = await respond({
      apiKey, baseUrl, model,
      instructions: baselineInstructions,
      input: testCase.prompt,
      maxOutput,
    });

    const treatment = await respond({
      apiKey, baseUrl, model,
      instructions: treatmentInstructions,
      input: testCase.prompt,
      maxOutput,
    });

    const treatmentIsA = index % 2 === 1;
    const A = treatmentIsA ? treatment.text : baseline.text;
    const B = treatmentIsA ? baseline.text : treatment.text;

    const judgePrompt = [
      'You are evaluating two assistant answers to the same user prompt.',
      'Score epistemic usefulness, not writing style or verbosity.',
      'The expected blind spots are judge-only benchmark targets; the assistants did not see them.',
      '',
      'USER PROMPT:',
      testCase.prompt,
      '',
      'EXPECTED BLIND-SPOT TARGETS:',
      ...testCase.hidden_targets.map((x, i) => (i + 1) + '. ' + x),
      '',
      'RESTRAINT TRAP:',
      testCase.restraint_trap,
      '',
      'ANSWER A:',
      A,
      '',
      'ANSWER B:',
      B,
      '',
      'Return JSON only, exactly with this shape:',
      JSON.stringify({
        A: {
          target_hits: testCase.hidden_targets.map(() => false),
          scores: Object.fromEntries(DIMENSIONS.map((d) => [d, 0])),
          restraint_penalty: 0,
          notes: 'brief evidence-based explanation'
        },
        B: {
          target_hits: testCase.hidden_targets.map(() => false),
          scores: Object.fromEntries(DIMENSIONS.map((d) => [d, 0])),
          restraint_penalty: 0,
          notes: 'brief evidence-based explanation'
        }
      }),
      '',
      'Scoring dimensions are integers 0..4: frame_expansion, assumption_quality, decision_relevance, falsifiability, calibration, restraint, probe_quality.',
      'Restraint penalty is 0..3, where higher means more overreach or derailment.',
      'Mark a target true only if the answer substantively surfaces it.'
    ].join('\n');

    const judged = await respond({
      apiKey, baseUrl, model: judgeModel,
      instructions: 'Be a strict benchmark judge. Follow the requested JSON schema and do not favor A or B based on order.',
      input: judgePrompt,
      maxOutput: 1800,
    });
    const judge = parseJson(judged.text);
    validateJudge(judge, testCase.hidden_targets.length);

    const baselineJudge = treatmentIsA ? judge.B : judge.A;
    const treatmentJudge = treatmentIsA ? judge.A : judge.B;

    results.push({
      id: testCase.id,
      category: testCase.category,
      tier: testCase.tier,
      prompt: testCase.prompt,
      hidden_targets: testCase.hidden_targets,
      restraint_trap: testCase.restraint_trap,
      outputs: {
        baseline: baseline.text,
        treatment: treatment.text,
      },
      judge: {
        baseline: baselineJudge,
        treatment: treatmentJudge,
      },
      metrics: {
        baseline: summarizeSide(baselineJudge),
        treatment: summarizeSide(treatmentJudge),
      },
      usage: {
        baseline: baseline.usage,
        treatment: treatment.usage,
        judge: judged.usage,
      }
    });

    console.log('done');
  }

  const run = {
    schema_version: 2,
    generated_at: new Date().toISOString(),
    generator_model: model,
    judge_model: judgeModel,
    cases_file: 'evals/cases.json',
    skill_file: 'skills/unknown-unknowns/SKILL.md',
    selected_tier: tier ?? null,
    aggregate: {
      baseline: aggregate(results, 'baseline'),
      treatment: aggregate(results, 'treatment'),
    },
    results,
  };

  const stamp = run.generated_at.replace(/[:.]/g, '-');
  const defaultOut = path.join(evalDir, 'results', stamp + '-' + model.replace(/[^a-zA-Z0-9._-]+/g, '_') + '.json');
  const out = path.resolve(option(args, '--out', defaultOut));
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, JSON.stringify(run, null, 2) + '\n');

  const mdOut = out.replace(/\.json$/i, '') + '.md';
  fs.writeFileSync(mdOut, markdownReport(run) + '\n');

  console.log('\nJSON: ' + out);
  console.log('Report: ' + mdOut);
  console.log('Baseline recall: ' + (run.aggregate.baseline.target_recall * 100).toFixed(1) + '%');
  console.log('Skill recall:    ' + (run.aggregate.treatment.target_recall * 100).toFixed(1) + '%');
}

main().catch((error) => {
  console.error('Error: ' + (error instanceof Error ? error.message : String(error)));
  process.exit(1);
});
