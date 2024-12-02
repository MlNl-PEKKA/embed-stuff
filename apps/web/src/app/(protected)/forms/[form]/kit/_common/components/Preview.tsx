"use client";

import { BentoCard } from "./BentoCard";
import type { BentoCardProps } from "./BentoCard";

const Preview = () => {
  return <>Preview</>;
};

const Default = (props: BentoCardProps) => (
  <BentoCard {...props}>
    <Preview />
  </BentoCard>
);

export { Default as Preview };
