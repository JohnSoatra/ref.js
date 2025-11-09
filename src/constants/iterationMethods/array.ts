export type IterationArrayMethods =
  | 'every'
  | 'findIndex'
  | 'findLastIndex'
  | 'flatMap'
  | 'forEach'
  | 'map'
  | 'reduce'
  | 'reduceRight'
  | 'some';

const IterationArrayMethods = new Set<IterationArrayMethods>([
  'every',
  'findIndex',
  'findLastIndex',
  'flatMap',
  'forEach',
  'map',
  'reduce',
  'reduceRight',
  'some',
]);

export default IterationArrayMethods;
