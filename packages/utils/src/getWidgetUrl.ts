import { EMBED_STUFF } from "./constants";

export const getWidgetUrl = () => {
  return `${process.env.NEXT_PUBLIC_WIDGET_URL}/${EMBED_STUFF}.umd.js`;
};
