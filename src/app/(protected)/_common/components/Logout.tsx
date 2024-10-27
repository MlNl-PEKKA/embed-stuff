"use client";

import { LogOut } from "lucide-react";
import { Path } from "./Path";

export const Logout = () => {
  return (
    <Path
      logo={<LogOut />}
      name="Logout"
      link={false}
      onClick={() => {
        //
      }}
    />
  );
};
