import { renderHook } from '@testing-library/react';
import { useHandleKeyDown } from './use-handle-key-down';

const callback = jest.fn();

describe('hooks/use-handle-key-down', () => {
  it('should calls the callback when a key is pressed', () => {
    renderHook(() => useHandleKeyDown(callback));

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(expect.objectContaining({ key: 'Enter' }));
  });

  it('should not call the callback if it is not provided', () => {
    renderHook(useHandleKeyDown);

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));

    expect(callback).not.toHaveBeenCalled();
  });

  it('should remove the event listener when the hook is unmounted', () => {
    const { unmount } = renderHook(() => useHandleKeyDown(callback));

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    expect(callback).toHaveBeenCalledTimes(1);

    unmount();

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    expect(callback).toHaveBeenCalledTimes(1); // Should not be called again after unmount
  });
});
