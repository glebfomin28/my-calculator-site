import { ButtonHTMLAttributes } from 'react';
import cn from 'classnames';
import cls from './button.module.scss';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  mode?: 'blue' | 'white';
}

export const Button = (props: IButtonProps) => {
  const { children, mode = 'blue', className, ...otherProps } = props;

  const classes = cn(cls.button, cls[mode], className);

  return (
    <button type="button" className={classes} {...otherProps}>
      {children}
    </button>
  );
};
