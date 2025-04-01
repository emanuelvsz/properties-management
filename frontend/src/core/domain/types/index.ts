export * from "./pagination";

export type DTO<T = unknown> = Record<string, T>;
export type ValueOf<T> = T[keyof T];
