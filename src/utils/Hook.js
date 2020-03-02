import { useEffect, useRef } from "react";
import Loading from "../components/Loading";

export const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}