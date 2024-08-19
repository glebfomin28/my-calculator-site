import { ChangeEvent, forwardRef, InputHTMLAttributes } from 'react';
import cn from 'classnames';

import cls from './input.module.scss';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export const Input = forwardRef<HTMLInputElement, IInputProps>((props, ref) => {
  const { value, onChange, className, style, ...otherProps } = props;

  const classes = cn(cls.input, className);

  return <input ref={ref} className={classes} style={style} value={value} onChange={onChange} {...otherProps} />;
});
