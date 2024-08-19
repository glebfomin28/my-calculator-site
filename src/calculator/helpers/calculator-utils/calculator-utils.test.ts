import { isNumber, calculatorFormat } from './calculator-utils';

describe('calculator helpers', () => {
  describe('calculator-format', () => {
    it.each([
      { input: '12q345 _`$6', expected: '123456' },
      { input: '^0-9+-*%√^/(text)', expected: '^0-9+-*%√^/()' },
      { input: '2+2/2*2', expected: '2+2/2*2' },
    ])('should return only numbers and calculator symbols', ({ input, expected }) => {
      expect(calculatorFormat(input)).toBe(expected);
    });
  });

  describe('is-number', () => {
    it('should return false', () => {
      expect(isNumber('text')).toBe(false);
      expect(isNumber('2+2/2,5')).toBe(false);
    });

    it('should return true', () => {
      expect(isNumber('25')).toBe(true);
      expect(isNumber('2.5')).toBe(true);
      expect(isNumber('2,5')).toBe(true);
    });
  });
});
