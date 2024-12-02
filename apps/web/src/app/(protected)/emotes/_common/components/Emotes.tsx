"use client";

import { useEmotes } from "@/emotes/hooks/useEmotes";
import { Content } from "./Content";
import { Card } from "./Card";

export const Emotes = () => {
  const emotes = useEmotes();
  return (
    <Content>
      {emotes.map((emote) => (
        <Card
          key={emote.id}
          {...emote}
          badge={
            <Card.Badge
              className={"bg-yellow-500 font-bold text-black"}
              hidden={!emote.is_pro}
            >
              PRO
            </Card.Badge>
          }
        />
      ))}
    </Content>
  );
};
