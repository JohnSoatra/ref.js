import createProxy from "./createProxy";
import MutationMethods from "../constants/mutationMethods";
import Symbols from "../constants/symbols";
import { OnChange } from "../types/ref";
import { CacheProxy, CacheShallow } from "../types/createProxy";

export function creatable(value: any) {
  return typeof value === 'object' && value !== null;
}

export function isArray(value: any): boolean {
  return Array.isArray(value) || ArrayBuffer.isView(value);
}

export function isProxy(value: any): boolean {
  return value[Symbols.IsProxy] ?? false;
}

export function getRaw(proxy: any): object | undefined {
  return proxy[Symbols.RawObject];
}

export function mutationMethod(obj: object, key: string) {
  const list = MutationMethods.get(Object.getPrototypeOf(obj).constructor);
  return list ? list.includes(key) : false;
}

export function toProxies(
  cacheProxy: CacheProxy,
  cacheShallow: CacheShallow,
  onChange: OnChange,
  ...args: any[]
) {
  let array:any[] = [];

  for (const each of args) {
    let result;

    if (creatable(each)) {
      if (isProxy(each)) {
        result = each;
      } else if (cacheProxy.has(each)) {
        result = cacheProxy.get(each);
      } else {
        result = createProxy(each, cacheProxy, cacheShallow, onChange);
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
  if (
    value instanceof Int8Array ||
    value instanceof Int16Array ||
    value instanceof Int32Array ||
    value instanceof Uint8Array ||
    value instanceof Uint8ClampedArray ||
    value instanceof Uint16Array ||
    value instanceof Uint32Array ||
    value instanceof BigInt64Array ||
    value instanceof BigUint64Array ||
    value instanceof Float32Array ||
    value instanceof Float64Array
  ) {
    return new (value.constructor as any)(value) as T;
  }
  return value;
}

export function getWeakValue(proxy: WeakMap<any, any> | WeakSet<any>, key: object | undefined) {
  if (proxy instanceof WeakMap) {
    return proxy.get(key);
  } else if (proxy.has(key)) {
    return key;
  }
  return undefined;
}
