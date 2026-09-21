# Eval rubric

This benchmark measures whether the skills expose decision-relevant blind spots that a capable baseline assistant may leave inside the user's frame, and whether they know when to stop reasoning and design contact with reality.

It is **not** a benchmark for pessimism, verbosity, the number of risks listed, or literal discovery of unknowable unknowns.

## Generation conditions

Each case is answered twice with the same model:

- **baseline** — a normal helpful-assistant instruction.
- **treatment** — the same instruction plus the canonical `skills/unknown-unknowns/SKILL.md`.

The generator never sees `hidden_targets` or `restraint_trap`. Those are judge-only fields.

Cases have three tiers:

- **sanity** — useful regression cases; some may be easy for strong models.
- **hard** — the proposed action is locally plausible, but a higher-level frame or reality probe is needed to avoid premature commitment.
- **control** — simple reversible tasks where excessive reframing should be penalized.

## Judge dimensions

Score each response from 0 to 4 on every dimension.

| Dimension | 0 | 2 | 4 |
| --- | --- | --- | --- |
| Frame expansion | Accepts the user's frame completely | Notices one possible framing issue | Finds a materially different frame that could change the plan |
| Assumption quality | Generic risks only | Identifies some implicit assumptions | Identifies high-leverage hidden assumptions and explains why they matter |
| Decision relevance | Mostly commentary | Some implications for the decision | Focuses on uncertainties that could actually change the next action |
| Falsifiability | No way to test claims | Gives vague validation ideas | Gives concrete cheap tests, falsifiers, or discriminating evidence |
| Calibration | Presents speculation as fact | Mixed labeling | Clearly separates facts, inferences, assumptions, and hypotheses |
| Restraint | Reflexive agreement or reflexive contrarianism | Mostly balanced | Challenges only where useful and still answers/advances the user's task |
| Probe quality | No reality-facing test, or only generic "research more" | Proposes a test but it weakly distinguishes explanations | Defines competing models, observable outcomes, surprise conditions, and a result-dependent decision rule |

## Target recall

Each case contains benchmark-author targets in `hidden_targets`.

For each target, judge whether the response **substantively surfaces the idea**, not whether it repeats exact wording.

`target_recall = targets_hit / total_targets`

These targets are **hidden knowns**: they are known to the benchmark author. They do not prove genuine unknown-unknown discovery. They are a controlled proxy for frame escape, assumption discovery, and probe design.

## Restraint penalty

Each case also contains a `restraint_trap`. Judge:

- 0 — no violation
- 1 — mild overreach
- 2 — material overreach that reduces usefulness
- 3 — severe overreach / invents facts / derails the task

Control cases matter. A skill that improves blind-spot recall but challenges every simple request is not successful.

## Aggregate score

The runner reports:

1. **Target recall** — fraction of benchmark hidden targets surfaced.
2. **Rubric mean** — mean of the seven 0–4 dimensions.
3. **Restraint penalty** — reported separately.

It also supports tier-specific runs so hard cases can be tracked without easy sanity cases hiding regressions.

Primary success criteria:

- treatment target recall improves on **hard** cases,
- treatment probe quality improves,
- treatment rubric mean improves,
- control-case restraint does not degrade materially.

## Methodological cautions

This is a synthetic benchmark. It cannot test literal unknowable unknowns.

A model-as-judge can share biases with the generator. For stronger claims, repeat with multiple generator models, multiple judge models, shuffled A/B order, and human review.

Do not tune the skill against the exact benchmark cases indefinitely. Add fresh holdout cases when changing the skill.

The strongest eventual evidence is longitudinal: does this workflow cause real projects to encounter important surprises earlier, more cheaply, or more safely than comparable work without it?
