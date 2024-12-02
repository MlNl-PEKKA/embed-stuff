import type { Read } from "@/form/kit/api/emotes/read";
import { createContext, useContext, useState } from "react";
import type { PropsWithChildren } from "react";
import { createStore, useStore } from "zustand";

type Emote = Read["output"][number];

type State = {
  mode: "view" | "add" | "remove";
  emotes: Emote[];
};

type Actions = {
  setMode: (mode: State["mode"]) => void;
  addEmote: (emote: Emote) => void;
  removeEmote: (emote: Emote) => void;
};

type Store = State & { actions: Actions };

const initalState: Readonly<State> = {
  emotes: [],
  mode: "view",
} as const;

const useContextDefault = () => {
  const [store] = useState(() =>
    createStore<Store>((set) => ({
      ...structuredClone(initalState),
      actions: {
        setMode: (mode) =>
          set({ mode, emotes: structuredClone(initalState.emotes) }),
        addEmote: (emote) =>
          set((state) => ({ emotes: [...state.emotes, emote] })),
        removeEmote: (emote) =>
          set((state) => ({
            emotes: state.emotes.filter(({ id }) => id !== emote.id),
          })),
      },
    })),
  );
  return store;
};

const KitEmotesStoreContext = createContext<
  ReturnType<typeof useContextDefault> | undefined
>(undefined);

export const KitEmotesStoreProvider = (props: PropsWithChildren) => {
  const value = useContextDefault();
  return (
    <KitEmotesStoreContext.Provider value={value}>
      {props.children}
    </KitEmotesStoreContext.Provider>
  );
};

export const useKitEmotesStore = <T,>(selector: (state: Store) => T) => {
  const value = useContext(KitEmotesStoreContext);
  if (!value) throw new Error("KitEmotesStoreContext not found as a provider");
  return useStore(value, selector);
};
