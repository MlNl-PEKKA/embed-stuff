import { Box, Boxes, CircleUserRound, List, LogOut } from "lucide-react";
import { Path } from "./Path";
import { Logout } from "./Logout";

export const Navigation = () => {
  return (
    <>
      <nav className="grid gap-1 p-2">
        <Path logo={<List />} link path="/projects" />
        <Path logo={<Boxes />} link path="/kits" />
        <Path logo={<Box />} link path="/emotes" />
      </nav>
      <nav className="mt-auto grid gap-1 p-2">
        <Path logo={<CircleUserRound />} link path="/profile" />
        <Logout />
      </nav>
    </>
  );
};
