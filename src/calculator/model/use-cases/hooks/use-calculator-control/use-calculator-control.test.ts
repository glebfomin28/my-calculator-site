import { act, renderHook } from '@testing-library/react';
import { useCalculatorControl } from './use-calculator-control';

jest.mock('../../utils/infix-to-postfix-converter/infix-to-postfix-converter', () => ({
  infixToPostfixConverter: jest.fn().mockReturnValue(['1', '2', '+']),
}));

jest.mock('../../utils/calculate-postfix/calculate-postfix', () => ({
  calculatePostfix: jest.fn().mockReturnValue('3'),
}));

jest.mock('../../../../helpers/calculator-utils', () => ({
  replaceDotsWithCommas: jest.fn((value: string) => value),
  calculatorFormat: jest.fn((value: string) => value),
  isActions: jest.fn((value) => ['C', '=', '<='].includes(value)),
  isErrorCalc: jest.fn(() => false),
  isNumber: jest.fn(() => true),
}));

describe('use-calculator-control', () => {
  it('should initialize with empty calcValue and expressionValue', () => {
    const { result } = renderHook(useCalculatorControl);

    expect(result.current.calcValue).toBe('');
    expect(result.current.expressionValue).toBe('');
  });

  it('should update calcValue on handleChange', () => {
    const { result } = renderHook(useCalculatorControl);

    act(() => {
      result.current.handleChange({ target: { value: '123' } } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.calcValue).toBe('123');
  });

  it('should clear state on calculate with "C"', () => {
    const { result } = renderHook(() => useCalculatorControl());

    act(() => {
      result.current.handleChange({ target: { value: '123' } } as React.ChangeEvent<HTMLInputElement>);
      result.current.calculate('C');
    });

    expect(result.current.calcValue).toBe('');
    expect(result.current.expressionValue).toBe('');
  });

  it('should handle equals and calculate result', () => {
    const { result } = renderHook(useCalculatorControl);

    act(() => {
      result.current.handleChange({ target: { value: '1+2' } } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.calcValue).toBe('1+2');

    act(() => {
      result.current.calculate('=');
    });

    expect(result.current.calcValue).toBe('3');
    expect(result.current.expressionValue).toBe('1+2');
  });

  it('should handle backspace', () => {
    const { result } = renderHook(useCalculatorControl);

    act(() => {
      result.current.handleChange({ target: { value: '123' } } as React.ChangeEvent<HTMLInputElement>);
      result.current.calculate('<=');
    });

    expect(result.current.calcValue).toBe('12');
  });

  it('should calculate the result of a sequence of actions', () => {
    const { result } = renderHook(() => useCalculatorControl());

    act(() => {
      result.current.calculate('1');
    });
    expect(result.current.calcValue).toBe('1');

    act(() => {
      result.current.calculate('+');
    });
    expect(result.current.calcValue).toBe('1+');

    act(() => {
      result.current.calculate('2');
    });
    expect(result.current.calcValue).toBe('1+2');

    act(() => {
      result.current.calculate('=');
    });

    expect(result.current.calcValue).toBe('3');
    expect(result.current.expressionValue).toBe('1+2');
  });

  it('should handle keydown events', () => {
    const { result } = renderHook(() => useCalculatorControl());

    act(() => {
      result.current.handleChange({ target: { value: '1+2' } } as React.ChangeEvent<HTMLInputElement>);
    });
    expect(result.current.calcValue).toBe('1+2');

    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    });

    expect(result.current.calcValue).toBe('3');
    expect(result.current.expressionValue).toBe('1+2');

    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    });

    expect(result.current.calcValue).toBe('');
    expect(result.current.expressionValue).toBe('');
  });

  it('should return a object with correct property', () => {
    const { result } = renderHook(useCalculatorControl);

    expect(result.current).toHaveProperty('inputRef');
    expect(result.current).toHaveProperty('calcValue');
    expect(result.current).toHaveProperty('expressionValue');
    expect(result.current).toHaveProperty('handleChange');
    expect(result.current).toHaveProperty('calculate');
  });
});
