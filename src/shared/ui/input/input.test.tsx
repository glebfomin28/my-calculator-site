import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { Input } from './input';

const testPlaceholder = 'Test placeholder';
const testValue = 'Test value';

describe('ui/input', () => {
  it('should render the input', () => {
    render(<Input placeholder={testPlaceholder} />);

    expect(screen.getByPlaceholderText(testPlaceholder)).toBeInTheDocument();
  });

  it('should render the input with className', () => {
    render(<Input className="class1" placeholder={testPlaceholder} />);

    expect(screen.getByPlaceholderText(testPlaceholder)).toBeInTheDocument();
    const element = screen.getByPlaceholderText(testPlaceholder);

    expect(element).toBeInTheDocument();
    expect(element).toHaveClass('class1');
    expect(element).toHaveClass('input');
  });

  it('should render the input the correct value', () => {
    render(<Input value={testValue} onChange={jest.fn()} />);

    expect(screen.getByDisplayValue(testValue)).toBeInTheDocument();
  });

  it('should invoke the onChange callback', async () => {
    const onChange = jest.fn();

    render(<Input placeholder={testPlaceholder} onChange={onChange} />);

    const element = screen.getByPlaceholderText(testPlaceholder);

    await userEvent.type(element, '12345');

    expect(onChange).toHaveBeenCalledTimes(5);
  });
});
