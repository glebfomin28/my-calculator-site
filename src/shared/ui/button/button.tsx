import { ButtonHTMLAttributes } from 'react';
import cn from 'classnames';
import cls from './button.module.scss';

export const Button = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { children, className, ...otherProps } = props;
  return (
    <button type="button" className={cn(cls.button, className)} {...otherProps}>
      {children}
    </button>
  );
};
