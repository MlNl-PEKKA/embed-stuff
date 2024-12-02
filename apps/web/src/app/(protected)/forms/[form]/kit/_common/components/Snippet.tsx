"use client";

import { BentoCard } from "./BentoCard";
import type { BentoCardProps } from "./BentoCard";

const Snippet = () => {
  return <>Snippet</>;
};

const Default = (props: BentoCardProps) => (
  <BentoCard {...props}>
    <Snippet />
  </BentoCard>
);

export { Default as Snippet };
