---
name: unknown-unknowns
description: Find the edges of a user's current model, surface out-of-frame assumptions and variables, and design reality-facing probes that make hidden unknowns easier to reveal. Use when a decision may be trapped inside its own framing, when more reasoning is unlikely to resolve key uncertainty, or before costly commitment.
---

# Unknown Unknowns

Your objective is not to enumerate unknowable unknowns. Your objective is to find the edges of the current model and create conditions in which hidden unknowns are more likely to become visible.

Do not begin by praising the idea. Do not reject it merely to sound critical. Treat the user's frame as a provisional model.

## Literal limitation

A true unknown unknown cannot be listed in advance. Once it can be named, it has already become a known unknown or an out-of-frame hypothesis.

Therefore never imply:
- that this scan is complete,
- that all important risks have been found,
- that a checklist can exhaust the unknown,
- that more reasoning alone can reveal everything that matters.

The skill has two jobs:

1. **Boundary discovery** — expose assumptions, omitted variables, alternative frames, and places where the current model is brittle.
2. **Probe design** — identify what cannot be resolved by reasoning alone and design low-cost contact with reality that can produce surprising evidence.

## Epistemic layers

Keep these distinct:

- **Observed facts** — supplied or directly verified.
- **Inferences** — conclusions supported by those facts.
- **Assumptions** — claims the plan depends on but has not established.
- **Candidate blind spots** — plausible variables or frames outside the current model.
- **Residual unknown space** — what remains inaccessible without new observations, actors, environments, or experiments.

Do not promote a candidate blind spot to fact merely because it sounds sophisticated.

## Restraint gate

Before doing a full scan, ask whether the task is simple, reversible, and locally well specified.

If yes:
- note only execution-relevant assumptions,
- solve the task,
- avoid unnecessary stakeholder maps, premortems, or reframing.

Use the full workflow when the decision is costly, ambiguous, strategic, novel, hard to reverse, or strongly dependent on unverified causal claims.

## Workflow

### 1. State the current model

In one or two sentences identify:
- intended outcome,
- proposed solution or action,
- causal story,
- system boundary,
- success signal.

### 2. Detect frame-lock

Look for solution smuggling or hidden certainty:
- "the problem is..."
- "users want..."
- "we just need..."
- "the bottleneck is..."
- "the model should..."
- direct jumps from a symptom to implementation.

Ask what must already be true for the question itself to be the right question.

### 3. Expand outside the frame

Use only lenses that could materially change the decision:

- outcome versus proxy,
- problem versus proposed solution,
- missing stakeholders or adversaries,
- incentives and strategic behavior,
- reference classes,
- causal reversal and confounders,
- measurement and observability,
- operational constraints,
- time and path dependence,
- second-order effects,
- external dependencies, standards, policy, or platform constraints,
- the null option,
- alternative units of analysis,
- evidence from anomalies or edge cases.

Prefer a few high-leverage candidates over a long generic risk list.

### 4. Identify the model boundary

For each important uncertainty, classify it:

- **Reasoning-resolvable** — can be clarified from existing facts, logic, or available sources.
- **Evidence-resolvable** — needs external data, records, primary sources, or expert input.
- **Reality-resolvable** — requires behavior, experiment, deployment, observation, or interaction with an environment.

This is the stopping rule for pure reasoning. Do not keep generating speculation once the uncertainty has crossed into evidence- or reality-resolvable territory.

### 5. Reframe

Produce two to four alternative formulations that would materially change the plan if true.

At least one must question:
- the proposed solution,
- the assumed bottleneck,
- the success metric,
- or the system boundary.

Do not choose an alternative frame merely because it sounds clever.

### 6. Design surprise-seeking probes

For the highest-value unresolved uncertainties, design probes that can expose something the current model does not expect.

Each probe should specify:
- **competing models** — at least two plausible explanations,
- **action** — the smallest credible contact with reality,
- **observable outcome** — what will actually be measured or noticed,
- **surprise condition** — what result would contradict the current model,
- **decision consequence** — how the next action changes,
- **cost / reversibility** — why this is an appropriate probe now.

Prefer probes that are:
- discriminating rather than merely confirmatory,
- cheap before expensive commitment,
- observable,
- reversible,
- capable of producing an unexpected result.

Examples include:
- behavioral tests instead of opinion questions,
- funnel instrumentation before causal optimization,
- shadow or canary deployment,
- exposing a prototype to a missing stakeholder,
- searching for disconfirming cases,
- testing boundary conditions,
- sampling failures rather than averages,
- removing a supposedly essential feature,
- comparing against a null or simple baseline,
- inviting an independent expert or adversarial reviewer,
- running the same task in a different environment or population.

### 7. Define surprise capture

A probe is wasted if anomalies are discarded as noise.

State:
- which unexpected observations should be logged,
- who or what should be allowed to contradict the model,
- what would trigger re-framing instead of local patching.

### 8. End with residual unknowns

Explicitly state what still cannot be known from the current information and planned probes.

The correct ending is not "these are all the blind spots."

The correct ending is closer to:
> These are the current model boundaries we can see. The next probes are designed to make additional boundaries visible.

## Output shape

For substantial tasks, use:

- Current model
- Hidden assumptions / frame-lock
- Candidate out-of-frame variables
- Alternative frames
- Model boundary: reasoning vs evidence vs reality
- Surprise-seeking probes
- Reframe triggers
- What may still be invisible

## Anti-sycophancy and anti-contrarian rules

Avoid performative agreement such as "great idea", "excellent point", or "you're absolutely right" when analysis is requested.

Do not optimize for making the user feel correct.

Also do not optimize for disagreement. Reflexive skepticism is another failure mode.

A useful scan may conclude:
- the frame is adequate,
- the proposed solution remains reasonable,
- only one small assumption needs testing.

## Failure modes of this skill

Actively guard against:

- **Checklist closure** — believing the listed lenses exhaust the unknown.
- **Risk theater** — generating many plausible dangers without decision value.
- **Benchmark overfitting** — repeating familiar blind spots because they scored well before.
- **Reasoning addiction** — continuing to theorize when only new observations can resolve uncertainty.
- **Pseudo-probes** — proposing surveys or experiments whose outcomes cannot change the decision.
- **Confirmation probes** — designing tests that can only support the preferred story.

## Follow-up depth

Use sibling skills when a boundary becomes specific:

- assumption-audit
- problem-reframe
- premortem
- outside-view
- evidence-gap
- probe-design
