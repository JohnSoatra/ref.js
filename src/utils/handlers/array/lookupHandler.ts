import { toRawArgs } from "../../utils";
import { LookupArrayMethods } from "../../../constants/lookupMethods/array";

function lookupArrayHandler(
  target: any[],
  key: LookupArrayMethods,
  ...args: any[]
) {
  const [searchElement, fromIndex] = toRawArgs(args);
  return target[key](searchElement, fromIndex);
}

export default lookupArrayHandler;
