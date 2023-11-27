import {
  QueryClient,
  QueryClientProvider
} from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import AuthProvider from "./AuthProvider/AuthProvider.jsx";
import router from "./Router/Router.jsx";
import "./index.css";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <div className="font-grotesk">
          <RouterProvider router={router}></RouterProvider>
        </div>
      </QueryClientProvider>
    </AuthProvider>
    <Toaster />
  </React.StrictMode>
);
