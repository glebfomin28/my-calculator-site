import { CALCULATOR_INPUT_PATTERN } from '../../../../config/calculator-pattern.config';
import { ActionsEnum } from '@/calculator/model/enums/actions.enum';
import { OperatorsEnum } from '@/calculator/model/enums/operators.enum';

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

export function isActions(token: string): token is ActionsEnum {
  return Object.values(ActionsEnum).includes(token as ActionsEnum);
}

export function isOperator(token: string | OperatorsEnum): token is OperatorsEnum {
  return Object.values(OperatorsEnum).includes(token as OperatorsEnum);
}

export function isErrorCalc(value: string): boolean {
  return ['Infinity', 'null', 'undefined', 'NaN'].includes(value);
}
