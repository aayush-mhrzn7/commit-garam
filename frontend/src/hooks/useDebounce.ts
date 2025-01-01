import { useEffect, useState } from "react";

export const useDebounce = (initValue: any, delay: number) => {
  const [value, setValue] = useState(initValue);

  useEffect(() => {
    const timer = setTimeout(() => {
      setValue(initValue);
    }, delay);

    return () => clearTimeout(timer);
  }, [initValue, delay]);

  return value;
};
