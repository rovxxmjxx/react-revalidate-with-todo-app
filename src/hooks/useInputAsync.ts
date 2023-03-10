import { ChangeEvent, useState, useEffect } from 'react';

type ReturnType<T> = [
  T,
  (e: ChangeEvent<HTMLInputElement>) => void,
  () => void
];

const useInputAysnc = <T>(initialValue: T): ReturnType<T> => {
  const [value, setValue] = useState(initialValue);
  const handler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(
      typeof value === 'boolean'
        ? (e.target.checked as unknown as T)
        : (e.target.value as unknown as T)
    );
  };

  const reset = () => setValue(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return [value, handler, reset];
};

export default useInputAysnc;
