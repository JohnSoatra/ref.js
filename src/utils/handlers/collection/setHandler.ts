import { tryToGetRaw } from "../../utils";
import { OnChangeHandler } from "../../../types/ref";

export default function setHandler(
  proxy: any,
  target: Map<any, any> | WeakMap<any, any>,
  key: any,
  value: any,
  onChange: OnChangeHandler,
) {
  const rawKey = tryToGetRaw(key);
  const rawValue = tryToGetRaw(value);
  const prevValue = target.get(rawKey);

  if (!Object.is(rawValue, prevValue)) {
    target.set(rawKey, rawValue);
    onChange({
      target: proxy,
      action: 'set',
      key,
      value,
      prevValue,
    });
  }

  return proxy;
}
