import { ChangeEvent, CSSProperties, forwardRef, InputHTMLAttributes } from 'react';
import cn from 'classnames';

import { fontSizeByValueLength } from '../../utils/font-size-by-value-length';
import cls from './input.module.scss';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export const Input = forwardRef<HTMLInputElement, IInputProps>((props, ref) => {
  const { value, onChange, className, style, ...otherProps } = props;

  const classes = cn(cls.input, className);

  const inlineStyles: CSSProperties = {
    fontSize: fontSizeByValueLength(value),
    ...style,
  };

  return <input ref={ref} className={classes} style={inlineStyles} value={value} onChange={onChange} {...otherProps} />;
});
