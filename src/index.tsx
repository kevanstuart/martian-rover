import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { Application } from "@/app";
import "@fontsource/unica-one/400.css";
import "@fontsource-variable/geist-mono/wght.css";
import "@/styles/global.css";

const rootElement = document.getElementById("app") as HTMLElement;
if (!rootElement?.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <Application />
    </StrictMode>,
  );
}
