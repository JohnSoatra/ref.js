import { ProducerArrayMethods } from "../../../constants/producerMethods/array";
import { toProxiedItems, toRawArgs } from "../../utils";
import { CacheProxy } from "../../../types/createProxy";
import { OnChangeHandler } from "../../../types/ref";

/**
 * Handles "producer" methods on arrays, such as `concat`, `slice`, `flat`, etc.
 *
 * Behavior:
 * - Converts proxied arguments to raw values to prevent double-proxy issues.
 * - Wraps returned arrays/items in proxies for reactive tracking.
 * - Original array is **not mutated** for immutable producer methods.
 */
export default function producerArrayHandler<T extends any[]>(
  // expects raw object
  this: T,
  target: T,
  cache: CacheProxy,
  key: ProducerArrayMethods,
  onChange: OnChangeHandler,
  ...args: any[]
) {
  const isProxied = cache.has(this);
  const rawArgs = isProxied ? toRawArgs(args) : args;
  const value = target[key].apply(this, rawArgs);
  return isProxied ? toProxiedItems(value, cache, onChange) : value;
}
