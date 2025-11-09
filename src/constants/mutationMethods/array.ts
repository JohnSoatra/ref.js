export type MutationArrayMethods =
  | 'copyWithin'
  | 'fill'
  | 'push'
  | 'reverse'
  | 'unshift';

const MutationArrayMethods = new Set<MutationArrayMethods>([
  'copyWithin',
  'fill',
  'push',
  'reverse',
  'unshift',
]);

export default MutationArrayMethods;
