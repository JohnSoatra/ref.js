import createProxy from "./createProxy";
import Symbols from "../constants/symbols";
import { OnChangeHandler } from "../types/ref";
import { CacheProxy, CacheShallow } from "../types/createProxy";
import Keys from "../constants/keys";

export function creatable(value: any) {
  return typeof value === 'object' && value !== null;
}

export function isArray(value: any): boolean {
  return Array.isArray(value) || (ArrayBuffer.isView(value) && !(value instanceof DataView));
}

export function isProxy(value: object): boolean {
  return (value as any)[Symbols.IsProxy] ?? false;
}

export function getRaw(proxy: any): object | undefined {
  return proxy[Symbols.RawObject];
}

export function forbiddenKey(key: string | symbol) {
  return typeof key === 'string' && Keys.ForbiddenKeys.includes(key);
}
// export function mutationMethod(obj: object, key: string) {
//   const list = MutationMethods.get(Object.getPrototypeOf(obj).constructor);
//   return list ? list.includes(key) : false;
// }

export function toProxies(
  cacheProxy: CacheProxy,
  cacheShallow: CacheShallow,
  onChange: OnChangeHandler,
  ...args: any[]
) {
  let array: any[] = [];

  for (const each of args) {
    let result;

    if (creatable(each)) {
      if (isProxy(each)) {
        result = each;
      } else if (cacheProxy.has(each)) {
        result = cacheProxy.get(each);
      } else {
        result = createProxy(each, cacheProxy, cacheShallow, onChange, false);
      }
    } else {
      result = each;
    }

    array.push(result);
  }

  return array;
}

export function shallowArray<T>(value: T): T {
  if (Array.isArray(value)) {
    return [...value] as T;
  }
  if (ArrayBuffer.isView(value) && !(value instanceof DataView)) {
    return new (value.constructor as any)(value) as T;
  }
  return value;
}

export function getWeakValue(target: WeakMap<any, any> | WeakSet<any>, key: any) {
  if (target instanceof WeakMap) {
    return target.get(key);
  } else if (target.has(key)) {
    return key;
  }
  return undefined;
}

export function nextFrame(callback: () => void) {
  if (typeof requestAnimationFrame === 'function') {
    requestAnimationFrame(callback);
  } else {
    setImmediate(callback);
  }
}
export function getNow() {
  if (typeof performance !== 'undefined') {
    return performance.now();
  }
  return Date.now();
}

export function tryToGetRaw(value: any) {
  if (creatable(value) && isProxy(value)) {
    return getRaw(value);
  }
  return value;
}

export function tryToCreateProxy(...args: Parameters<typeof createProxy>) {
  const value = args[0];
  if (creatable(value)) {
    return createProxy(...args);
  }
  return value;
}
