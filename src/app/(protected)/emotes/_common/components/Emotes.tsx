"use client";

import { useEmotes } from "@/emotes/hooks/useEmotes";
import { Content } from "./Content";
import { Card } from "./Card";

export const Emotes = () => {
  const emotes = useEmotes();
  return (
    <Content>
      {emotes.map((emote) => (
        <Card key={emote.id} {...emote} />
      ))}
    </Content>
  );
};
