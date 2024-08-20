import { isNumber, isOperator, replaceCommasWithDots, replaceDotsWithCommas } from '../calculator-utils';
import { OperatorsEnum } from '../../../enums/operators.enum';

export function calculatePostfix(postfix: string[]): string {
  if (!postfix?.length) return '';
  const stack: number[] = [];

  for (const token of postfix) {
    if (isNumber(token)) {
      stack.push(Number(replaceCommasWithDots(token)));
    } else if (isOperator(token) && token === OperatorsEnum.SquareRoot) {
      stack.push(Math.sqrt(stack.pop()!));
    } else if (isOperator(token)) {
      const b = stack.pop()!;
      const a = stack.pop()!;

      switch (token) {
        case OperatorsEnum.Addition:
          stack.push(a + b);
          break;
        case OperatorsEnum.Subtraction:
          stack.push(a - b);
          break;
        case OperatorsEnum.Multiplication:
          stack.push(a * b);
          break;
        case OperatorsEnum.Division:
          stack.push(a / b);
          break;
        case OperatorsEnum.Exponentiation:
          stack.push(a ** b);
          break;
      }
    }
  }

  const transformNum = parseFloat(stack[0].toFixed(10));

  return replaceDotsWithCommas(transformNum.toString());
}
