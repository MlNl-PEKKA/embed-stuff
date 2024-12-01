import { useFormParams } from "@/form/hooks/useFormParams";
import { api } from "@/trpc/react";
import { createContext, type PropsWithChildren, useContext } from "react";
import { useKitEmotesStore } from "./useKitEmotesStore";

export const useContextDefaults = () => {
  const { form } = useFormParams();
  const emotes = useKitEmotesStore((state) => state.emotes).map(({ id }) => id);
  const { setMode } = useKitEmotesStore((state) => state.actions);
  const mutation = api.protected.forms.form.kit.emotes.insert.useMutation({
    onSuccess: () => setMode("view"),
  });
  const mutate = () => mutation.mutate({ id: form, emotes });
  const mutateAsync = async () => {
    try {
      return await mutation.mutateAsync({ id: form, emotes });
    } catch {
      //
    }
  };
  return { ...mutation, mutate, mutateAsync };
};

const KitEmotesInsert = createContext<
  ReturnType<typeof useContextDefaults> | undefined
>(undefined);

export const KitEmotesInsertProvider = (props: PropsWithChildren) => {
  const value = useContextDefaults();
  return (
    <KitEmotesInsert.Provider value={value}>
      {props.children}
    </KitEmotesInsert.Provider>
  );
};

export const useKitEmotesInsert = () => {
  const value = useContext(KitEmotesInsert);
  if (!value) throw new Error("KitEmotesInsert not found as a provider");
  return value;
};
