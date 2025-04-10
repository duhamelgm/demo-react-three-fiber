import React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App";

import "./index.css";

function initializeApp() {
  const reactToolbarRoot = document.getElementById("app");
  if (reactToolbarRoot) {
    createRoot(reactToolbarRoot).render(<App />);
  }
}

export const app = initializeApp();
