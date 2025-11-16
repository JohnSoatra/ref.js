import { PickingArrayMethods } from "../../../constants/pickingMethods/array";
import { createProxyTry, toRawArgs } from "../../utils";
import { CacheProxy } from "../../../types/createProxy";
import { OnChangeHandler } from "../../../types/ref";

/**
 * Handles "picking" methods on arrays, currently only `at`.
 *
 * Behavior:
 * - Converts proxied arguments to raw values before calling the native method.
 * - Wraps the returned value in a proxy if it's a creatable object.
 * - Returns `undefined` or the proxied result.
 */
export default function pickingArrayHandler<T extends any[]>(
  // expects raw object
  this: T,
  target: T,
  cache: CacheProxy,
  key: PickingArrayMethods,
  onChange: OnChangeHandler,
  ...args: any[]
) {
  const isProxied = cache.has(this);
  const rawArgs = isProxied ? toRawArgs(args) : args;
  const value = (target as any)[key].apply(this, rawArgs);
  return isProxied ? createProxyTry(value, cache, onChange) : value;
}
