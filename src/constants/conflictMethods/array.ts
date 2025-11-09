export type ConflictArrayMethods =
  | 'filter'
  | 'find'
  | 'findLast'
  | 'pop'
  | 'shift'
  | 'sort'
  | 'splice'
  | 'toSorted';

const ConflictArrayMethods = new Set<ConflictArrayMethods>([
  'filter', // iteration, producer
  'find', // iteration, picking
  'findLast', // iteration, picking
  'pop', // mutation, picking
  'shift', // mutation, picking
  'sort', // iteration, mutation
  'splice', // mutation, producer
  'toSorted', // iteration, producer
]);

export default ConflictArrayMethods;
