# unknown-unknowns

**Find the edges of your current model — then design probes that make hidden unknowns easier to reveal.**

This repository contains agent skills for epistemic boundary work: challenging hidden assumptions, escaping problem frames, separating evidence from belief, and knowing when more reasoning should stop and contact with reality should begin.

> A literal unknown unknown cannot be enumerated in advance. If it can already be named, it is no longer fully unknown. These skills do not promise completeness; they aim to expose model boundaries and create conditions where surprises become visible sooner.

See [docs/epistemic-model.md](docs/epistemic-model.md) for the full model.

## Quick start

No npm publication is required. Install directly from GitHub:

```bash
npx --yes github:shenzhongchao/unknown-unknowns install
```

By default this installs all bundled skills at user scope for both Codex and Claude Code.

Install only for Codex:

```bash
npx --yes github:shenzhongchao/unknown-unknowns install --agent codex
```

Install only the main skill:

```bash
npx --yes github:shenzhongchao/unknown-unknowns install unknown-unknowns --agent codex
```

Install the reality-probe skill by itself:

```bash
npx --yes github:shenzhongchao/unknown-unknowns install probe-design --agent codex
```

Install into the current repository instead of your user profile:

```bash
npx --yes github:shenzhongchao/unknown-unknowns install --scope project
```

When the package is later published to npm, the same CLI can be used as:

```bash
npx unknown-unknowns install
```

## Supported targets

| Agent | User scope | Project scope |
| --- | --- | --- |
| Codex | `~/.agents/skills` | `<repo>/.agents/skills` |
| Claude Code | `~/.claude/skills` | `<repo>/.claude/skills` |

The installer copies the canonical skill folders from this repository into the appropriate target. It does not edit your agent configuration files.

## Skills

| Skill | Purpose |
| --- | --- |
| `unknown-unknowns` | Main orchestrator: find current-model boundaries, escape frame-lock, classify uncertainty, and design surprise-seeking probes. |
| `probe-design` | Turn unresolved uncertainty into low-cost, discriminating contact with reality; define surprise conditions and decision rules. |
| `assumption-audit` | Turn explicit and implicit assumptions into a falsifiable assumption ledger. |
| `problem-reframe` | Challenge whether the stated problem is the right problem, boundary, objective, or unit of analysis. |
| `premortem` | Assume the plan failed and work backward to expose neglected failure modes and leading indicators. |
| `outside-view` | Use reference classes, analogies, and base-rate thinking without inventing statistics. |
| `evidence-gap` | Map important claims to evidence, disconfirming evidence, and the cheapest useful next information. |

## The core loop

```text
Current model
    ↓
Boundary scan
    ↓
Alternative frames
    ↓
Reasoning / evidence / reality boundary
    ↓
Discriminating probes
    ↓
Observe surprises and anomalies
    ↓
Reframe / update
```

The crucial rule is: **do not keep thinking when only new observations can resolve the uncertainty.**

A good probe is not merely a validation task. It states competing explanations, creates a small contact with reality, defines what would surprise the current model, and changes the next action depending on the result.

## Use

Codex can explicitly invoke installed skills with `$skill-name`:

```text
$unknown-unknowns Audit this product idea before we start building.
```

```text
$probe-design We think matching quality causes low conversion. Design the cheapest probes that could prove us wrong.
```

Claude Code exposes skills as slash commands:

```text
/unknown-unknowns Audit this product idea before we start building.
```

You can also ask the agent normally; good skill descriptions allow compatible hosts to select skills implicitly.

## What the project targets

It helps to distinguish three levels:

1. **Known unknowns** — gaps the user already knows exist.
2. **Out-of-frame unknowns** — variables absent from the current problem representation but nameable from another frame, stakeholder, domain, or reference class.
3. **Genuine unknown unknowns** — mechanisms not represented by the user, skill author, or model's accessible frame.

The reasoning skills mainly target level 2.

Level 3 cannot be guaranteed by prompting. The project instead tries to increase exposure to it through anomalies, experiments, deployment, independent replication, missing stakeholders, edge cases, and other reality-facing probes.

## CLI

```text
unknown-unknowns install [skill|all] [--agent codex|claude|all] [--scope user|project] [--force] [--dry-run]
unknown-unknowns uninstall [skill|all] [--agent codex|claude|all] [--scope user|project] [--dry-run]
unknown-unknowns list
unknown-unknowns doctor [--agent codex|claude|all] [--scope user|project]
```

Useful examples:

```bash
# See what is bundled
npx --yes github:shenzhongchao/unknown-unknowns list

# Preview without writing anything
npx --yes github:shenzhongchao/unknown-unknowns install --agent codex --dry-run

# Replace a previously installed copy
npx --yes github:shenzhongchao/unknown-unknowns install --agent codex --force

# Remove the installed skills
npx --yes github:shenzhongchao/unknown-unknowns uninstall --agent all

# Check skill metadata and target directories
npx --yes github:shenzhongchao/unknown-unknowns doctor
```

## Design principles

The collection is an **Explorer / Critic / Probe layer before an Executor**.

It should help answer:

- Are we solving the wrong problem?
- Which assumptions carry most of the plan?
- What is outside the current system boundary?
- Which uncertainty can still be resolved by reasoning?
- Which uncertainty now requires external evidence or behavior?
- What observation would make the current model fail visibly?
- What anomaly would force us to reframe rather than patch locally?

The skills avoid both performative agreement and reflexive contrarianism. The goal is not to make the agent negative; it is to make beliefs easier to falsify.

They also explicitly guard against **checklist closure**: scanning familiar categories is not evidence that the unknown space has been exhausted.

## Evaluation

This repository includes a paired benchmark for checking whether the main skill exposes out-of-frame blind spots beyond a strong baseline assistant and whether it proposes decision-relevant probes rather than generic research.

Validate the benchmark structure:

```bash
npm run eval:validate
```

Run a reproducible baseline-vs-skill comparison with the OpenAI Responses API:

```bash
export OPENAI_API_KEY=...
npm run eval:run -- --model gpt-5.6-sol --judge-model gpt-5.6-sol
```

The generator does **not** see the benchmark's expected hidden targets. A judge model scores target recall, frame expansion, assumption quality, decision relevance, falsifiability, calibration, restraint, and probe quality.

A benchmark with prewritten targets tests recovery of **hidden knowns**, not literal unknown unknowns. The longer-term research question is whether this workflow causes real projects to encounter important surprises earlier and more cheaply.

See `evals/README.md`, `evals/RUBRIC.md`, and reports under `evals/results/`.

## Development

Requires Node.js 18 or newer.

```bash
npm test
npm run eval:validate
node ./bin/unknown-unknowns.js list
node ./bin/unknown-unknowns.js install --scope project --dry-run
```

## License

MIT
