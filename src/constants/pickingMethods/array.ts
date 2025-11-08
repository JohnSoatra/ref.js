export type PickingArrayMethods =
  | 'at'
  | 'find'
  | 'findLast';

const PickingArrayMethods = new Set<PickingArrayMethods>([
  'at',
  'find',
  'findLast',
]);

export default PickingArrayMethods;
