import { Banner as UIBanner } from "@embed-stuff/ui/components/widget/Banner";

import { useWidget, WidgetProvider } from "~/app/providers/WidgetProvider";

export const Banner = (props: Parameters<typeof WidgetProvider>[0]) => {
  return (
    <WidgetProvider {...props}>
      <Content />
    </WidgetProvider>
  );
};

const Content = () => {
  const { id } = useWidget();
  return <UIBanner variant="outline">Banner {id}</UIBanner>;
};
