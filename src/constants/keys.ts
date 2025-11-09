const Keys = {
  Get: 'get',
  Set: 'set',
  Add: 'add',
  Has: 'has',
  Delete: 'delete',
  ForEach: 'forEach',
  ForbiddenKeys: new Set(['__proto__', 'constructor', 'prototype']),
} as const;

export default Keys;
