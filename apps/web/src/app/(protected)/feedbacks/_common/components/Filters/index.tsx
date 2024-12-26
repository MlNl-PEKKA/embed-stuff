import { Cancel } from "./Cancel";
import { Search } from "./Search";
import { Status } from "./Status";

export const Filters = () => {
  return (
    <div className="flex flex-row w-full gap-2">
      <div className="flex flex-row basis-1/3 gap-2">
        <Status />
        <Search />
      </div>
      <div className="flex flex-row basis-2/3 gap-2">
        <Cancel />
      </div>
    </div>
  );
};
