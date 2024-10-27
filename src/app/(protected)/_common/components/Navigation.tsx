import { Boxes, CircleUserRound, List } from "lucide-react";
import { ModeToggle } from "~/components/mode-toggle";
import { Logout } from "./Logout";
import { Path } from "./Path";

export const Navigation = () => {
  return (
    <>
      <div className="flex flex-col gap-1 p-2">
        <Path logo={<List />} link path="/projects" />
        <Path logo={<Boxes />} link path="/emotes" />
      </div>
      <div className="mt-auto flex flex-col gap-1 p-2">
        <Path logo={<CircleUserRound />} link path="/profile" />
        <ModeToggle />
        <Logout />
      </div>
    </>
  );
};
