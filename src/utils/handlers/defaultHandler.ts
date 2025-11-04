import { toProxies } from "../utils";
import { OnChange } from "../../types/ref";
import { CacheProxy, CacheShallow } from "../../types/createProxy";

export default function defaultHandler(
  proxy: object,
  target: object,
  key: string | symbol,
  cacheProxy: CacheProxy,
  cacheShallow: CacheShallow,
  onChange: OnChange,
  ...args: any[]
) {
  const result = (target  as any)[key](...toProxies(
    cacheProxy,
    cacheShallow,
    onChange,
    ...args
  ));

  return result === target ? proxy : result;
}
