import { fontSizeByValueLength } from './font-size-by-value-length';

describe('fontSizeByValueLength', () => {
  test('returns 32 for strings shorter than 17 characters', () => {
    expect(fontSizeByValueLength('1234567890123456')).toBe(32);
  });

  test('returns dynamic size for strings longer than 16 characters', () => {
    const res1 = fontSizeByValueLength('12345678901234567');
    const res2 = fontSizeByValueLength('123456789012345678');
    const res3 = fontSizeByValueLength('1234567890123456789');

    expect(res1).toBeLessThan(32);
    expect(res1).toBeGreaterThanOrEqual(12);

    expect(res2).toBeLessThan(32);
    expect(res2).toBeGreaterThanOrEqual(12);

    expect(res3).toBeLessThan(32);
    expect(res3).toBeGreaterThanOrEqual(12);
  });

  test('returns minimum size of 12 for very long strings', () => {
    expect(fontSizeByValueLength('1234567890123456789012345678901234567890123')).toBe(12);
  });
});
