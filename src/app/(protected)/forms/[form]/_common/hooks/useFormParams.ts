import { useParams } from "next/navigation";
import type { FormParams } from "@/form/types";

export const useFormParams = () => {
  return useParams<FormParams>();
};
