import { forbiddenKey, isArray, isProxy, mutationMethod } from "./utils";
import Symbols from "../constants/symbols";
import Keys from "../constants/keys";
import arrayHandler from "./handlers/arrayHandler";
import mapHandler from "./handlers/mapHandler";
import setHandler from "./handlers/setHandler";
import mutationHandler from "./handlers/mutationHandler";
import getHandler from "./handlers/collection/getHandler";
import hasHandler from "./handlers/collection/hasHandler";
import deleteHandler from "./handlers/collection/deleteHandler";
import defaultHandler from "./handlers/defaultHandler";
import { OnChangeHandler } from "../types/ref";
import { CacheProxy, CacheShallow } from "../types/createProxy";

export default function createProxy<T extends Record<string, any>>(
  content: T,
  cacheProxy: CacheProxy,
  cacheShallow: CacheShallow,
  onChange: OnChangeHandler,
  saveProxy?: boolean,
) {
  if (isProxy(content)) {
    return content;
  }
  if (cacheProxy.has(content)) {
    return cacheProxy.get(content);
  }

  const proxy = new Proxy(content, {
    get(target: any, key, receiver) {
      if (forbiddenKey(key)) {
        return undefined;
      }
      if (key === Symbols.IsProxy) {
        return true;
      }
      if (key === Symbols.RawObject) {
        return content;
      }

      let value: any;

      try {
        value = Reflect.get(target, key, receiver);
      } catch {
        value = Reflect.get(target, key);
      }

      if (
        !(value === undefined || value === null) &&
        (
          isArray(value) ||
          typeof value === 'object' ||
          typeof value === 'function'
        )
      ) {
        if (isArray(value) || typeof value === 'object') {
          return createProxy(value, cacheProxy, cacheShallow, onChange);
        }
        if (key === Keys.Get && value instanceof WeakMap) {
          return function (getKey: any) {
            return getHandler(target, getKey, cacheProxy, cacheShallow, onChange);
          }
        } else if (
          key === Keys.Has &&
          (value instanceof WeakMap || value instanceof WeakSet)
        ) {
          return function (hasKey: any) {
            return hasHandler(target, hasKey, cacheProxy, cacheShallow, onChange);
          }
        } else if (
          key === Keys.Delete &&
          (value instanceof WeakMap || value instanceof WeakSet)
        ) {
          return function (deleteKey: any) {
            return deleteHandler(proxy, target, deleteKey, cacheProxy, cacheShallow, onChange);
          }
        } else if (typeof key === 'string' && mutationMethod(target, key)) {
          return function (...args: any[]) {
            return mutationHandler(proxy, target, key, cacheProxy, cacheShallow, onChange, ...args);
          }
        }
        return function (...args: any[]) {
          const result = value.call(target, ...args);
          return result === target ? proxy : target;
        }
      }
      return value;
    },
    set(target, key, newValue, receiver) {
      if (typeof key === 'string' && Keys.ForbiddenKeys.includes(key)) return true;
      const currentValue = target[key];

      if (!Object.is(currentValue, newValue)) {
        const prevValue = proxy[key];
        const result = Reflect.set(target, key, newValue, receiver);

        onChange({
          target: proxy,
          action: 'set',
          key,
          value: newValue,
          prevValue: prevValue,
        });

        return result;
      };
      return true;
    },
    deleteProperty(target, key) {
      if (typeof key === 'string' && Keys.ForbiddenKeys.includes(key)) return true;
      const hasKey = Object.prototype.hasOwnProperty.call(target, key);

      if (hasKey) {
        const prevValue = proxy[key];
        const result = Reflect.deleteProperty(target, key);

        onChange({
          target: proxy,
          action: 'delete',
          key,
          value: undefined,
          prevValue: prevValue
        });

        return result;
      };
      return true;
    }
  });

  if (saveProxy ?? true) {
    cacheProxy.set(content, proxy);
  }

  return proxy;
}
