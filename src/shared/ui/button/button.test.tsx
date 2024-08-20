import { fireEvent, render, screen } from '@testing-library/react';
import { Button } from '@/shared/ui/button/button';

const testText = 'Click Me';

describe('ui/button', () => {
  it('should render the button', () => {
    render(<Button>{testText}</Button>);

    expect(screen.getByText(testText)).toBeInTheDocument();
  });

  it('should calls onClick handler when clicked', () => {
    const onClickMock = jest.fn();
    render(<Button onClick={onClickMock}>{testText}</Button>);

    fireEvent.click(screen.getByText(testText));

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it('should applies additional className correctly', () => {
    render(<Button className="class1">{testText}</Button>);

    const buttonElement = screen.getByText(testText);
    expect(buttonElement).toHaveClass('class1');
  });
});
