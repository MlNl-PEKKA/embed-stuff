import Link from "next/link";
import { PlusCircle } from "lucide-react";

import { Button } from "@embed-stuff/ui/ui/button";

const Page = () => (
  <Button asChild>
    <Link href={"/feedbacks/create"}>
      <PlusCircle />
      Create
    </Link>
  </Button>
);

export default Page;
