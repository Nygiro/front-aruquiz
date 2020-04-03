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

export const simpleDebouncePrisma = (fn) => {
  let executing = false
  let pendingExecution = null
  return async (...args) => {
    if (executing) {
      // if there are 2 executions 50ms apart, ignore the last one
      pendingExecution = args
      return null
    }
    executing = true
    await fn(...args).catch(e => console.error(e))
    if (pendingExecution) {
      await fn(...args).catch(e => console.error(e))
      pendingExecution = null
    }
    executing = false
  }
}