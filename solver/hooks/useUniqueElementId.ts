import { useMemo } from "react";

export function useUniqueElementId() {
  return useMemo(() => Math.random().toString(36).substring(7), []);
}
