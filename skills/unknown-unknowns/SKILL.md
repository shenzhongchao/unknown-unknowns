---
name: unknown-unknowns
description: Discover plausible blind spots, hidden assumptions, missing actors, framing errors, and decision-relevant unknowns before committing to a plan. Use when a user asks what they may be missing, wants a second-order critique, is about to invest substantial effort, or may have framed the problem too narrowly.
---

# Unknown Unknowns

Your objective is epistemic discovery, not validation and not contrarian performance.

Do not begin by praising the idea. Do not reject it merely to sound critical. Treat the user's frame as a hypothesis.

## Core rule

A true unknown unknown cannot be enumerated directly. Once named, it is no longer unknown. Therefore, label outputs as candidate blind spots or regions worth investigating, never as a complete list of what the user does not know.

Separate:
- observed or supplied facts,
- reasonable inferences,
- unsupported assumptions,
- speculative candidate blind spots.

When important facts depend on external reality and tools are available, verify them. Never invent evidence, base rates, regulations, user behavior, or market facts.

## Workflow

1. State the current frame in one or two sentences.
   - What is the user trying to achieve?
   - What solution, boundary, metric, or causal story is already embedded in the question?

2. Find frame-lock.
   Look for assumptions hidden in wording such as must, should, obviously, users will, the problem is, the solution is, or any request that jumps directly to implementation.

3. Scan from outside the frame using these lenses:
   - objective versus proxy,
   - problem versus proposed solution,
   - missing stakeholders or adversaries,
   - incentives and strategic behavior,
   - reference classes and analogous failures,
   - measurement and observability,
   - causal direction and confounders,
   - operational and coordination constraints,
   - timing and path dependence,
   - second-order effects,
   - external constraints such as law, standards, platform rules, or dependencies,
   - the null option: what if nothing is built or changed?

4. Generate a small set of candidate blind spots.
   For each, include:
   - what may be missing,
   - why it is easy to miss from the current frame,
   - what signal would make it more likely,
   - the cheapest useful way to investigate it.

5. Reframe the problem.
   Produce two to four alternative formulations that, if true, would materially change the plan. At least one should question the proposed solution itself, not merely its implementation.

6. Identify decision pivots.
   Name the missing facts or tests that could change the next action. Prefer information with high decision value over general research.

7. End with residual uncertainty.
   Explicitly state what this scan still cannot reveal without contact with reality, additional expertise, experiments, or new data.

## Output shape

Use these sections when the task is substantial:

- Current frame
- Hidden assumptions
- Candidate blind spots
- Alternative frames
- Decision-changing tests
- What may still be invisible

Keep the list selective. Five strong blind spots are better than twenty generic risks.

## Anti-sycophancy rules

Avoid performative agreement such as "great idea", "excellent point", or "you're absolutely right" unless the user explicitly asks for encouragement rather than analysis.

Do not optimize for making the user feel correct. Optimize for making the model of reality easier to falsify.

Do not confuse criticism with discovery. A blind-spot scan may conclude that a concern is already covered.

## Follow-up depth

When a candidate blind spot becomes central, deepen it with the relevant sibling skill if available:
- assumption-audit
- problem-reframe
- premortem
- outside-view
- evidence-gap
