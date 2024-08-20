import { Button } from '@/shared/ui/button';

import { calculatorKeyBoardConfig } from '../../config/key-board.config';
import cls from './calculator-keyboard.module.scss';

export const CalculatorKeyboard = ({ onClick }: { onClick: (v: string) => void }) => {
  return (
    <div className={cls.calculator_keyboard}>
      {calculatorKeyBoardConfig.map((item) => (
        <Button className={cls.calculator_keyboard_btn} key={item.value} onClick={() => onClick(item.value)}>
          {item.label}
        </Button>
      ))}
    </div>
  );
};
