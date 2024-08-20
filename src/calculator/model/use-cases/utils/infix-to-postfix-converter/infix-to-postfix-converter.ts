import { isNumber, isOperator } from '../calculator-utils';
import { CALCULATOR_MATCH_PATTERN } from '../../../../config/calculator-pattern.config';
import { operatorsPrecedence } from '../../../../config/operators-precedence.config';
import { OperatorType } from '../../../types/operators.type';
import { OperatorsEnum } from '../../../enums/operators.enum';

class InfixToPostfixConverter {
  private readonly outputQueue: string[];

  private readonly operatorStack: string[];

  private readonly tokens: string[];

  constructor(expression: string) {
    this.outputQueue = [];
    this.operatorStack = [];
    this.tokens = expression.match(CALCULATOR_MATCH_PATTERN) || [];
  }

  public convert(): string[] {
    for (let index = 0; index < this.tokens.length; index += 1) {
      const token = this.tokens[index];

      const nextIndex = () => {
        index += 1;
      };

      if (isNumber(token)) {
        this.outputQueue.push(token);
      } else if (
        isOperator(token) &&
        (token === OperatorsEnum.ParenthesesOpen || token === OperatorsEnum.ParenthesesClose)
      ) {
        this.handleClosingParenthesis(token);
      } else if (isOperator(token)) {
        this.handleOperator(token, index, nextIndex);
      }
    }
    // После обработки всех токенов, выталкиваем все оставшиеся операторы из стека в выходную очередь
    while (this.operatorStack.length > 0) {
      this.outputQueue.push(this.operatorStack.pop()!);
    }

    return this.outputQueue;
  }

  private handleClosingParenthesis(token: OperatorsEnum) {
    if (token === OperatorsEnum.ParenthesesOpen) {
      this.operatorStack.push(token);
    } else if (token === OperatorsEnum.ParenthesesClose) {
      while (this.operatorStack.length > 0 && this.operatorStack[this.operatorStack.length - 1] !== '(') {
        this.outputQueue.push(this.operatorStack.pop()!);
      }
      this.operatorStack.pop(); // Удаляем открывающую скобку из стека
    }
  }

  private handleOperator(token: OperatorsEnum, i: number, skip: () => void) {
    if (token === OperatorsEnum.Percent) {
      this.operatorStack.push(OperatorsEnum.Division);
      this.outputQueue.push('100');
    } else if (token === OperatorsEnum.Subtraction) {
      this.handleUnaryMinus(token, i, skip);
    } else {
      this.handleBinaryOperator(token);
    }
  }

  private handleUnaryMinus(token: string, i: number, skip: () => void) {
    if (this.isUnaryMinus(i)) {
      this.outputQueue.push(`-${this.tokens[i + 1]}`);
      skip(); // Пропускаем следующий токен, так как он уже обработан
    } else {
      this.handleBinaryOperator(token);
    }
  }

  private isUnaryMinus(i: number): boolean {
    const onlyNum = this.outputQueue.filter((item) => isNumber(item));
    const onlyOperator = this.extractOperators();

    return (
      !this.outputQueue.length ||
      (this.tokens.length <= 2 && !this.operatorStack[0]) ||
      (!!this.operatorStack[0] &&
        i + 1 < this.tokens.length &&
        isNumber(this.tokens[i + 1]) &&
        onlyOperator.length >= onlyNum.length)
    );
  }

  private handleBinaryOperator(token: string) {
    while (
      this.operatorStack.length > 0 &&
      isOperator(this.operatorStack[this.operatorStack.length - 1]) &&
      operatorsPrecedence[this.operatorStack[this.operatorStack.length - 1] as OperatorType] >=
        operatorsPrecedence[token as OperatorType]
    ) {
      this.outputQueue.push(this.operatorStack.pop()!);
    }
    this.operatorStack.push(token);
  }

  private extractOperators(): string[] {
    return [...this.outputQueue.filter((item) => !isNumber(item)), ...this.operatorStack].filter(
      (operator) =>
        isOperator(operator) &&
        operator !== OperatorsEnum.ParenthesesOpen &&
        operator !== OperatorsEnum.ParenthesesClose,
    );
  }
}

export function infixToPostfixConverter(expression: string): string[] {
  const converter = new InfixToPostfixConverter(expression);
  return converter.convert();
}
