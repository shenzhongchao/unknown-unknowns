import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const cli = path.join(repoRoot, 'bin', 'unknown-unknowns.js');

function run(args, options = {}) {
  return spawnSync(process.execPath, [cli, ...args], {
    cwd: options.cwd ?? repoRoot,
    env: { ...process.env, ...options.env },
    encoding: 'utf8',
  });
}

test('list exposes bundled skills', () => {
  const result = run(['list']);
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /unknown-unknowns/);
  assert.match(result.stdout, /assumption-audit/);
  assert.match(result.stdout, /probe-design/);
});

test('install, overwrite guard, force, and uninstall work for Codex user scope', () => {
  const home = fs.mkdtempSync(path.join(os.tmpdir(), 'unknown-unknowns-'));
  const env = { HOME: home, USERPROFILE: home };
  try {
    let result = run(['install', 'unknown-unknowns', '--agent', 'codex', '--scope', 'user'], { env });
    assert.equal(result.status, 0, result.stderr);

    const installed = path.join(home, '.agents', 'skills', 'unknown-unknowns', 'SKILL.md');
    assert.equal(fs.existsSync(installed), true);

    result = run(['install', 'unknown-unknowns', '--agent', 'codex', '--scope', 'user'], { env });
    assert.equal(result.status, 1);
    assert.match(result.stderr, /already exists/);

    result = run(['install', 'unknown-unknowns', '--agent', 'codex', '--scope', 'user', '--force'], { env });
    assert.equal(result.status, 0, result.stderr);

    result = run(['uninstall', 'unknown-unknowns', '--agent', 'codex', '--scope', 'user'], { env });
    assert.equal(result.status, 0, result.stderr);
    assert.equal(fs.existsSync(installed), false);
  } finally {
    fs.rmSync(home, { recursive: true, force: true });
  }
});

test('project scope installs into both supported agent directories', () => {
  const project = fs.mkdtempSync(path.join(os.tmpdir(), 'unknown-unknowns-project-'));
  try {
    const result = run(['install', 'probe-design', '--agent', 'all', '--scope', 'project'], { cwd: project });
    assert.equal(result.status, 0, result.stderr);
    assert.equal(fs.existsSync(path.join(project, '.agents', 'skills', 'probe-design', 'SKILL.md')), true);
    assert.equal(fs.existsSync(path.join(project, '.claude', 'skills', 'probe-design', 'SKILL.md')), true);
  } finally {
    fs.rmSync(project, { recursive: true, force: true });
  }
});
