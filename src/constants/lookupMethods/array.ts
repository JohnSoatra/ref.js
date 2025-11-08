export type LookupArrayMethods =
  | 'includes'
  | 'indexOf'
  | 'lastIndexOf';

const LookupArrayMethods = new Set<LookupArrayMethods>([
  'includes',
  'indexOf',
  'lastIndexOf',
]);

export default LookupArrayMethods;
