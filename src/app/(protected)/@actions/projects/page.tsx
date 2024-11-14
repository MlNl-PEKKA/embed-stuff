import { Button } from "@/components/ui/button";
import Link from "next/link";

const Page = () => (
  <Link href={"/projects/create"}>
    <Button variant="outline">Create</Button>
  </Link>
);

export default Page;
