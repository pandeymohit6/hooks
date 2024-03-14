import { useEffect, useRef, useState } from "react";

const useThrottle = (value, delay) => {
  const [throttledValue, setThrottledValue] = useState(value);
  const lastexcuted = useRef(Date.now());

  useEffect(() => {
    const handler = setTimeout(() => {
      const now = Date.now();
      const elapsed = now - lastexcuted.current;
      if (elapsed >= delay) {
        setThrottledValue(value);
        lastexcuted.current = now;
      }
    }, delay - (Date.now() - lastexcuted.current));

    return () => {
      clearTimeout(handler);
    };
  }, [delay, value]);

  return throttledValue;
};

export default useThrottle;
