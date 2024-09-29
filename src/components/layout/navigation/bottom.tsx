import { CircleUserRound, LogOut } from "lucide-react";
import { Path } from "./path";

export const Bottom = () => {
  return (
    <nav className="mt-auto grid gap-1 p-2">
      <Path logo={<CircleUserRound />} name="Profile" path="/profile" />
      <Path logo={<LogOut />} name="Logout" path="/logout" />
    </nav>
  );
};
