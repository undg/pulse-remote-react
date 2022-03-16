export type Expand<T> = T extends (...args: infer A) => infer R
  ? (...args: Expand<A>) => Expand<R>
  : T extends infer O
  ? { [K in keyof O]: O[K] }
  : never;

export type ExpandAll<T> = T extends (...args: infer A) => infer R
  ? (...args: ExpandAll<A>) => ExpandAll<R>
  : T extends object
  ? T extends infer O
    ? { [K in keyof O]: ExpandAll<O[K]> }
    : never
  : T;
