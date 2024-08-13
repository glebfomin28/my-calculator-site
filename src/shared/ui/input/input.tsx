import { forwardRef, InputHTMLAttributes } from 'react';
import cn from 'classnames';

import cls from './input.module.scss';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  full?: boolean;
  className?: string;
}

export const Input = forwardRef<HTMLInputElement, IInputProps>((props, ref) => {
  const { className, full, ...otherProps } = props;

  const classes = cn(cls.input, { [cls.mode_full]: full }, className);

  return <input className={classes} ref={ref} {...otherProps} />;
});
