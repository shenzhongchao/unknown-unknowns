# Epistemic model

## What this project can and cannot do

The name `unknown-unknowns` is intentionally provocative, but the literal claim needs a limit.

A genuine unknown unknown cannot be enumerated in advance. If the system can already name it, then it is not fully unknown to the system.

This project therefore does **not** claim:

> Give me a prompt and I will list everything you do not know that you do not know.

It aims at a weaker, testable goal:

> Find the edges of the current model, convert some out-of-frame uncertainty into explicit hypotheses, and design interactions with reality that make additional unknowns easier to reveal.

## Three epistemic levels

### Level 1 — Known unknowns

The person already knows a gap exists.

Examples:
- "I do not know the churn rate."
- "I do not know whether this model generalizes."

AI can help search, calculate, research, or design a test.

### Level 2 — Out-of-frame unknowns

The variable is absent from the user's current problem representation, but another model, domain, stakeholder, or reference class makes it nameable.

Examples:
- The user asks for a ranking model, while trust is the actual transaction bottleneck.
- The user asks for an adaptive recommender, while the more valuable product may be diagnosis or navigation.
- The user optimizes a proxy whose relationship to the real objective has not been established.

This is the primary target of the reasoning-oriented skills in this repository.

### Level 3 — Genuine unknown unknowns

The relevant mechanism is not represented by the user, the skill author, or the model's currently accessible conceptual frame.

These cannot be guaranteed by better prompting.

They usually become visible through:
- anomalies,
- failed predictions,
- new environments,
- missing stakeholders,
- adversarial behavior,
- experiments,
- deployment,
- independent replication,
- cross-domain contact.

The system can increase exposure to these events. It cannot promise to name them beforehand.

## The loop

The project therefore uses this loop:

```text
Current model
    ↓
Boundary scan
    ↓
Alternative frames
    ↓
Classify unresolved uncertainty
    ↓
Design discriminating probes
    ↓
Contact with reality
    ↓
Capture anomalies and surprises
    ↓
Reframe / update model
    ↓
New unknowns become visible
```

The critical transition is from **reasoning** to **observation**.

A common failure of AI systems is to continue producing more hypotheses after the decision-relevant uncertainty can no longer be resolved by thought alone.

## Why checklists are dangerous

A blind-spot checklist can itself create false closure.

If an agent checks:

- stakeholders,
- incentives,
- causal direction,
- evidence,
- premortem,
- outside view,

it may feel that the space has been covered.

But a genuine unknown may lie outside every listed lens.

Therefore the lenses in this repository are generators, not a completeness proof.

The final question is not:

> Did we check every category?

It is:

> Where does the current model stop making justified predictions, and what contact with reality could make it fail visibly?

## Evaluation implication

A benchmark with hidden expected answers does not test genuine unknown unknown discovery.

Those expected answers are known to the benchmark author. They are better described as **hidden knowns**.

Such a benchmark can still measure:
- frame expansion,
- assumption discovery,
- recovery of out-of-frame variables,
- calibration,
- restraint,
- probe quality.

But claims about genuine unknown-unknown discovery require longitudinal evidence from real projects: did the workflow cause teams to encounter decision-relevant surprises earlier, more cheaply, or more safely than they otherwise would have?

That is a harder and more honest research question.
