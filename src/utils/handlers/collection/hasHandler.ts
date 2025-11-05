import { tryToGetRaw } from "../../utils";

export default function hasHandler(
  value: Map<any, any> | Set<any> | WeakMap<any, any> | WeakSet<any>,
  key: object,
) {
  return value.has(tryToGetRaw(key));
}
