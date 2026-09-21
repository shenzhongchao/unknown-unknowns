import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)));
const cases = JSON.parse(fs.readFileSync(path.join(root, 'cases.json'), 'utf8'));

const errors = [];
if (!Array.isArray(cases) || cases.length < 12) errors.push('cases.json must contain at least 12 cases');

const ids = new Set();
for (const [index, item] of cases.entries()) {
  const p = 'case[' + index + ']';
  for (const key of ['id', 'category', 'tier', 'prompt', 'restraint_trap']) {
    if (typeof item[key] !== 'string' || !item[key].trim()) errors.push(p + ' missing ' + key);
  }
  if (!['sanity', 'hard', 'control'].includes(item.tier)) errors.push(item.id + ' has invalid tier');\n  if (ids.has(item.id)) errors.push('duplicate id: ' + item.id);
  ids.add(item.id);
  if (!Array.isArray(item.hidden_targets) || item.hidden_targets.length < 2) {
    errors.push(item.id + ' must have at least 2 hidden_targets');
  }
  for (const target of item.hidden_targets ?? []) {
    if (typeof target !== 'string' || !target.trim()) errors.push(item.id + ' has empty hidden target');
  }
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log('OK: ' + cases.length + ' eval cases validated');
