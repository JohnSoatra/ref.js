export type IteratorMethods = 
  | 'entries'
  | 'keys'
  | 'values'
  | typeof Symbol.iterator;

const IteratorMethods = new Set<IteratorMethods>([
  'entries',
  'keys',
  'values',
  Symbol.iterator,
]);

export default IteratorMethods;
