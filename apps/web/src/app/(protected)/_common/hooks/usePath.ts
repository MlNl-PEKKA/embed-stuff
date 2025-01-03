import { useContext } from "react";

import { PathContext } from "~/protected/contexts/PathProvider";

export const usePath = () => {
  const value = useContext(PathContext);
  if (!value) throw new Error("PathContext is missing as a provider");
  return value;
};
