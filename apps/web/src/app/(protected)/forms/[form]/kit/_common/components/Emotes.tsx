"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Card } from "@/emotes/components/Card";
import type { Read } from "@/form/kit/api/emotes/read";
import { BentoCard } from "@/form/kit/components/BentoCard";
import type { BentoCardProps } from "@/form/kit/components/BentoCard";
import { useKitEmoteOptions } from "@/form/kit/hooks/useKitEmotesOptions";
import { useKitEmotesRead } from "@/form/kit/hooks/useKitEmotesRead";
import {
  KitEmotesStoreProvider,
  useKitEmotesStore,
} from "@/form/kit/hooks/useKitEmotesStore";
import {
  KitEmotesInsertProvider,
  useKitEmotesInsert,
} from "@/form/kit/hooks/useKitEmotesInsert";
import { cn } from "@/lib/utils";
import { Check, Minus, Plus, Trash, X } from "lucide-react";
import {
  KitEmotesRemoveProvider,
  useKitEmotesRemove,
} from "@/form/kit/hooks/useKitEmotesRemove";

const Content = () => {
  const mode = useKitEmotesStore((state) => state.mode);
  if (mode === "add") return <KitEmoteOptions />;
  return <KitEmotes />;
};

const KitEmoteOptions = () => {
  const options = useKitEmoteOptions();
  return (
    <CardContent className="flex flex-row flex-wrap justify-evenly gap-2">
      {options.map((props) => (
        <Emote key={props.id} {...props} />
      ))}
    </CardContent>
  );
};

const KitEmotes = () => {
  const emotes = useKitEmotesRead();
  return (
    <CardContent className="flex flex-row flex-wrap justify-evenly gap-2">
      {emotes.map((props) => (
        <Emote key={props.id} {...props} />
      ))}
    </CardContent>
  );
};

const Emote = (props: Read["output"][number]) => {
  const emotes = useKitEmotesStore((state) => state.emotes);
  const enabled = Boolean(emotes.find(({ id }) => props.id === id));
  const { addEmote, removeEmote } = useKitEmotesStore((state) => state.actions);
  return (
    <Card
      {...props}
      badge={<EmoteBadge enabled={enabled} />}
      loader={<EmoteLoading id={props.id} />}
      onClick={() => (enabled ? removeEmote(props) : addEmote(props))}
    />
  );
};

type EmoteBadgeProps = {
  enabled: boolean;
};
const EmoteBadge = (props: EmoteBadgeProps) => {
  const mode = useKitEmotesStore((state) => state.mode);
  return (
    <Card.Badge
      className={cn(
        "border-grey text-white",
        props.enabled
          ? mode === "add"
            ? "bg-green-600"
            : "bg-red-600"
          : "bg-black"
      )}
      hidden={mode === "view"}
    >
      {mode === "add" ? <Plus size={12} /> : <Minus size={12} />}
    </Card.Badge>
  );
};

type EmoteLoadingProps = {
  id: string;
};
const EmoteLoading = (props: EmoteLoadingProps) => {
  const { isPending: isInsertPending, variables: insertVariables } =
    useKitEmotesInsert();
  const { isPending: isRemovePending, variables: removeVariables } =
    useKitEmotesRemove();
  const loading =
    (isInsertPending && insertVariables.emotes.includes(props.id)) ||
    (isRemovePending && removeVariables.emotes.includes(props.id));
  return (
    <Card.Loader hidden={!loading}>
      <Badge variant="outline" className="bg-black">
        Loading...
      </Badge>
    </Card.Loader>
  );
};

const Header = () => (
  <CardHeader className="flex flex-row items-center justify-between">
    <CardTitle>
      <Title />
    </CardTitle>
    <div className="flex flex-row gap-2">
      <Actions />
    </div>
  </CardHeader>
);

const Title = () => {
  const mode = useKitEmotesStore((state) => state.mode);
  switch (mode) {
    case "view":
      return <>Emotes</>;
    case "add":
      return <>Add Emotes</>;
    case "remove":
      return <>Remove Emotes</>;
  }
};

const Actions = () => {
  const mode = useKitEmotesStore((state) => state.mode);
  switch (mode) {
    case "view":
      return <ViewActions />;
    case "add":
      return <AddActions />;
    case "remove":
      return <RemoveActions />;
  }
};

const ViewActions = () => {
  const { setMode } = useKitEmotesStore((state) => state.actions);
  return (
    <>
      <Button variant="outline" onClick={() => setMode("add")}>
        <Plus />
        Add emotes
      </Button>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setMode("remove")}
          >
            <Trash />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Remove emotes</TooltipContent>
      </Tooltip>
    </>
  );
};

const AddActions = () => {
  const { mutate, isPending } = useKitEmotesInsert();
  return <SelectionActions disabled={isPending} confirm={() => mutate()} />;
};

const RemoveActions = () => {
  const { mutate, isPending } = useKitEmotesRemove();
  return <SelectionActions disabled={isPending} confirm={() => mutate()} />;
};

type SelectionActionProps = {
  confirm: () => void;
  disabled: boolean;
};
const SelectionActions = (props: SelectionActionProps) => {
  const emotes = useKitEmotesStore((state) => state.emotes);
  const { setMode } = useKitEmotesStore((state) => state.actions);
  const confirmDisabled = props.disabled || emotes.length === 0;
  const cancelDisabled = props.disabled;
  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            disabled={confirmDisabled}
            onClick={props.confirm}
          >
            <Check />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Confirm</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setMode("view")}
            disabled={cancelDisabled}
          >
            <X />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Cancel</TooltipContent>
      </Tooltip>
    </>
  );
};

export const Emotes = ({ className, ...props }: BentoCardProps) => (
  <BentoCard className={cn("gap-4", className)} {...props}>
    <KitEmotesStoreProvider>
      <KitEmotesInsertProvider>
        <KitEmotesRemoveProvider>
          <Header />
          <Content />
        </KitEmotesRemoveProvider>
      </KitEmotesInsertProvider>
    </KitEmotesStoreProvider>
  </BentoCard>
);
