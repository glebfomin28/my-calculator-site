import { fontSizeByValueLength } from './font-size-by-value-length';

describe('font-size-by-value-length', () => {
  const actualResult = (input: string) =>
    fontSizeByValueLength(input, { fontSizeMin: 14, fontSizeMax: 32, maxLength: 17 });

  it.each([
    { input: '', expected: 32 },
    { input: '123456', expected: 32 },
  ])('returns 32 for strings shorter than 17 characters', ({ input, expected }) => {
    expect(actualResult(input)).toBe(expected);
  });

  test('returns dynamic size for strings longer than 16 characters', () => {
    const expectedResultMin = 12;
    const expectedResultMax = 32;

    const actualResultOne = actualResult('12345678901234567');
    const actualResultTwo = actualResult('123456789012345678');
    const actualResultThree = actualResult('1234567890123456789');

    expect(actualResultOne).toBeGreaterThanOrEqual(expectedResultMin);
    expect(actualResultOne).toBeLessThanOrEqual(expectedResultMax);

    expect(actualResultTwo).toBeGreaterThanOrEqual(expectedResultMin);
    expect(actualResultTwo).toBeLessThanOrEqual(expectedResultMax);

    expect(actualResultThree).toBeGreaterThanOrEqual(expectedResultMin);
    expect(actualResultThree).toBeLessThanOrEqual(expectedResultMax);
  });

  test('returns minimum size of 12 for very long strings', () => {
    const expectedResult = 14;

    expect(actualResult('1234567890123456789012345678901234567890123')).toBe(expectedResult);
  });
});
