import { calculatePostfix } from './calculate-postfix';

describe('calculatePostfix', () => {
  it.each([
    { postfix: ['2'], expected: '2' },
    { postfix: [], expected: '' },
    { postfix: ['2', '3', '+'], expected: '5' },
    { postfix: ['2', '3', '-'], expected: '-1' },
    { postfix: ['2', '3', '*'], expected: '6' },
    { postfix: ['9', '2', '/'], expected: '4,5' },
    { postfix: ['2', '3', '^'], expected: '8' },
    { postfix: ['9', '√'], expected: '3' },
    { postfix: ['9', '√', '2', '+'], expected: '5' },
    { postfix: ['2', '1', '+', '3', '-'], expected: '0' },
    { postfix: ['0', '0', '/', '1', '+'], expected: 'NaN' },
    { postfix: ['5', '0', '/'], expected: 'Infinity' },
    { postfix: ['5', '0', '*'], expected: '0' },
  ])('should return postfix array', ({ postfix, expected }) => {
    expect(calculatePostfix(postfix)).toBe(expected);
  });
});
