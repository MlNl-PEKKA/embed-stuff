"use client";
import { LogOut } from "lucide-react";
import { Path } from "./Path";

export const Logout = () => {
  return (
    <Path
      logo={<LogOut />}
      link={false}
      name="Logout"
      onClick={() => {
        //
      }}
    />
  );
};
