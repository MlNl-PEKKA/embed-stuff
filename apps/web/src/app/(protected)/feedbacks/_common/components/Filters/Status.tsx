"use client";

import { Button } from "@embed-stuff/ui/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@embed-stuff/ui/ui/dropdown-menu";

import { useFeedbacksStore } from "~/feedbacks/store";

export const Status = () => {
  const status = useFeedbacksStore((store) => store.status);
  const { pushStatus, popStatus } = useFeedbacksStore((store) => store.actions);

  const handleStatus = (s: (typeof status)[number]) => {
    if (status.includes(s)) popStatus(s);
    else pushStatus(s);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Status</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuCheckboxItem
          checked={status.includes("active")}
          onCheckedChange={() => handleStatus("active")}
        >
          Active
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={status.includes("inactive")}
          onCheckedChange={() => handleStatus("inactive")}
        >
          Inactive
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
