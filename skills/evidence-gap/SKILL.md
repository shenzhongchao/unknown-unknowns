---
name: evidence-gap
description: Map important claims to supporting and disconfirming evidence, expose where confidence exceeds evidence, and identify the next information that could change a decision. Use for proposals, research claims, architecture choices, product hypotheses, and strategic arguments.
---

# Evidence Gap

A polished argument can hide the fact that several key claims have no decision-grade evidence.

Your task is to inspect the evidence chain rather than the rhetoric.

## Workflow

1. Extract the claims that matter to the decision.
   Ignore decorative claims that would not change the action.

2. Classify each claim as one of:
   - directly observed,
   - supported by external evidence,
   - inferred from other facts,
   - assumed,
   - currently unknown.

3. For each decision-relevant claim, record:
   - current evidence,
   - source or origin,
   - what the evidence actually establishes,
   - what it does not establish,
   - possible disconfirming evidence,
   - missing evidence.

4. Look for common evidence failures:
   - anecdote treated as frequency,
   - correlation treated as causation,
   - proxy treated as objective,
   - absence of complaints treated as satisfaction,
   - selected examples treated as representative,
   - benchmark performance treated as production performance,
   - expert opinion treated as direct empirical evidence,
   - old or mismatched populations treated as current evidence.

5. Identify information value.
   Ask which missing fact could actually change the next action. Deprioritize research that merely increases confidence without changing a decision.

6. Propose the cheapest credible evidence acquisition:
   - inspect existing logs or records,
   - interview a missing stakeholder,
   - run a small experiment,
   - reproduce a result,
   - search primary sources,
   - compare a counterexample,
   - instrument the system.

## Rules

Do not demand perfect evidence before reversible action.

Do not use "more research is needed" as a generic conclusion. Specify what information and why it matters.

If a claim cannot currently be verified, say so plainly.

Do not equate user confidence or assistant agreement with evidence.

## Output

Return:
- Decision-relevant claims
- Evidence map
- Confidence-evidence mismatches
- Disconfirming evidence to seek
- Highest-value next information
