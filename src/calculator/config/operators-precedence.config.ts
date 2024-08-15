import { OperatorType } from '@/calculator/model/types/operators.type';

export const operatorsPrecedence: Record<OperatorType, number> = {
  '+': 1,
  '-': 1,
  '*': 2,
  '/': 2,
  '%': 2,
  '^': 3,
  '√': 3,
};
