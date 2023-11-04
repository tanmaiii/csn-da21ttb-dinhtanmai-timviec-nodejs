import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ModeContextProvider } from "./context/ModeContext";
import { AuthContextProvider } from "./context/authContext";
import { BrowserRouter } from "react-router-dom";

Document.title = "Việc làm & Tuyển dụng JobQuest";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <ModeContextProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </ModeContextProvider>
  </BrowserRouter>
);
