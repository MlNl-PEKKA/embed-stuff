"use client";

import type { PropsWithChildren } from "react";
import type { StoreApi } from "zustand";
import { createContext, useContext, useState } from "react";
import { createStore, useStore } from "zustand";

import type { NonUndefined } from "@embed-stuff/utils/types";

import type { StoreType } from "~/app/types";
import type { Read } from "~/feedbacks/types";
import { READ } from "~/feedbacks/constants/read";

type Status = NonUndefined<NonUndefined<Read["input"]>["status"]>;

export type Store = StoreType<
  Read["input"] & {
    placeholderTitle: string;
  },
  {
    pushStatus: (status: Status[number]) => void;
    popStatus: (status: Status[number]) => void;
  },
  {
    cancellable: () => boolean;
  }
>;

const useStoreDefaults = () => {
  const [store] = useState<StoreApi<Store>>(() =>
    createStore((set, get) => ({
      ...READ,
      placeholderTitle: "",
      cancellable: () => get().title !== "" || get().status.length !== 0,
      actions: {
        reset: () =>
          set({
            title: "",
            status: [],
            placeholderTitle: "",
          }),
        setTitle: (title) => set({ title }),
        setPlaceholderTitle: (placeholderTitle) => set({ placeholderTitle }),
        setStatus: (status) => set({ status }),
        pushStatus: (status) =>
          set((state) => ({ status: [...state.status, status] })),
        popStatus: (status) =>
          set((state) => ({
            status: state.status.filter((s) => s !== status),
          })),
      },
    })),
  );
  return store;
};

const FeedbacksStore = createContext<
  ReturnType<typeof useStoreDefaults> | undefined
>(undefined);

export const FeedbacksStoreProvider = (props: PropsWithChildren) => {
  const store = useStoreDefaults();
  return (
    <FeedbacksStore.Provider value={store}>
      {props.children}
    </FeedbacksStore.Provider>
  );
};

export const useFeedbacksStore = <T,>(selector: (store: Store) => T) => {
  const store = useContext(FeedbacksStore);
  if (!store) throw new Error("FeedbacksStore not found");
  return useStore(store, selector);
};
