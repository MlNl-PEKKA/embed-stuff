import { Feedback as UIFeedback } from "@embed-stuff/ui/components/widget/Feedback";

import { useWidget, WidgetProvider } from "~/app/providers/WidgetProvider";

export const Feedback = (props: Parameters<typeof WidgetProvider>[0]) => {
  return (
    <WidgetProvider {...props}>
      <Content />
    </WidgetProvider>
  );
};

const Content = () => {
  const { id } = useWidget();
  return <UIFeedback variant="outline">Feedback {id}</UIFeedback>;
};
