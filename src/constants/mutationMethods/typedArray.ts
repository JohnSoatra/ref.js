export type MutationTypedArrayMethods =
  | 'copyWithin'
  | 'fill'
  | 'reverse'
  | 'set'
  | 'sort';

const MutationTypedArrayMethods = new Set<MutationTypedArrayMethods>([
  'copyWithin',
  'fill',
  'reverse',
  'set',
  'sort',
]);

export default MutationTypedArrayMethods;
