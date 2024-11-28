"use client";

import { type BentoCardProps, BentoCard } from "./BentoCard";

const Preview = () => {
  return <>Preview</>;
};

const Default = (props: BentoCardProps) => (
  <BentoCard {...props}>
    <Preview />
  </BentoCard>
);

export { Default as Preview };
