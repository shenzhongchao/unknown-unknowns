#!/usr/bin/env node

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.resolve(__dirname, '..');
const skillsRoot = path.join(packageRoot, 'skills');

const AGENTS = {
  codex: {
    user: () => path.join(os.homedir(), '.agents', 'skills'),
    project: () => path.join(process.cwd(), '.agents', 'skills'),
  },
  claude: {
    user: () => path.join(os.homedir(), '.claude', 'skills'),
    project: () => path.join(process.cwd(), '.claude', 'skills'),
  },
};

function usage() {
  console.log([
    'unknown-unknowns - install epistemic audit skills for AI agents',
    '',
    'Usage:',
    '  unknown-unknowns install [skill|all] [--agent codex|claude|all] [--scope user|project] [--force] [--dry-run]',
    '  unknown-unknowns uninstall [skill|all] [--agent codex|claude|all] [--scope user|project] [--dry-run]',
    '  unknown-unknowns list',
    '  unknown-unknowns doctor [--agent codex|claude|all] [--scope user|project]',
    '  unknown-unknowns --version',
    '',
    'Defaults: skill=all, agent=all, scope=user',
  ].join('\n'));
}

function fail(message) {
  console.error('Error: ' + message);
  process.exitCode = 1;
}

function getOption(args, name, fallback) {
  const index = args.indexOf(name);
  if (index === -1) return fallback;
  const value = args[index + 1];
  if (!value || value.startsWith('--')) {
    throw new Error(name + ' requires a value');
  }
  return value;
}

function hasFlag(args, name) {
  return args.includes(name);
}

function selectedAgents(value) {
  if (value === 'all') return ['codex', 'claude'];
  if (value === 'codex' || value === 'claude') return [value];
  throw new Error('--agent must be codex, claude, or all');
}

