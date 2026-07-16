import { describe, expect, it } from 'vitest';
import { CORE_PACKAGE_VERSION, getPackageName } from './index.js';

describe('@radar-pro/core', () => {
  it('exports package identity', () => {
    expect(getPackageName()).toBe('@radar-pro/core');
    expect(CORE_PACKAGE_VERSION).toBe('0.1.2');
  });
});
