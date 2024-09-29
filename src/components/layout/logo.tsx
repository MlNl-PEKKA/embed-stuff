import { Triangle } from "lucide-react";
import { Button } from "../ui/button";

export const Logo = () => {
  return (
    <Button variant="outline" size="icon" aria-label="Home">
      <Triangle className="size-5 fill-foreground" />
    </Button>
  );
};
