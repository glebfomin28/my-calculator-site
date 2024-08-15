import { ChangeEvent, useRef, useState } from 'react';
import { useHandleKeyDown } from '@/shared/hooks/use-handle-key-down';

import { calculatorFormat, checkResult, isActions, replaceDotsWithCommas } from '../utils/calculator-utils';
import { convertInfixToPostfix } from '../utils/convert-infix-to-postfix';
import { calculatePostfix } from '../utils/calculate-postfix';
import { OperatorType } from '../../types/operators.type';

export const useCalculatorControl = () => {
  const [calcValue, setCalcValue] = useState<string>('');
  const [expressionValue, setExpressionValue] = useState<string>('');

  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCalcValue(calculatorFormat(e.target.value));
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
