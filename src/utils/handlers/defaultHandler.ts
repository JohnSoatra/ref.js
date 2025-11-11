/**
 * Default handler for property or method access when no specialized
 * reactive handling is applied.
 *
 * Behavior:
 * - Calls the original method or accesses the property directly.
 * - Returns the result as-is without creating a reactive proxy.
 * - Suitable for native methods or properties where reactive wrapping
 *   is not needed.
 *
 * @param target The original target object.
 * @param key The property or method key being accessed.
 * @param args Arguments to pass if the key is a function.
 * @returns The result of calling the method or accessing the property.
 */
export default function defaultHandler(
  this: any,
  target: any,
  key: any,
  ...args: any[]
) {
  return target[key].apply(this, args);
}
