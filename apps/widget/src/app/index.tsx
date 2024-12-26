/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { Feedback } from "~/app/widget/Feedback";

function App() {
  return <Feedback id="66a8ba47-2831-4de9-82e6-bbdc0ac3f827" />;
}
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
