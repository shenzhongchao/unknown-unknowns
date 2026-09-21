# unknown-unknowns

A small collection of agent skills for one problem: **helping AI notice what the user may not realize they are missing**.

The goal is not to make an agent argumentative. It is to make it epistemically useful: challenge hidden assumptions, inspect the problem frame, look for missing evidence, use outside views, and surface plausible blind spots before execution.

## Quick start

No npm publication is required. Install directly from GitHub:

```bash
npx --yes github:shenzhongchao/unknown-unknowns install
```

By default this installs all bundled skills at user scope for both Codex and Claude Code.

Install only for Codex:

```bash
npx --yes github:shenzhongchao/unknown-unknowns install --agent codex
```

Install only one skill:

```bash
npx --yes github:shenzhongchao/unknown-unknowns install unknown-unknowns --agent codex
```

Install into the current repository instead of your user profile:

```bash
npx --yes github:shenzhongchao/unknown-unknowns install --scope project
```

When the package is later published to npm, the same CLI can be used as:

```bash
npx unknown-unknowns install
```

## Supported targets

| Agent | User scope | Project scope |
| --- | --- | --- |
| Codex | `~/.agents/skills` | `<repo>/.agents/skills` |
| Claude Code | `~/.claude/skills` | `<repo>/.claude/skills` |

The installer copies the canonical skill folders from this repository into the appropriate target. It does not edit your agent configuration files.

## Skills

| Skill | Purpose |
| --- | --- |
| `unknown-unknowns` | General cognitive-boundary scan. Best default when you suspect the framing itself may be incomplete. |
| `assumption-audit` | Turns explicit and implicit assumptions into a falsifiable assumption ledger. |
| `problem-reframe` | Challenges whether the stated problem is the right problem, boundary, objective, or unit of analysis. |
| `premortem` | Assumes the plan failed and works backward to expose neglected failure modes and leading indicators. |
| `outside-view` | Uses reference classes, analogies, and base-rate thinking without inventing statistics. |
| `evidence-gap` | Maps important claims to evidence, disconfirming evidence, and the cheapest useful next information. |

## Use

Codex can explicitly invoke installed skills with `$skill-name`. For example:

```text
$unknown-unknowns Audit this product idea before we start building.
```

Claude Code exposes skills as slash commands. For example:

```text
/unknown-unknowns Audit this product idea before we start building.
```

You can also ask the agent normally; good skill descriptions allow compatible hosts to select skills implicitly.

## CLI

```text
unknown-unknowns install [skill|all] [--agent codex|claude|all] [--scope user|project] [--force] [--dry-run]
unknown-unknowns uninstall [skill|all] [--agent codex|claude|all] [--scope user|project] [--dry-run]
unknown-unknowns list
unknown-unknowns doctor [--agent codex|claude|all] [--scope user|project]
```

Useful examples:

```bash
# See what is bundled
npx --yes github:shenzhongchao/unknown-unknowns list

# Preview without writing anything
npx --yes github:shenzhongchao/unknown-unknowns install --agent codex --dry-run

# Replace a previously installed copy
npx --yes github:shenzhongchao/unknown-unknowns install --agent codex --force

# Remove the installed skills
npx --yes github:shenzhongchao/unknown-unknowns uninstall --agent all

# Check skill metadata and target directories
npx --yes github:shenzhongchao/unknown-unknowns doctor
```

## Design principles

These skills deliberately distinguish **candidate unknown unknowns** from facts. An agent cannot logically enumerate truly unknown unknowns; it can only use other frames, actors, reference classes, anomalies, counterfactuals, and evidence gaps to expose regions that deserve investigation.

They also avoid performative agreement. The agent should not say an idea is great or bad merely to match the user's tone. It should state what is observed, what is inferred, what is uncertain, and what evidence would change the decision.

The collection is designed as an **Explorer / Critic layer before an Executor**. It should help answer questions such as:

- Are we solving the wrong problem?
- Which assumptions are carrying most of the plan?
- Who or what is missing from the frame?
- What would have to be true for this plan to fail?
- What does the outside view say?
- Which missing fact would most change the next action?

## Development

Requires Node.js 18 or newer.

```bash
npm test
node ./bin/unknown-unknowns.js list
node ./bin/unknown-unknowns.js install --scope project --dry-run
```

## License

MIT
