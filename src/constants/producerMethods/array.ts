export type ProducerArrayMethods =
  | 'concat'
  | 'flat'
  | 'slice'
  | 'splice'
  | 'toReversed'
  | 'toSorted'
  | 'toSpliced'
  | 'with';

const ProducerArrayMethods = new Set<ProducerArrayMethods>([
  'concat',
  'flat',
  'slice',
  'splice',
  'toReversed',
  'toSorted',
  'toSpliced',
  'with',
]);

export default ProducerArrayMethods;
