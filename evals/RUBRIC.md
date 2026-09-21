# Eval rubric

This benchmark measures whether the skills expose decision-relevant blind spots that a capable baseline assistant may leave inside the user's frame.

It is **not** a benchmark for pessimism, verbosity, or the number of risks listed.

## Generation conditions

Each case is answered twice with the same model:

- **baseline** — a normal helpful-assistant instruction.
- **treatment** — the same instruction plus the canonical `skills/unknown-unknowns/SKILL.md`.

The generator never sees `hidden_targets` or `restraint_trap`. Those are judge-only fields.

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

## Target recall

Each case contains benchmark-author blind spots in `hidden_targets`.

For each target, judge whether the response **substantively surfaces the idea**, not whether it repeats exact wording.

`target_recall = targets_hit / total_targets`

These targets are not asserted to be a complete list of true unknown unknowns. They are a controlled proxy for whether the skill reaches outside the user's initial frame.

## Restraint penalty

Each case also contains a `restraint_trap`. Judge:

- 0 — no violation
- 1 — mild overreach
- 2 — material overreach that reduces usefulness
- 3 — severe overreach / invents facts / derails the task

Control cases matter. A skill that improves blind-spot recall but challenges every simple request is not successful.

## Aggregate score

The runner reports two components rather than hiding them in one number:

1. **Target recall** — fraction of benchmark blind spots surfaced.
2. **Rubric mean** — mean of the six 0–4 dimensions.

It also reports the restraint penalty separately.

Primary success criterion for v1:

- treatment target recall improves over baseline,
- treatment rubric mean improves,
- control-case restraint does not degrade materially.

## Methodological cautions

This is a synthetic benchmark. It tests designed blind spots, not unknowable unknowns themselves.

A model-as-judge can share biases with the generator. For stronger claims, repeat with multiple generator models, multiple judge models, shuffled A/B order, and human review.

Do not tune the skill against the exact benchmark cases indefinitely. Add fresh holdout cases when changing the skill.
