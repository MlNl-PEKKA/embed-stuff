import { useEmotes } from "../hooks/useEmotes";
import { Content } from "./Content";
import Card from "./Card";

export const Page = () => {
  const emotes = useEmotes();
  return (
    <Content>
      {emotes.map((emote) => (
        <Card key={emote.id} {...emote} />
      ))}
    </Content>
  );
};
