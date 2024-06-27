import React from "react";
import { createRoot } from 'react-dom/client';
import App from "./components/App";
import "./index.css";
import { GlobalProvider } from "./context";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
    <GlobalProvider>
        <App />
    </GlobalProvider>
  );
