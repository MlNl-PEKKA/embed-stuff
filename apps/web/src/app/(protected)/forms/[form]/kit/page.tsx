import { Emotes } from "@/form/kit/components/Emotes";
import { Preview } from "@/form/kit/components/Preview";
import { Snippet } from "@/form/kit/components/Snippet";

const Page = () => (
  <div className="flex h-full w-full gap-4">
    <Emotes className="basis-1/2" />
    <div className="flex h-full w-full basis-1/2 flex-col gap-4">
      <Preview className="basis-2/3" />
      <Snippet className="basis-1/3" />
    </div>
  </div>
);

export default Page;
