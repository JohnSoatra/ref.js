import { LookupArrayMethods } from "../../../constants/lookupMethods/array";
import { toRawArgs } from "../../utils";
import { CacheProxy } from "../../../types/createProxy";

/**
 * Handles "lookup" methods on arrays such as `includes`, `indexOf`, and `lastIndexOf`.
 * Converts any proxied arguments to raw values before calling the native method.
 */
export default function lookupArrayHandler<T extends any[]>(
  // expects raw object
  this: T,
  target: T,
  cache: CacheProxy,
  key: LookupArrayMethods,
  ...args: any[]
) {
  const isProxied = cache.has(this);
  const rawArgs =  isProxied ? toRawArgs(args) : args;
  return (target as any)[key].apply(this, rawArgs);
}
