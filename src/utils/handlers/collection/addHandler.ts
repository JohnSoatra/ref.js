import { getRawTry } from "../../utils";
import { OnChangeHandler } from "../../../types/ref";
import { CacheProxy } from "../../../types/createProxy";

/**
 * Handles adding a value to a Set or WeakSet.
 *
 * Behavior:
 * - Converts proxied values to raw objects to avoid double-proxy issues.
 * - Only triggers `onChange` if the value was not already present in the Set/WeakSet.
 * - Returns the proxy itself for fluent use.
 */
export default function addHandler<T extends Set<any> | WeakSet<any>>(
  //expects raw object
  this: T,
  target: T,
  cache: CacheProxy,
  onChange: OnChangeHandler,
  ...args: any[]
) {
  const proxy = cache.get(this);
  const [value] = args;
  const rawValue = proxy ? getRawTry(value) : value;
  const hasValue = target.has.call(this, rawValue);
  if (!hasValue) {
    target.add.call(this, rawValue);
    proxy && onChange({
      target: proxy,
      action: 'add',
      key: value,
      value,
      prevValue: undefined,
    });
  }
  return proxy ?? this;
}
