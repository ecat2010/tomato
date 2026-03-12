import { useEffect, useState } from 'react';

type SetValue<T> = T | ((previous: T) => T);

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    const storedValue = window.localStorage.getItem(key);
    if (!storedValue) {
      return initialValue;
    }

    try {
      return JSON.parse(storedValue) as T;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  const updateValue = (nextValue: SetValue<T>) => {
    setValue((previous) => (typeof nextValue === 'function' ? (nextValue as (previous: T) => T)(previous) : nextValue));
  };

  return [value, updateValue] as const;
}
