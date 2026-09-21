# Evals

The eval suite compares a normal assistant response with the same model instructed by the `unknown-unknowns` skill.

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

The runner uses the Responses API directly with Node's built-in `fetch`; no SDK dependency is required.

Useful options:

```text
--model <id>          generator model (or OPENAI_MODEL)
--judge-model <id>    judge model (defaults to generator model)
--case <id>           run one case
--limit <n>           run first n cases
--out <path>          JSON result path
--max-output <n>      generation token ceiling
```

Raw baseline/treatment outputs, judge decisions, aggregate metrics, and model IDs are written to the result JSON.

## Why judge-only targets?

If the generation prompt contains the expected blind spots, the benchmark only measures instruction following. Keeping targets hidden forces the skill to discover them from its general procedure.

See [RUBRIC.md](./RUBRIC.md) for scoring details.
