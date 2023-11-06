import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ModeContextProvider } from "./context/ModeContext";
import { AuthContextProvider } from "./context/authContext";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

Document.title = "Việc làm & Tuyển dụng JobQuest";

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <ModeContextProvider>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </ModeContextProvider>
    </BrowserRouter>
  </QueryClientProvider>
);
