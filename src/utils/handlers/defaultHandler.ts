import { isProxy, toRawArgs } from "../utils";
import { CacheProxy } from "../../types/createProxy";

/**
 * Default handler for property or method access when no specialized
 * reactive handling is applied.
 *
 * Behavior:
 * - Calls the original method or accesses the property directly.
 * - Returns the result as-is without creating a reactive proxy.
 * - Suitable for native methods or properties where reactive wrapping
 *   is not needed.
 */
export default function defaultHandler<T extends object>(
  // expects both raw and proxy object
  this: T,
  target: T,
  cache: CacheProxy,
  key: any,
  ...args: any[]
) {
  const isProxied = isProxy(this) || cache.has(this);
  const rawArgs = isProxied ? toRawArgs(args) : args;
  return (target as any)[key].apply(this, rawArgs);
}
