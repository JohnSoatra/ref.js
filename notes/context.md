[{}].at(); // picking
[{}].concat(); // producer
[{}].copyWithin(); // mutation
[{}].entries(); // iterator
[{}].every(); // iteration
[{}].fill(); // mutation
[{}].filter(); // iteration, producer
[{}].find(); // iteration, picking
[{}].findIndex(); // iteration
[{}].findLast(); // iteration, picking
[{}].findLastIndex(); // iteration
[{}].flat(); // producer
[{}].flatMap(); // iteration
[{}].forEach(); // iteration
[{}].includes(); // lookup
[{}].indexOf(); // lookup
[{}].keys(); // iterator
[{}].lastIndexOf(); // lookup
[{}].map(); // iteration
[{}].pop(); // mutation, picking
[{}].push(); // mutation
[{}].reduce(); // iteration
[{}].reduceRight(); // iteration
[{}].reverse(); // mutation
[{}].shift(); // mutation, picking
[{}].slice(); // producer
[{}].some(); // iteration
[{}].sort(); // mutation, iteration
[{}].splice(); // mutation, producer
[{}].toReversed(); // producer
[{}].toSorted(); // iteration, producer
[{}].toSpliced(); // producer
[{}].unshift(); // mutation
[{}].values(); // iterator
[{}].with(); // producer
[{}][Symbol.iterator] // iterator

### Array Methods
//  sort's callback can be undefined

### Object Methods
//  cannot override getOwnPropertyDescriptor trap
    because it is also used internally by object itself.
//  can override defineProperty trap
    because we can manage vai fromSetTrap variable.
