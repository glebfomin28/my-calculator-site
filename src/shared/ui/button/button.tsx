import { ButtonHTMLAttributes } from 'react';
import cls from './button.module.scss';

export const Button = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { children } = props;
  return (
    <button type="button" className={cls.button}>
      {children}
    </button>
  );
};
