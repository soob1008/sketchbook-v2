import { useEffect, useRef } from "react";

interface IUseInterval {
  (callback: () => void, interval: number | null): void;
}

const useInterval: IUseInterval = (callback, delay) => {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    // delay 에 null 값을 전달할 경우 타이머를 멈출 수 있음
    if (delay === null) return;

    const timer = setInterval(() => savedCallback.current(), delay);
    return () => clearInterval(timer);
  }, [delay]);
};

export default useInterval;