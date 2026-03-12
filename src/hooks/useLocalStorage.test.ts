import { act, renderHook } from '@testing-library/react';
import { useLocalStorage } from './useLocalStorage';

describe('useLocalStorage', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('reads and writes values from localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('demo', { count: 1 }));

    act(() => {
      result.current[1]({ count: 3 });
    });

    expect(result.current[0]).toEqual({ count: 3 });
    expect(JSON.parse(window.localStorage.getItem('demo') ?? '{}')).toEqual({ count: 3 });
  });
});
