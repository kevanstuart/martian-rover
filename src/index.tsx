import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { Application } from "./app";
import "./index.css";

const rootElement = document.getElementById("app") as HTMLElement;
if (!rootElement?.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <Application />
    </StrictMode>,
  );
}
