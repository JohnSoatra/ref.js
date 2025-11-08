/**
 * Describes a change event triggered by a reactive Ref.
 */
export type ChangeEvent = {
  /** The Ref object whose value changed. */
  target: any;
  /** The type of change, e.g., 'set', 'delete', or a mutation method name. */
  action: string | symbol;
  /** The property key being changed, usually 'value'. */
  key: any;
  /** The new value after the change. */
  value: any;
  /** The previous value before the change. */
  prevValue: any;
};

/**
 * Callback called whenever a Ref's value changes.
 *
 * Receives a ChangeEvent containing details about the change.
 */
export type OnChangeHandler = (event: ChangeEvent) => void;

/**
 * Options for configuring a reactive Ref.
 */
export type RefOptions = {
    /**
   * Optional cache used to store mappings of raw objects to their corresponding proxies.
   *
   * This ensures that the same object reference always returns the same proxy,
   * preserving identity across repeated accesses (e.g., `obj.a === obj.a` remains true).
   *
   * Normally, this cache is automatically managed internally by the reactive system.
   * You can provide a custom WeakMap if you want multiple refs to share the same
   * reactivity graph or maintain consistent proxies across different refs.
   *
   * ⚠️ Note: Passing an invalid or reused cache may cause unexpected proxy behavior.
   */
  cache?: WeakMap<object, object>;
  /**
   * Maximum number of updates allowed in a single tick (1–300).
   * Prevents infinite or excessive updates.
   */
  maxTick?: number;
  /**
   * Message to display or log when `maxTick` is exceeded.
   */
  maxTickMessage?: string;
  /**
   * Optional callback that is triggered whenever the Ref's value changes.
   */
  onchange?: OnChangeHandler;
};

/**
 * A reactive reference object.
 *
 * @template T The type of the stored value.
 */
export type Ref<T> = {
  /**
   * The reactive value of type T.
   * Reading or updating `.value` will trigger the `onchange` callback if provided.
   */
  value: T;
};

/**
 * Tracks the internal tick state of a Ref.
 */
export type Ticks = {
  /** Current tick count. */
  tick: number;
  /** Timestamp of the latest update. */
  latest: number;
  /** Whether an update is currently scheduled. */
  scheduled: boolean;
};
