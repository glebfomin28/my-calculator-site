import { isNumber, isOperator } from '../../../../helpers/calculator-utils';
import { CALCULATOR_MATCH_PATTERN } from '../../../../config/calculator-pattern.config';
import { operatorsPrecedence } from '../../../../config/operators-precedence.config';
import { OperatorType } from '../../../types/operators.type';

class InfixToPostfixConverter {
  private readonly outputQueue: string[];

  private readonly operatorStack: (OperatorType | string)[];

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
      } else if (token === '(') {
        this.operatorStack.push(token);
      } else if (token === ')') {
        this.handleClosingParenthesis();
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

  private handleClosingParenthesis() {
    while (this.operatorStack.length > 0 && this.operatorStack[this.operatorStack.length - 1] !== '(') {
      this.outputQueue.push(this.operatorStack.pop()!);
    }
    this.operatorStack.pop(); // Удаляем открывающую скобку из стека
  }

  private handleOperator(token: string, i: number, skip: () => void) {
    if (token === '%') {
      this.operatorStack.push('/');
      this.outputQueue.push('100');
    } else if (token === '-') {
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
    console.log('outputQueue', this.outputQueue);
    console.log('operatorStack', this.operatorStack);
    console.log(
      (this.operatorStack[0] && i + 1 < this.tokens.length && isNumber(this.tokens[i + 1])) ||
        (this.tokens.length <= 2 && !this.operatorStack[0]) ||
        !this.outputQueue.length,
    );
    return (
      !this.outputQueue.length ||
      (this.tokens.length <= 2 && !this.operatorStack[0]) ||
      (!!this.operatorStack[0] &&
        i + 1 < this.tokens.length &&
        isNumber(this.tokens[i + 1]) &&
        this.operatorStack.length >= this.outputQueue.length)
      // this.operatorStack[0] && i + 1 < this.tokens.length && isNumber(this.tokens[i + 1])
      // && (
      //   this.operatorStack.length <==  this.outputQueue.length
      // )
      // (this.tokens.length <= 2 && !this.operatorStack[0]) ||
      //  !this.outputQueue.length
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
}

export function infixToPostfixConverter(expression: string): string[] {
  const converter = new InfixToPostfixConverter(expression);
  return converter.convert();
}
// export function convertInfixToPostfix(expression: string): string[] {
//   const outputQueue: string[] = []; // Массив для хранения выходной очереди (постфиксная нотация)
//   const operatorStack: (OperatorType | string)[] = []; // Стек для хранения операторов и скобок
//   const tokens = expression.match(CALCULATOR_MATCH_PATTERN) || []; // Разделение выражения на токены
//   for (let i = 0; i < tokens.length; i += 1) {
//     const token = tokens[i];
//     console.log(token, outputQueue, operatorStack);
//
//     if (isNumber(token)) {
//       // Если токен является числом, добавляем его в выходную очередь
//       outputQueue.push(token);
//     } else if (token === '(') {
//       // Если токен является открывающей скобкой, добавляем его в стек операторов
//       operatorStack.push(token);
//     } else if (token === ')') {
//       // Если токен является закрывающей скобкой, выталкиваем все операторы из стека в выходную очередь,
//       // пока не встретим открывающую скобку
//       while (operatorStack.length > 0 && operatorStack[operatorStack.length - 1] !== '(') {
//         outputQueue.push(operatorStack.pop()!);
//       }
//       // Удаляем открывающую скобку из стека
//       operatorStack.pop();
//     } else if (isOperator(token)) {
//       if (token === '%') {
//         // Если токен является оператором процента, добавляем оператор деления и число 100 в выходную очередь
//         operatorStack.push('/');
//         outputQueue.push('100');
//       } else if (token === '-') {
//         if (operatorStack[0] && i + 1 < tokens.length && isNumber(tokens[i + 1])) {
//           outputQueue.push(`-${tokens[i + 1]}`);
//           i += 1; // Пропускаем следующий токен, так как он уже обработан
//         } else if (tokens.length <= 2 && !operatorStack[0]) {
//           outputQueue.push(`-${tokens[i + 1]}`);
//           i += 1;
//         } else if (!outputQueue.length) {
//           outputQueue.push(`-${tokens[i + 1]}`);
//           i += 1;
//         } else {
//           operatorStack.push(token);
//         }
//       } else {
//         // Если токен является оператором, выталкиваем все операторы из стека в выходную очередь,
//         // пока не встретим оператор с меньшим или равным приоритетом
//         while (
//           operatorStack.length > 0 &&
//           isOperator(operatorStack[operatorStack.length - 1]) &&
//           operatorsPrecedence[operatorStack[operatorStack.length - 1] as OperatorType] >=
//             operatorsPrecedence[token as OperatorType]
//         ) {
//           outputQueue.push(operatorStack.pop()!);
//         }
//         // Добавляем текущий оператор в стек
//         operatorStack.push(token);
//       }
//     }
//   }
//
//   // После обработки всех токенов, выталкиваем все оставшиеся операторы из стека в выходную очередь
//   while (operatorStack.length > 0) {
//     outputQueue.push(operatorStack.pop()!);
//   }
//   // Возвращаем выходную очередь, содержащую постфиксную нотацию
//   return outputQueue;
// }
