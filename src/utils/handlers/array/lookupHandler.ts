import { toRawArgs } from "../../utils";
import { LookupArrayMethods } from "../../../constants/lookupMethods/array";

/**
 * Handles "lookup" methods on arrays such as `includes`, `indexOf`, and `lastIndexOf`.
 * Converts any proxied arguments to raw values before calling the native method.
 *
 * @param target The target array to operate on.
 * @param key The lookup method to invoke.
 * @param args Arguments passed to the lookup method.
 * @returns The result of the array lookup operation.
 */
function lookupArrayHandler(
  this: any,
  target: any[],
  key: LookupArrayMethods,
  ...args: any[]
) {
  const rawArgs = toRawArgs(args);
  return (target as any)[key].apply(this, rawArgs);
}

export default lookupArrayHandler;
