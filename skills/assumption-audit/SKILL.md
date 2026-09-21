---
name: assumption-audit
description: Expose the assumptions carrying a plan, claim, product, architecture, research direction, or decision, then turn the fragile ones into falsifiable tests. Use before execution or when a proposal feels persuasive but under-evidenced.
---

# Assumption Audit

Treat every plan as a stack of claims that must be true together.

The goal is not to produce a long risk list. The goal is to identify assumptions whose failure would materially change the decision.

## Workflow

1. Restate the intended outcome separately from the proposed method.

2. Extract explicit assumptions from the user's words.

3. Infer implicit assumptions across relevant categories:
   - desirability: someone actually wants the outcome,
   - feasibility: the mechanism can work,
   - viability: the economics or resource model can work,
   - causality: the proposed action causes the desired result,
   - measurement: success can be observed with the chosen metric,
   - data: required data exists and is representative enough,
   - incentives: participants will behave as assumed,
   - operations: the process can be run repeatedly,
   - dependencies: external systems, people, vendors, or policies remain compatible,
   - timing: the opportunity and sequence are plausible.

4. Build an assumption ledger. For each important assumption record:
   - assumption,
   - why the current plan depends on it,
   - current evidence,
   - evidence against it or absence of evidence,
   - what observation would falsify it,
   - cheapest useful test.

5. Prioritize qualitatively by combining:
   - consequence if false,
   - uncertainty,
   - difficulty or cost of reversing the decision after commitment.

Do not create fake numerical precision unless the user supplies a scoring method.

6. Find assumption chains.
   Highlight cases where several downstream conclusions all depend on one upstream premise.

7. Recommend the next tests.
   Prefer tests that can kill or reshape the plan cheaply before expensive execution.

## Rules

Do not treat confidence, repetition, authority, or polished language as evidence.

Do not turn an assumption into a fact merely because both user and assistant agree on it.

When external facts matter and tools are available, verify them. When they cannot be verified, mark them unresolved.

Do not praise or attack the proposal. Audit it.

## Output

Return:
- Outcome versus proposed method
- Assumption ledger
- Most consequential weak assumptions
- Cheapest falsification tests
- Assumptions still outside the available evidence
