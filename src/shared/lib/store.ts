import { useSyncExternalStore } from "use-sync-external-store/shim"; // React 17 ---> /shim

export const createStore = <T>(initialValue: T) => {
  let value: T = initialValue;
  let listeners: (() => void)[] = [];

  return {
    getState: (): T => value,
    setState: (updatedValue: T) => {
      value = updatedValue;
      listeners.forEach((listener) => listener());
    },
    subscribe: (listener: () => void) => {
      listeners.push(listener);
      return () => {
        listeners = listeners.filter((l) => l !== listener);
      };
    },
  };
};

export const createComputedStore = <T, R>(
  store: ReturnType<typeof createStore<T>>,
  compute: (state: T) => R
) => {
  let computedValue = compute(store.getState());

  const getState = () => computedValue;

  store.subscribe(() => {
    computedValue = compute(store.getState());
  });

  return { getState, subscribe: store.subscribe };
};

export const useStore = <T>(store: {
  getState: () => T;
  subscribe: (listener: () => void) => () => void;
}) => {
  return useSyncExternalStore(store.subscribe, store.getState);
};