function availableSkills() {
  if (!fs.existsSync(skillsRoot)) return [];
  return fs.readdirSync(skillsRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .filter((name) => fs.existsSync(path.join(skillsRoot, name, 'SKILL.md')))
    .sort();
}

function parseMetadata(skillName) {
  const file = path.join(skillsRoot, skillName, 'SKILL.md');
  const content = fs.readFileSync(file, 'utf8');
  const match = content.match(/^---\s*\n([\s\S]*?)\n---/);
  if (!match) return { name: null, description: null };
  const name = match[1].match(/^name:\s*(.+)$/m)?.[1]?.trim() ?? null;
  const description = match[1].match(/^description:\s*(.+)$/m)?.[1]?.trim() ?? null;
  return { name, description };
}

function validateSkill(skillName) {
  const metadata = parseMetadata(skillName);
  const errors = [];
  if (!metadata.name) errors.push('missing frontmatter name');
  if (!metadata.description) errors.push('missing frontmatter description');
  if (metadata.name && metadata.name !== skillName) {
    errors.push('frontmatter name "' + metadata.name + '" does not match folder "' + skillName + '"');
  }
  return errors;
}

function resolveSkills(requested) {
  const available = availableSkills();
  if (requested === 'all') return available;
  if (!available.includes(requested)) {
    throw new Error('unknown skill "' + requested + '". Run "unknown-unknowns list".');
  }
  return [requested];
}

function destinationRoot(agent, scope) {
  if (!AGENTS[agent]) throw new Error('unsupported agent: ' + agent);
  if (scope !== 'user' && scope !== 'project') {
    throw new Error('--scope must be user or project');
  }
  return AGENTS[agent][scope]();
}

function installSkill(skill, root, force, dryRun) {
  const source = path.join(skillsRoot, skill);
  const destination = path.join(root, skill);
  if (fs.existsSync(destination) && !force) {
    throw new Error(destination + ' already exists; use --force to replace it');
  }
  console.log((dryRun ? '[dry-run] ' : '') + 'install ' + skill + ' -> ' + destination);
  if (dryRun) return;
  fs.mkdirSync(root, { recursive: true });
  if (fs.existsSync(destination)) fs.rmSync(destination, { recursive: true, force: true });
  fs.cpSync(source, destination, { recursive: true });
}

function uninstallSkill(skill, root, dryRun) {
  const destination = path.join(root, skill);
  if (!fs.existsSync(destination)) {
    console.log('skip ' + skill + ' (not installed at ' + destination + ')');
    return;
  }
  console.log((dryRun ? '[dry-run] ' : '') + 'remove ' + destination);
  if (!dryRun) fs.rmSync(destination, { recursive: true, force: true });
}

function printList() {
  const skills = availableSkills();
  if (skills.length === 0) {
    console.log('No bundled skills found.');
    return;
  }
  for (const skill of skills) {
    const metadata = parseMetadata(skill);
    console.log(skill + '\n  ' + (metadata.description ?? 'No description'));
  }
}

function doctor(agentValue, scope) {
  let ok = true;
  console.log('Node: ' + process.version);
  console.log('Package root: ' + packageRoot);
  console.log('Skills root: ' + skillsRoot);

  const skills = availableSkills();
  if (skills.length === 0) {
    console.log('FAIL: no skills found');
    ok = false;
  }

  for (const skill of skills) {
    const errors = validateSkill(skill);
    if (errors.length) {
      ok = false;
      console.log('FAIL: ' + skill + ': ' + errors.join('; '));
    } else {
      console.log('OK:   ' + skill);
    }
  }

  for (const agent of selectedAgents(agentValue)) {
    const root = destinationRoot(agent, scope);
    const probe = fs.existsSync(root) ? root : path.dirname(root);
    let writable = false;
    try {
      fs.accessSync(probe, fs.constants.W_OK);
      writable = true;
    } catch {
      // A missing nested path may still be creatable if a higher parent is writable.
      let cursor = probe;
      while (!fs.existsSync(cursor) && path.dirname(cursor) !== cursor) {
        cursor = path.dirname(cursor);
      }
      try {
        fs.accessSync(cursor, fs.constants.W_OK);
        writable = true;
      } catch {
        writable = false;
      }
    }
    console.log((writable ? 'OK:   ' : 'WARN: ') + agent + ' target ' + root);
    if (!writable) ok = false;
  }

  if (!ok) process.exitCode = 1;
}

function positionalAfterCommand(args) {
  for (let i = 1; i < args.length; i += 1) {
    if (!args[i].startsWith('--') && args[i - 1] !== '--agent' && args[i - 1] !== '--scope') {
      return args[i];
    }
  }
  return 'all';
}

function main() {
  const args = process.argv.slice(2);
  if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
    usage();
    return;
  }

  if (args.includes('--version') || args.includes('-v')) {
    const pkg = JSON.parse(fs.readFileSync(path.join(packageRoot, 'package.json'), 'utf8'));
    console.log(pkg.version);
    return;
  }

  const command = args[0];
  const agentValue = getOption(args, '--agent', 'all');
  const scope = getOption(args, '--scope', 'user');
  const dryRun = hasFlag(args, '--dry-run');
  const force = hasFlag(args, '--force');

  if (command === 'list') {
    printList();
    return;
  }

  if (command === 'doctor') {
    doctor(agentValue, scope);
    return;
  }

  if (command !== 'install' && command !== 'uninstall') {
    throw new Error('unknown command "' + command + '"');
  }

  const requested = positionalAfterCommand(args);
  const skills = resolveSkills(requested);
  const agents = selectedAgents(agentValue);

  for (const skill of skills) {
    const errors = validateSkill(skill);
    if (errors.length) {
      throw new Error('invalid bundled skill ' + skill + ': ' + errors.join('; '));
    }
  }

  for (const agent of agents) {
    const root = destinationRoot(agent, scope);
    for (const skill of skills) {
      if (command === 'install') installSkill(skill, root, force, dryRun);
      else uninstallSkill(skill, root, dryRun);
    }
  }
}

try {
  main();
} catch (error) {
  fail(error instanceof Error ? error.message : String(error));
}
