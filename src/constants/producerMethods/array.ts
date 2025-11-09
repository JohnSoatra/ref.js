export type ProducerArrayMethods =
  | 'concat'
  | 'flat'
  | 'slice'
  | 'toReversed'
  | 'toSpliced'
  | 'with';

const ProducerArrayMethods = new Set<ProducerArrayMethods>([
  'concat',
  'flat',
  'slice',
  'toReversed',
  'toSpliced',
  'with',
]);

export default ProducerArrayMethods;
