import {
  replaceDotsWithCommas,
  replaceCommasWithDots,
  isNumber,
  isOperator,
} from '../../../../helpers/calculator-utils';

export function calculatePostfix(postfix: string[]): string {
  if (!postfix?.length) return '';
  const stack: number[] = [];

  for (const token of postfix) {
    if (isNumber(token)) {
      stack.push(Number(replaceCommasWithDots(token)));
    } else if (token === '√') {
      stack.push(Math.sqrt(stack.pop()!));
    } else if (isOperator(token)) {
      const b = stack.pop()!;
      const a = stack.pop()!;

      switch (token) {
        case '+':
          stack.push(a + b);
          break;
        case '-':
          stack.push(a - b);
          break;
        case '*':
          stack.push(a * b);
          break;
        case '/':
          stack.push(a / b);
          break;
        case '^':
          stack.push(a ** b);
          break;
      }
    }
  }

  const transformNum = parseFloat(stack[0].toFixed(10));

  return replaceDotsWithCommas(transformNum.toString());
}
