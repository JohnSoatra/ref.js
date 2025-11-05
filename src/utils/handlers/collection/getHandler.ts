import { tryToCreateProxy, tryToGetRaw } from "../../utils";
import { OnChangeHandler } from "../../../types/ref";
import { CacheProxy, CacheShallow } from "../../../types/createProxy";

export default function getHandler(
  value: Map<any, any> | WeakMap<any, any>,
  key: object,
  cacheProxy: CacheProxy,
  cacheShallow: CacheShallow,
  onChange: OnChangeHandler,
) {
  const result = value.get(tryToGetRaw(key));
  return tryToCreateProxy(result, cacheProxy, cacheShallow, onChange);
}
