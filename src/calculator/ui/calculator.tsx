import { Input } from '@/shared/ui/input';

import { useCalculatorControl } from '../model/use-cases/hooks/use-calculator-control';
import { CalculatorKeyboard } from './components/calculator-keyboard';
import cls from './calculator.module.scss';

export const Calculator = () => {
  const { calcValue, expressionValue, inputRef, calculate, handleChange } = useCalculatorControl();

  return (
    <div className={cls.calculator}>
      <div className={cls.calculator_scoreboard}>
        <div className={cls.calculator_scoreboard_expression}>{expressionValue}</div>
        <Input ref={inputRef} value={calcValue} autoFocus onChange={handleChange} />
      </div>
      <span className={cls.calculator_line} />
      <CalculatorKeyboard onClick={calculate} />
    </div>
  );
};
