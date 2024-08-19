import { infixToPostfixConverter } from './infix-to-postfix-converter';

describe('convertInfixToPostfix', () => {
  it('should convert simple infix expression to postfix', () => {
    const expectedResult = ['3', '4', '2', '*', '1', '5', '-', '2', '^', '3', '^', '/', '+'];
    const actualResult = infixToPostfixConverter('3+4*2/(1-5)^2^3');

    expect(actualResult).toEqual(expectedResult);
  });

  it('should handle unary minus', () => {
    const expectedResult = ['8', '-2', '/'];
    const actualResult = infixToPostfixConverter('8/-2');

    expect(actualResult).toEqual(expectedResult);

    const expectedResult2 = ['-3'];
    const actualResult2 = infixToPostfixConverter('-3');

    expect(actualResult2).toEqual(expectedResult2);
  });

  it('should handle percentage operator', () => {
    const expectedResult = ['100', '2', '100', '/', '*'];
    const actualResult = infixToPostfixConverter('100*2%');

    expect(actualResult).toEqual(expectedResult);
  });

  it('should handle parentheses', () => {
    const expectedResult = ['1', '2', '+', '3', '*'];
    const actualResult = infixToPostfixConverter('(1+2)*3');

    expect(actualResult).toEqual(expectedResult);

    const expectedResult2 = ['1', '2', '3', '*', '+'];
    const actualResult2 = infixToPostfixConverter('1+(2*3)');

    expect(actualResult2).toEqual(expectedResult2);
  });

  it('should handle multiple operators', () => {
    const expectedResult = ['1', '2', '3', '*', '+', '4', '5', '/', '-'];
    const actualResult = infixToPostfixConverter('1+2*3-4/5');

    expect(actualResult).toEqual(expectedResult);
  });

  it('should handle complex expressions', () => {
    const expectedResult = ['1', '2', '+', '3', '4', '-', '*', '5', '6', '+', '/'];
    const actualResult = infixToPostfixConverter('(1+2)*(3-4)/(5+6)');

    expect(actualResult).toEqual(expectedResult);
  });
});
