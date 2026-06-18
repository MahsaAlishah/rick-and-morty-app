import { useEffect, useState } from "react";

export default function useLocalStorage(key, initislState) {
  const [value, setValue] = useState(
    () => JSON.parse(localStorage.getItem(key)) || initislState
  );
  useEffect(() => localStorage.setItem(key, JSON.stringify(value)), [value]);

  return [value, setValue];
}
