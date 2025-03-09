export type KeyStatus = "unknown" | "missing" | "close" | "exact";

export interface IHints {
  [key: string]: KeyStatus;
}
