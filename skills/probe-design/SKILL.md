---
name: probe-design
description: Design low-cost, reality-facing probes that can reveal surprises when a decision-relevant uncertainty cannot be resolved by more reasoning. Use after a blind-spot scan, when competing explanations remain plausible, or when the next step should maximize learning before commitment.
---

# Probe Design

The goal is not merely to validate a hypothesis. The goal is to create contact with reality that can make the current model fail visibly.

A probe should be valuable even when the result is unexpected.

## First principle

Unknown-unknown discovery is not a reasoning problem alone. It is an exploration problem.

Once a key uncertainty requires new behavior, new data, a different environment, or an external actor, stop substituting more speculation for observation.

## Workflow

### 1. Name the current model

State the belief or causal story currently driving the decision.

Example:
> Low conversion is mainly caused by poor matching.

### 2. Generate competing models

List two to four materially different explanations that would lead to different actions.

Avoid trivial variants of the same story.

Example:
- matching quality is poor,
- inventory is stale,
- trust is insufficient,
- transaction friction occurs after matching.

### 3. Locate the uncertainty type

Classify what is needed:

- **behavioral** — what people actually do,
- **causal** — what changes what,
- **boundary** — where the mechanism stops working,
- **operational** — what fails in repeated use,
- **environmental** — whether it transfers to another context,
- **adversarial** — how incentives or attackers change behavior,
- **measurement** — whether the observed signal means what we think,
- **stakeholder** — whether a missing actor changes the system.

### 4. Design the smallest discriminating probe

A good probe separates competing models.

For each probe specify:

- **Question:** what uncertainty is being reduced?
- **Competing models:** what explanations are in play?
- **Action:** what will actually be done?
- **Observable:** what data, behavior, or failure will be captured?
- **Expected under each model:** what would each explanation predict?
- **Surprise condition:** what outcome would be hard to explain under the current preferred model?
- **Decision rule:** what changes after each meaningful outcome?
- **Cost and reversibility:** why this probe is cheap enough now?
- **Contamination risk:** could the probe itself distort the behavior being measured?

### 5. Optimize for surprise, not confirmation

Prefer tests with multiple plausible outcomes.

Weak:
> Ask users whether they like the idea.

Stronger:
> Offer the workflow with real setup cost and measure completion, repeated use, abandonment point, and unsolicited workarounds.

Weak:
> Ask the team whether matching is the bottleneck.

Stronger:
> Instrument the full funnel and inspect where qualified transactions actually die.

### 6. Search the edges

At least one probe should target a boundary rather than the average case.

Examples:
- lowest-performing cohort,
- first-time users,
- users who churned,
- extreme data distributions,
- another site or population,
- degraded dependencies,
- peak load,
- an actor with opposing incentives.

Unknown mechanisms often appear first at boundaries.

### 7. Preserve anomalies

Do not automatically classify surprising observations as noise.

Before running the probe define:
- what will be logged,
- what counts as an anomaly,
- when an anomaly gets investigated,
- when repeated anomalies trigger a problem reframe.

### 8. Stop conditions

Define when not to continue.

A probe should be able to produce:
- proceed,
- narrow,
- reframe,
- or stop.

If every possible result leads to "keep building," the probe is not decision-relevant.

## Probe families

Use these as generators, not a checklist:

- **Removal probe** — remove the thing assumed essential.
- **Null baseline** — compare against doing nothing or a simple heuristic.
- **Behavioral commitment** — require time, money, data, or workflow change.
- **Shadow deployment** — observe without affecting production decisions.
- **Canary / boundary test** — expose a small slice to real conditions.
- **Counterexample search** — deliberately sample where the theory should fail.
- **Missing-stakeholder probe** — put the artifact in front of an actor excluded from the current frame.
- **Environment transfer** — repeat in another population, site, tool, or time period.
- **Independent replication** — use a separate person, model, implementation, or measurement path.
- **Instrumentation probe** — measure the process before choosing an intervention.

## Rules

Do not invent empirical results.

Do not call a thought experiment an experiment.

Do not propose expensive research when a cheaper discriminating observation exists.

Do not optimize only for statistical rigor when the current decision needs a fast, reversible learning step.

Do not confuse "collect more data" with a probe. State what observation would discriminate which models.

## Output

Return:

- Current model
- Competing models
- Highest-value uncertainty
- Probe design
- Surprise conditions
- Decision rules
- Anomaly capture
- Residual unknowns
