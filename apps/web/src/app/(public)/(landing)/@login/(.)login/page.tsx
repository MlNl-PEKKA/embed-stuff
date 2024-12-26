import { Login } from "~/login/components/Login";
import { Dialog } from "./Dialog";

const Page = () => {
  return (
    <Dialog>
      <Login asChild />
    </Dialog>
  );
};

export default Page;
