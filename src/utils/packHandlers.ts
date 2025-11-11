import lookupArrayHandler from "./handlers/array/lookupHandler";
import mutationArrayHandler from "./handlers/array/mutateHandler";
import addHandler from "./handlers/collection/addHandler";
import deleteHandler from "./handlers/collection/deleteHandler";
import getHandler from "./handlers/collection/getHandler";
import hasHandler from "./handlers/collection/hasHandler";
import setHandler from "./handlers/collection/setHandler";
import clearHandler from "./handlers/collection/clearHandler";
import defaultHandler from "./handlers/defaultHandler";
import iterationHandler from "./handlers/iterationHandler";
import iteratorHandler from "./handlers/iteratorHandler";
import producerArrayHandler from "./handlers/array/producerHandler";
import pickingArrayHandler from "./handlers/array/pickingHandler";
import conflictArrayHandler from "./handlers/array/conflictHandler";
import { CacheProxy } from "../types/createProxy";
import { OnChangeHandler } from "../types/ref";

/**
 * Packs and binds all handler functions with shared context.
 *
 * Each handler receives the `target`, `key`, `cache`, and `onChange` references,
 * ensuring consistent behavior across mutation, lookup, and iteration operations.
 *
 * @param proxy The proxy instance of the target.
 * @param target The raw target object being proxied.
 * @param key The property key currently being accessed.
 * @param cache WeakMap used for proxy–raw mapping to maintain identity.
 * @param onChange Callback invoked when a reactive change occurs.
 * @returns An object containing all pre-bound handler functions.
 */
export default function packHandlers(
  target: any,
  key: any,
  cache: CacheProxy,
  onChange: OnChangeHandler,
) {
  return {
    conflictArrayHandler: wrapHandler(conflictArrayHandler, target, key, cache, onChange),
    mutationArrayHandler: wrapHandler(mutationArrayHandler, target, key, onChange),
    producerArrayHandler: wrapHandler(producerArrayHandler, target, key, cache, onChange),
    iterationHandler: wrapHandler(iterationHandler, target, key, cache, onChange),
    iteratorHandler: wrapHandler(iteratorHandler, target, key, cache, onChange),
    lookupArrayHandler: wrapHandler(lookupArrayHandler, target, key),
    pickingArrayHandler: wrapHandler(pickingArrayHandler, target, key, cache, onChange),
    getHandler: wrapHandler(getHandler, target, cache, onChange),
    setHandler: wrapHandler(setHandler, target, cache, onChange),
    addHandler: wrapHandler(addHandler, target, onChange),
    hasHandler: wrapHandler(hasHandler, target),
    deleteHandler: wrapHandler(deleteHandler, target, cache, onChange),
    clearHandler: wrapHandler(clearHandler, target, cache, onChange),
    defaultHandler: wrapHandler(defaultHandler, target, key),
  }
}
function trackApply(func: Function) {
  return new Proxy(func, {
    apply(target, thisArg, argArray) {
      console.log('in apply');
      return Reflect.apply(target, thisArg, argArray);
    },
  });
}
function wrapHandler<T extends ((...args: any[]) => any)>(handler: T, ...params: Parameters<T>) {
  const func = function (this: any, ...args: any[]) {
    handler.apply(this, params.concat(args));
  }
  return trackApply(func);
}
