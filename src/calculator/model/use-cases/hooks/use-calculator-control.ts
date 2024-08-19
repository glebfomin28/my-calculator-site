import { ChangeEvent, useRef, useState } from 'react';
import { useHandleKeyDown } from '@/shared/hooks/use-handle-key-down';

import { infixToPostfixConverter } from '../utils/infix-to-postfix-converter/infix-to-postfix-converter';
import { calculatePostfix } from '../utils/calculate-postfix/calculate-postfix';
import { OperatorType } from '../../types/operators.type';
import {
  replaceDotsWithCommas,
  calculatorFormat,
  isActions,
  isErrorCalc,
  isNumber,
} from '../../../helpers/calculator-utils';

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
    console.log('postfix', postfix);
    console.log('result', result);
    setCalcValue(isNumber(result) ? result : '');
  };

  const handleBackspace = () => {
    setCalcValue((p) => p.slice(0, p.length - 1));
  };

  const actionEvents = (actionKey: string) => {
    if (actionKey === 'C') clearState();
    else if (actionKey === '=') handleEquals();
    else if (actionKey === '<=') handleBackspace();
  };

  const calculate = (key: OperatorType | string) => {
    inputRef?.current?.blur();
    checkValueAndReset();

    try {
      if (isActions(key)) actionEvents(key);
      else {
        let newValue = key;
        if (expressionValue) setExpressionValue('');
        if (key === 'π') newValue = replaceDotsWithCommas(Math.PI.toString());
        setCalcValue((p) => p + newValue);
      }
    } catch (e) {
      console.error(e);
      clearState();
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') calculate('=');
    if (event.key === 'Escape') calculate('C');
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
