import { useEffect, useRef } from "react";

export const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

export const getRandomColor = () => {
  function c() {
    var hex = Math.floor(Math.random() * 256).toString(16);
    return ("0" + String(hex)).substr(-2); // pad with zero
  }
  return c() + c() + c();
}