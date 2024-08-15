import { ChangeEvent, useState } from 'react';
import { useHandleKeyDown } from '@/shared/hooks/use-handle-key-down';

import { calculatorFormat, checkResult, isActions, replaceDotsWithCommas } from '../utils/calculator-utils';
import { convertInfixToPostfix } from '../utils/convert-infix-to-postfix';
import { calculatePostfix } from '../utils/calculate-postfix';
import { OperatorType } from '../../types/operators.type';
import { useFocusInput } from './use-focus-input';

export const useCalculatorControl = () => {
  const [calcValue, setCalcValue] = useState<string>('');
  const [expressionValue, setExpressionValue] = useState<string>('');

  const { inputRef, handleFocus, cursorPosition, setCursorPosition } = useFocusInput(calcValue);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCalcValue(calculatorFormat(e.target.value));
    setCursorPosition((p) => p + 1);
  };

  const clearState = () => {
    setCalcValue('');
    setExpressionValue('');
  };

  const handleEquals = () => {
    setExpressionValue(calcValue);
    const postfix = convertInfixToPostfix(calcValue);
    const result = calculatePostfix(postfix);
    setCalcValue(checkResult(result));
    setCursorPosition(result.length);
  };

  const handleBackspace = () => {
    setCalcValue((p) => p.slice(0, cursorPosition - 1) + p.slice(cursorPosition));
    setCursorPosition((p) => (p > 0 ? p - 1 : 0));
  };

  const actionEvents = (actionKey: string) => {
    if (actionKey === 'C') clearState();
    else if (actionKey === '=') handleEquals();
    else if (actionKey === '<=') handleBackspace();
  };

  const calculate = (key: OperatorType | string) => {
    try {
      if (isActions(key)) actionEvents(key);
      else {
        let newValue = key;
        if (expressionValue) setExpressionValue('');
        if (key === 'π') newValue = replaceDotsWithCommas(Math.PI.toString());
        setCalcValue((p) => p.slice(0, cursorPosition) + newValue + p.slice(cursorPosition));
        setCursorPosition((p) => p + newValue.length);
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
    handleFocus,
  };
};
