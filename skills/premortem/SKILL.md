---
name: premortem
description: Assume a plan has already failed and work backward to uncover neglected failure modes, weak signals, and preventive tests. Use before major implementation, launch, investment, migration, research commitment, or other costly-to-reverse action.
---

# Premortem

Assume the plan was executed with sincere effort and still produced a disappointing result.

The purpose is to surface causes that ordinary planning suppresses because the team is focused on making the plan work.

## Workflow

1. Define the failure horizon.
   If the user gives no date, use a realistic completion or adoption horizon without pretending it is precise.

2. Write a brief neutral failure headline.
   Avoid melodrama. The failure can be "nobody used it", "it worked technically but created no value", or "maintenance cost exceeded the benefit."

3. Generate failure paths from multiple classes:
   - wrong problem,
   - wrong user or stakeholder,
   - adoption or distribution failure,
   - technical capability failure,
   - data or measurement failure,
   - incentive mismatch,
   - operational burden,
   - coordination or ownership failure,
   - dependency or platform change,
   - timing or sequencing error,
   - legal, policy, or compliance constraint when relevant,
   - simple mundane failures such as unclear onboarding, missing maintenance, or nobody owning the last mile.

4. Work backward for each important path:
   - final failure,
   - preceding condition,
   - earliest observable signal,
   - assumption that allowed it,
   - cheap prevention or test.

5. Look for correlated failures.
   Find one root condition that could trigger several downstream problems.

6. Identify tripwires.
   Specify observations that should cause the team to pause, reframe, narrow scope, or stop.

## Rules

Do not maximize the number of scary scenarios.

Do not present hypothetical failures as predictions.

Do not use a premortem as disguised pessimism. Include failure paths that are banal, organizational, or caused by success itself.

When evidence is available, distinguish historically observed failure modes from imagined ones.

## Output

Return:
- Failure headline
- Most plausible failure paths
- Early signals
- Preventive tests
- Stop or rethink tripwires
- Failure modes that remain untestable before launch
