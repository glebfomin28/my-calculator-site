import { TokenType } from '../model/types/calculator-token.type';
import { ActionsEnum } from '@/calculator/model/enums/actions.enum';
import { OperatorsEnum } from '@/calculator/model/enums/operators.enum';
import { NumbersEnum } from '@/calculator/model/enums/numbers.enum';

type CalculatorKeyBoardType = {
  value: TokenType | string;
  label: string;
};

export const calculatorKeyBoardConfig: CalculatorKeyBoardType[] = [
  {
    value: ActionsEnum.Clear,
    label: ActionsEnum.Clear,
  },
  {
    value: OperatorsEnum.ParenthesesOpen,
    label: OperatorsEnum.ParenthesesOpen,
  },
  {
    value: OperatorsEnum.ParenthesesClose,
    label: OperatorsEnum.ParenthesesClose,
  },
  {
    value: ActionsEnum.Erase,
    label: ActionsEnum.Erase,
  },
  {
    value: `${OperatorsEnum.Exponentiation}(`,
    label: OperatorsEnum.Exponentiation,
  },
  {
    value: `${OperatorsEnum.SquareRoot}(`,
    label: OperatorsEnum.SquareRoot,
  },
  {
    value: OperatorsEnum.Division,
    label: OperatorsEnum.Division,
  },
  {
    value: OperatorsEnum.Multiplication,
    label: 'x',
  },
  {
    value: NumbersEnum.Seven,
    label: NumbersEnum.Seven,
  },
  {
    value: NumbersEnum.Nine,
    label: NumbersEnum.Nine,
  },
  {
    value: NumbersEnum.Eight,
    label: NumbersEnum.Eight,
  },
  {
    value: OperatorsEnum.Subtraction,
    label: OperatorsEnum.Subtraction,
  },
  {
    value: NumbersEnum.Four,
    label: NumbersEnum.Four,
  },
  {
    value: NumbersEnum.Five,
    label: NumbersEnum.Five,
  },
  {
    value: NumbersEnum.Six,
    label: NumbersEnum.Six,
  },
  {
    value: OperatorsEnum.Addition,
    label: OperatorsEnum.Addition,
  },
  {
    value: NumbersEnum.One,
    label: NumbersEnum.One,
  },
  {
    value: NumbersEnum.Two,
    label: NumbersEnum.Two,
  },
  {
    value: NumbersEnum.Three,
    label: NumbersEnum.Three,
  },
  {
    value: OperatorsEnum.Percent,
    label: OperatorsEnum.Percent,
  },
  {
    value: OperatorsEnum.Pi,
    label: OperatorsEnum.Pi,
  },
  {
    value: NumbersEnum.Zero,
    label: NumbersEnum.Zero,
  },
  {
    value: OperatorsEnum.Comma,
    label: OperatorsEnum.Comma,
  },
  {
    value: ActionsEnum.Equals,
    label: ActionsEnum.Equals,
  },
];
