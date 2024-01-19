import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import DataContextProvider from "./contexts/DataContext.jsx";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <DataContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </DataContextProvider>
  </React.StrictMode>
);
