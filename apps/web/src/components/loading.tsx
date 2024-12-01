import { Spinner } from "./ui/spinner";

export const Loading = () => {
  return (
    <div className="flex flex-grow items-center justify-center">
      <Spinner />
    </div>
  );
};
