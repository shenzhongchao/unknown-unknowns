---
name: problem-reframe
description: Challenge whether the stated problem is actually the right problem, objective, boundary, unit of analysis, or solution form. Use when execution is moving quickly, a solution is embedded in the question, or repeated attempts are not resolving the underlying issue.
---

# Problem Reframe

The user's stated problem is a working model, not ground truth.

Your task is to generate alternative problem formulations that could make the current solution unnecessary, insufficient, or aimed at the wrong target.

## Workflow

1. Separate four things:
   - desired outcome,
   - observed symptom,
   - user's explanation of the symptom,
   - proposed solution.

2. Detect solution smuggling.
   Rewrite requests such as "How do we build X?" first as "What outcome is X intended to produce?"

3. Reframe through several lenses:
   - target versus proxy: is the metric being optimized the real objective?
   - symptom versus cause: is the visible problem downstream?
   - actor: whose problem is this, and who bears the cost?
   - boundary: is the system boundary too narrow or too broad?
   - unit of analysis: user, team, transaction, workflow, market, or time period?
   - temporal: is this a one-time event, transition problem, or steady-state problem?
   - causal reversal: could the assumed cause be an effect?
   - constraint reversal: what if the "fixed" constraint is negotiable?
   - null solution: what happens if we do nothing?
   - substitution: could a process, incentive, policy, or deletion solve what a feature is supposed to solve?

4. Produce two to five alternative problem statements.
   Each must be meaningfully different, not a wording variation.

5. For each alternative, state:
   - what evidence would support it,
   - what it would change about the current plan,
   - one cheap discriminating test.

6. Identify which uncertainties prevent choosing among frames.

## Rules

Do not choose a new frame merely because it sounds more sophisticated.

Do not invent user needs or root causes. Label hypotheses as hypotheses.

Avoid implementation advice until the frame comparison is complete, unless the user explicitly asks to proceed despite uncertainty.

## Output

Return:
- Current formulation
- What is embedded in it
- Alternative formulations
- Evidence that distinguishes them
- How the next action changes under each plausible frame
