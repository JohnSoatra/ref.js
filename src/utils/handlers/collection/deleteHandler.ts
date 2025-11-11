import { getWeakValue, getRawTry, removeCacheTry, isMapCollection } from "../../utils";
import { CacheProxy } from "../../../types/createProxy";
import { OnChangeHandler } from "../../../types/ref";

/**
 * Handles deleting a key/value from Map, Set, WeakMap, or WeakSet.
 *
 * Behavior:
 * - Converts proxied keys to their raw versions to maintain correct identity.
 * - For Map/WeakMap, also retrieves the previous value via `getWeakValue`.
 * - Removes any cached proxies for the deleted key and, if applicable, the value.
 * - Triggers `onChange` only if deletion actually occurs.
 *
 * @param proxy The proxied collection.
 * @param target The original collection (Map, Set, WeakMap, WeakSet).
 * @param key The key to delete.
 * @param cache WeakMap cache of raw ↔ proxy objects.
 * @param onChange Callback triggered after deletion.
 * @returns `true` if the key/value was deleted, `false` otherwise.
 */
export default function deleteHandler(
  this: any,
  target: Map<any, any> | Set<any> | WeakMap<any, any> | WeakSet<any>,
  cache: CacheProxy,
  onChange: OnChangeHandler,
  ...args: any[]
) {
  const [key] = args;
  const rawKey = getRawTry(key);
  const prevValue = getWeakValue(target, rawKey);
  const deleted = target.delete.call(this, rawKey);
  if (deleted) {
    removeCacheTry(rawKey, cache);
    if (isMapCollection(target)) {
      removeCacheTry(prevValue, cache);
    }
    onChange({
      target: this,
      action: 'delete',
      key,
      value: undefined,
      prevValue
    });
  }
  return deleted;
}
