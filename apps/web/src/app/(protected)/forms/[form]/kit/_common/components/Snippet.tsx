"use client";

import { type BentoCardProps, BentoCard } from "./BentoCard";

const Snippet = () => {
  return <>Snippet</>;
};

const Default = (props: BentoCardProps) => (
  <BentoCard {...props}>
    <Snippet />
  </BentoCard>
);

export { Default as Snippet };
