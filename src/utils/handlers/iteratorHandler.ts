import { IteratorMethods } from "../../constants/iteratorMethods";
import { createProxyTry, getRawTry, isMapCollection } from "../utils";
import { CacheProxy } from "../../types/createProxy";
import { OnChangeHandler } from "../../types/ref";

export function createProxiedIterator(
  iterator: Iterator<any>,
  ...args: Parameters<typeof iteratorHandler<
    any[] | Map<any, any> | Set<any>
  >>
): Iterator<any> & Iterable<any> {
  const [thisTarget, cache, key, onChange] = args;
  const isTargetArray = Array.isArray(thisTarget);
  const isResultArray = key === 'entries' || (
    isMapCollection(thisTarget) && key === Symbol.iterator
  );
  const proxiedIterator = {
    next(this: any, value?: any) {
      const matchedIterator = this === proxiedIterator ? iterator : this;
      const rawIterator = getRawTry(matchedIterator);
      const result = iterator.next.call(rawIterator, value);
      if (!result.done) {
        if (isResultArray) {
          if (isTargetArray) {
            const [, item] = result.value;
            result.value[1] = createProxyTry(item, cache, onChange);
          } else {
            result.value = result.value.map((each: any) => createProxyTry(each, cache, onChange));
          }
        } else {
          result.value = createProxyTry(result.value, cache, onChange);
        }
      }
      return result;
    },
    [Symbol.iterator](this: any) {
      return getRawTry(this);
    }
  }
  return proxiedIterator;
}

/**
 * Wraps an iterator (from Array, Map, or Set) in a proxied version
 * so that values yielded during iteration remain reactive.
 *
 * Behavior:
 * - Calls the native iterator method (`Symbol.iterator`, `entries`, `values`, `keys`) on the target.
 * - Wraps each yielded value with `createProxyTry` so consumers get reactive objects.
 * - Preserves the iterable protocol (`[Symbol.iterator]()`) for `for..of` or spread operations.
 */
export default function iteratorHandler<T extends any[] | Map<any, any> | Set<any>>(
  // expects raw object
  this: T,
  target: T,
  cache: CacheProxy,
  key: IteratorMethods,
  onChange: OnChangeHandler,
) {
  const isProxied = cache.get(this);
  const iterator = target[key].call(this) as Iterator<any> & Iterable<any>;
  return isProxied ?
    createProxiedIterator(iterator, this, cache, key,  onChange) :
    iterator;
}
