export type MutationArrayMethods =
  | 'copyWithin'
  | 'fill'
  | 'pop'
  | 'push'
  | 'reverse'
  | 'shift'
  | 'sort'
  | 'splice'
  | 'unshift';

const MutationArrayMethods = new Set<MutationArrayMethods>([
  'copyWithin',
  'fill',
  'pop',
  'push',
  'reverse',
  'shift',
  'sort',
  'splice',
  'unshift',
]);

export default MutationArrayMethods;
