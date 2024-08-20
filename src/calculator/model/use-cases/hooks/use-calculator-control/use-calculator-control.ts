import { ChangeEvent, useRef, useState } from 'react';
import { useHandleKeyDown } from '@/shared/hooks/use-handle-key-down';

import { infixToPostfixConverter } from '../../utils/infix-to-postfix-converter/infix-to-postfix-converter';
import { calculatePostfix } from '../../utils/calculate-postfix/calculate-postfix';
import {
  calculatorFormat,
  isActions,
  isErrorCalc,
  isNumber,
  isOperator,
  replaceDotsWithCommas,
} from '../../utils/calculator-utils';
import { ActionsEnum } from '../../../enums/actions.enum';
import { OperatorsEnum } from '../../../enums/operators.enum';
import { TokenType } from '../../../types/calculator-token.type';

export const useCalculatorControl = () => {
  const [calcValue, setCalcValue] = useState<string>('');
  const [expressionValue, setExpressionValue] = useState<string>('');

  const inputRef = useRef<HTMLInputElement>(null);

  const checkValueAndReset = () => {
    if (isErrorCalc(calcValue)) {
      setCalcValue('');
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    checkValueAndReset();
    setCalcValue(calculatorFormat(e.target.value));
  };

  const clearState = () => {
    setCalcValue('');
    setExpressionValue('');
  };

  const handleEquals = () => {
    setExpressionValue(calcValue);
    // const postfix = convertInfixToPostfix(calcValue);
    const postfix = infixToPostfixConverter(calcValue);
    const result = calculatePostfix(postfix);

    setCalcValue(isNumber(result) ? result : '');
  };

  const handleBackspace = () => {
    setCalcValue((p) => p.slice(0, p.length - 1));
  };

  const actionEvents = (actionKey: ActionsEnum) => {
    if (actionKey === ActionsEnum.Clear) clearState();
    else if (actionKey === ActionsEnum.Equals) handleEquals();
    else if (actionKey === ActionsEnum.Erase) handleBackspace();
  };

  const calculate = (key: string | TokenType) => {
    inputRef?.current?.blur();
    checkValueAndReset();

    try {
      if (isActions(key)) actionEvents(key);
      else {
        if (expressionValue) setExpressionValue('');
        if (isOperator(key) && key === OperatorsEnum.Pi) {
          setCalcValue((p) => p + replaceDotsWithCommas(Math.PI.toString()));
        } else {
          setCalcValue((p) => p + key);
        }
      }
    } catch (e) {
      console.error(e);
      clearState();
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') calculate(ActionsEnum.Equals);
    if (event.key === 'Escape') calculate(ActionsEnum.Clear);
  };

  useHandleKeyDown(handleKeyDown);

  return {
    inputRef,
    calcValue,
    expressionValue,
    handleChange,
    calculate,
  };
};
