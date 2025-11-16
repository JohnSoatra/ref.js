import { CacheProxy } from "../../../types/createProxy";
import { OnChangeHandler } from "../../../types/ref";

/**
 * Handles the `clear()` method for reactive Map/Set.
 *
 * - Clears the collection.
 * - Removes all entries from the proxy cache.
 * - Triggers the `onChange` callback if the collection was non-empty.
 */
export default function clearHandler<T extends Map<any, any> | Set<any>>(
  //expects raw object
  this: T,
  target: T,
  cache: CacheProxy,
  onChange: OnChangeHandler,
) {
  if (this.size > 0) {
    const proxy = cache.get(this);
    target.clear.call(this);
    proxy && onChange({
      target: proxy,
      action: 'clear',
      key: undefined,
      value: undefined,
      prevValue: undefined,
    });
  }
}
