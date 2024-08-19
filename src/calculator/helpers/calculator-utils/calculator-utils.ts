import { operatorsPrecedence } from '../../config/operators-precedence.config';
import { CALCULATOR_INPUT_PATTERN } from '../../config/calculator-pattern.config';

export function calculatorFormat(value: string) {
  return value.replace(CALCULATOR_INPUT_PATTERN, '');
}

export function replaceCommasWithDots(token: string): string {
  return token.replace(',', '.');
}

export function replaceDotsWithCommas(token: string): string {
  return token.replace('.', ',');
}

export function isNumber(token: string): boolean {
  return !Number.isNaN(Number(replaceCommasWithDots(token)));
}

export function isOperator(token: string): boolean {
  return Object.keys(operatorsPrecedence).includes(token);
}

export function isActions(token: string): boolean {
  return ['C', '=', '<='].includes(token);
}

export function isErrorCalc(value: string): boolean {
  return ['Infinity', 'null', 'undefined', 'NaN'].includes(value);
}
