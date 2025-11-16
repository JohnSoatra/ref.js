import { getWeakValue, getRawTry } from "../../utils";
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
 */
export default function deleteHandler<T extends
  | Map<any, any>
  | Set<any>
  | WeakMap<any, any>
  | WeakSet<any>
>(
  //expects raw object
  this: T,
  target: T,
  cache: CacheProxy,
  onChange: OnChangeHandler,
  ...args: any[]
) {
  const proxy = cache.get(this);
  const [key] = args;
  const rawKey = proxy ? getRawTry(key) : key;
  const prevValue = getWeakValue(this, rawKey);
  const deleted = target.delete.call(this, rawKey);
  if (deleted && proxy) {
    onChange({
      target: proxy,
      action: 'delete',
      key,
      value: undefined,
      prevValue
    });
  }
  return deleted;
}
