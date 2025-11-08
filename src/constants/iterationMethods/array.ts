export type IterationArrayMethods =
  | 'every'
  | 'filter'
  | 'find'
  | 'findIndex'
  | 'findLast'
  | 'findLastIndex'
  | 'flatMap'
  | 'forEach'
  | 'map'
  | 'reduce'
  | 'reduceRight'
  | 'some'
  | 'sort'
  | 'toSorted';

const IterationArrayMethods = new Set<IterationArrayMethods>([
  'every',
  'filter',
  'find',
  'findIndex',
  'findLast',
  'findLastIndex',
  'flatMap',
  'forEach',
  'map',
  'reduce',
  'reduceRight',
  'some',
  'sort',
  'toSorted',
]);

export default IterationArrayMethods;
