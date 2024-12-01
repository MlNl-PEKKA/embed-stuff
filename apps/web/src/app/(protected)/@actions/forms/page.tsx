import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

const Page = () => (
  <Link href={"/forms/create"}>
    <Button variant="outline" className="flex h-[2rem] items-center">
      Create
      <Plus />
    </Button>
  </Link>
);

export default Page;
