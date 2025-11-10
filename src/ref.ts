import createProxy from './utils/createProxy';
import { toOptions } from './utils/utils';
import { OnChangeHandler, Ref, RefOptions } from './types/ref';

/**
 * Creates a reactive reference object with an onchange callback.
 *
 * All refs require an onchange handler to handle changes.
 *
 * @param initial The initial value of the reactive reference.
 * @param onchange Callback to handle change events.
 * @returns A reactive reference object of type `Ref<T>`.
 */
function ref<T>(initial: T, onchange: OnChangeHandler): Ref<T>;

/**
 * Creates a reactive reference object.
 *
 * - `value`: the reactive value.
 * - `onchange`: called whenever the value or nested objects/arrays change.
 * - `cache` (optional): WeakMap to store raw-to-proxy mappings, keeping object identity.
 *
 * Example:
 * ```ts
 * const count = ref(0, { onchange: (event) => console.log(event.value) });
 * count.value = 5; // triggers onchange
 * ```
 *
 * @param initial Initial value.
 * @param options RefOptions with optional `onchange` and `cache`.
 * @returns A reactive Ref object.
 */
function ref<T>(initial: T, options: RefOptions): Ref<T>;

/**
 * Creates a reactive reference object with an optional undefined initial value.
 *
 * The returned object has:
 * - `value`: initially `undefined` (or default type `T | undefined`).
 * - `onchange`: can be assigned later.
 *
 * Example usage:
 * ```ts
 * const count = ref<number>();
 * count.value = 5; // Triggers onchange if assigned
 * ```
 *
 * @returns A reactive reference object of type `Ref<T | undefined>`.
 */
function ref<T>(initial: T, onchangeOrOptions: OnChangeHandler | RefOptions): Ref<T | undefined> {
  const options = toOptions(onchangeOrOptions);
  const cache = options.cache ?? new WeakMap();
  return createProxy({ value: initial }, cache, options.onchange);
}

export default ref;
