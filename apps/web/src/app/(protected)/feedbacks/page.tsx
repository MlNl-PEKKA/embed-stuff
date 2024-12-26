import type { FeedbacksNextProps } from "~/feedbacks/types";
import { Filters } from "~/feedbacks/components/Filters";
import { List } from "~/feedbacks/components/List";

const Page = (_props: FeedbacksNextProps["page"]) => {
  return (
    <div className="flex w-full flex-col gap-4">
      <Filters />
      <div className="flex w-full flex-col gap-2 overflow-y-scroll">
        <List />
      </div>
    </div>
  );
};

export default Page;
