import {  getRawTry } from "../../utils";
import { CacheProxy } from "../../../types/createProxy";
import { OnChangeHandler } from "../../../types/ref";

/**
 * Sets a key-value pair in a Map or WeakMap with reactive tracking.
 *
 * Behavior:
 * - Converts proxied key and value to their raw counterparts.
 * - Only triggers `onChange` if the new value differs from the previous value.
 * - Removes any cached proxy associated with the previous value to prevent memory leaks.
 * - Returns the proxy for chaining.
 */
export default function setHandler<T extends Map<any, any> | WeakMap<any, any>>(
  //expects raw object
  this: T,
  target: T,
  cache: CacheProxy,
  onChange: OnChangeHandler,
  ...args: any[]
) {
  const proxy = cache.get(this);
  const [key, value] = args;
  const rawKey = proxy ? getRawTry(key) : key;
  const rawValue = proxy ? getRawTry(value) : value;
  const prevValue = target.get.call(this, rawKey);
  if (!Object.is(rawValue, prevValue)) {
    target.set.call(this, rawKey, rawValue);
    proxy && onChange({
      target: proxy,
      action: 'set',
      key,
      value,
      prevValue,
    });
  }
  return proxy ?? this;
}
