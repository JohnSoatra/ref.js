import { createProxiedIterator } from "../utils";
import { IteratorMethods } from "../../constants/iteratorMethods";
import { TypedArray } from "../../types/types";
import { CacheProxy } from "../../types/createProxy";
import { OnChangeHandler } from "../../types/ref";

export default function iteratorHandler(
  target: any[] | TypedArray | Map<any, any> | Set<any>,
  key: IteratorMethods,
  cache: CacheProxy,
  onChange: OnChangeHandler,
): Iterator<any> & Iterable<any> {
  const iterator = target[key]() as Iterator<any>;
  return createProxiedIterator(iterator, cache, onChange);
}
