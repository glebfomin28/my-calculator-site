import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';

import { keyBoardConfig } from '../config/key-board.config';
import cls from './calculator.module.scss';

export const Calculator = () => {
  return (
    <div className={cls.calculator}>
      <div className={cls.calculator_scoreboard}>
        <div className={cls.calculator_scoreboard_expression}>80*qwd*549</div>
        <Input />
      </div>
      <span className={cls.calculator_line} />
      <div className={cls.calculator_actions}>
        {keyBoardConfig.map((row, index) => (
          <div key={index} className={cls.calculator_actions_row}>
            {row.map((action) => (
              <Button key="action">{action}</Button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
