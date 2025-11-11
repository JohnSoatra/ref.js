const Flags = new Map([
 ['batch', Symbol('flag_batch')]
] as const);

export type Flags = typeof Flags extends Map<infer K, any> ? K : never;
export default Flags;
