import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import {
  CORE_TABLES,
  DATABASE_PACKAGE_VERSION,
  getPackageName,
  MIGRATIONS,
} from './index.js';

const packageRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const migrationsDir = join(packageRoot, 'migrations');

describe('@radar-pro/database', () => {
  it('exports package identity', () => {
    expect(getPackageName()).toBe('@radar-pro/database');
    expect(DATABASE_PACKAGE_VERSION).toBe('0.2.1');
  });

  it('lists all core tables', () => {
    expect([...CORE_TABLES]).toEqual([
      'owners',
      'datasets',
      'repositories',
      'feature_definitions',
      'issues',
      'pull_requests',
      'releases',
      'contributors',
      'journal_entries',
      'feature_values',
    ]);
  });

  it('ships SQL migration files for each catalog entry', () => {
    expect(MIGRATIONS.length).toBe(3);
    for (const migration of MIGRATIONS) {
      const path = join(migrationsDir, migration.id);
      expect(existsSync(path), `missing migration: ${path}`).toBe(true);
    }
  });
});
