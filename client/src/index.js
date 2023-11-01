import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ModeContextProvider } from "./context/ModeContext";
import { AuthContextProvider } from "./context/authContext";

Document.title = "Việc làm & Tuyển dụng JobQuest";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ModeContextProvider>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </ModeContextProvider>
);
