import { Box, Boxes, TableOfContents } from "lucide-react";
import { Path } from "./path";

export const Top = () => {
  return (
    <nav className="grid gap-1 p-2">
      <Path logo={<TableOfContents />} name="Projects" path="/projects" />
      <Path logo={<Boxes />} name="Kits" path="/kits" />
      <Path logo={<Box />} name="Emotes" path="/emotes" />
    </nav>
  );
};
