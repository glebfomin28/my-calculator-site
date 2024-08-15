import { isNumber, isOperator } from './calculator-utils';
import { CALCULATOR_MATCH_PATTERN } from '../../../config/calculator-pattern.config';
import { operatorsPrecedence } from '../../../config/operators-precedence.config';
import { OperatorType } from '../../types/operators.type';

export function convertInfixToPostfix(expression: string): string[] {
  const outputQueue: string[] = [];
  const operatorStack: (OperatorType | string)[] = [];
  const tokens = expression.match(CALCULATOR_MATCH_PATTERN) || [];

  for (const token of tokens) {
    if (isNumber(token)) {
      outputQueue.push(token);
    } else if (token === '(') {
      operatorStack.push(token);
    } else if (token === ')') {
      while (operatorStack.length > 0 && operatorStack[operatorStack.length - 1] !== '(') {
        outputQueue.push(operatorStack.pop()!);
      }
      operatorStack.pop();
    } else if (isOperator(token)) {
      if (token === '%') {
        operatorStack.push('/');
        outputQueue.push('100');
      } else {
        while (
          operatorStack.length > 0 &&
          isOperator(operatorStack[operatorStack.length - 1]) &&
          operatorsPrecedence[operatorStack[operatorStack.length - 1] as OperatorType] >=
            operatorsPrecedence[token as OperatorType]
        ) {
          outputQueue.push(operatorStack.pop()!);
        }
        operatorStack.push(token);
      }
    }
  }

  while (operatorStack.length > 0) {
    outputQueue.push(operatorStack.pop()!);
  }

  return outputQueue;
}
