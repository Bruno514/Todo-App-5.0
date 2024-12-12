import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./reset.scss";
import "./index.scss";
import "@styles/fonts.scss";
import App from "./App.tsx";
import Auth from "./Components/Pages/Auth/";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<App />} />
        <Route path="register" element={<Auth isRegistering={false} />} />
        <Route path="login" element={<Auth isRegistering={true} />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
