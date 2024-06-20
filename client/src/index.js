import React from "react";
import { createRoot } from 'react-dom/client';
import App from "./components/App";
import "./index.css";
import { Provider } from 'react-redux';
import { store } from "./redux/store";

const container = document.getElementById("root");
if (container) {
    const root = createRoot(container);
    root.render(
        <Provider store={store}>
            <App />
        </Provider>
    );
} else {
    console.log('Root container missing in index.html')
}
