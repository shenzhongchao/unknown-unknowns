# Evals

The eval suite compares a normal assistant response with the same model instructed by the `unknown-unknowns` skill.

It measures **out-of-frame discovery and probe design**, not literal discovery of unknowable unknowns. The benchmark author's hidden targets are still known to the benchmark author.

## Tiers

- `sanity` — regression cases; several are intentionally easy for strong models.
- `hard` — locally plausible plans where the important issue sits outside the initial frame and good answers should design discriminating contact with reality.
- `control` — simple reversible tasks where excessive epistemic analysis should be penalized.

The hard tier is the main signal for future skill changes.

## Validate the benchmark

```bash
npm run eval:validate
```

## Run against the OpenAI Responses API

Set an API key and choose generator/judge models:

```bash
export OPENAI_API_KEY=...
npm run eval:run -- --model gpt-5.6-sol --judge-model gpt-5.6-sol
```

Run only the hard tier:

```bash
npm run eval:run -- --model gpt-5.6-sol --judge-model gpt-5.6-sol --tier hard
```

The runner uses the Responses API directly with Node's built-in `fetch`; no SDK dependency is required.

Useful options:

```text
--model <id>          generator model (or OPENAI_MODEL)
--judge-model <id>    judge model (defaults to generator model)
--case <id>           run one case
--tier <tier>         sanity, hard, or control
--limit <n>           run first n selected cases
--out <path>          JSON result path
--max-output <n>      generation token ceiling
```

Raw baseline/treatment outputs, judge decisions, aggregate metrics, model IDs, and selected tier are written to the result JSON.

## What is scored

The judge scores:
- hidden-target recall,
- frame expansion,
- assumption quality,
- decision relevance,
- falsifiability,
- calibration,
- restraint,
- probe quality.

`probe_quality` rewards responses that define competing explanations, observable outcomes, surprise conditions, and decision rules instead of saying only "validate this" or "collect more data."

## Why judge-only targets?

If the generation prompt contains the expected blind spots, the benchmark only measures instruction following. Keeping targets hidden forces the skill to recover them from its general procedure.

Even so, these are **hidden knowns**, not true unknown unknowns. See [../docs/epistemic-model.md](../docs/epistemic-model.md).

See [RUBRIC.md](./RUBRIC.md) for scoring details.
