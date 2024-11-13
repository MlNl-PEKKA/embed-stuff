"use client";

import { LogOut } from "lucide-react";
import { useLogout } from "@/protected/hooks/useLogout";
import { Path } from "./Path";

export const Logout = () => {
  const { mutate } = useLogout();
  return (
    <Path
      logo={<LogOut />}
      name="Logout"
      link={false}
      onClick={() => mutate()}
    />
  );
};
