import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "@fontsource/inter";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.tsx";
import ScrollToTop from "./components/ScrollToTop.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <App />
      </Router>
    </AuthProvider>
  </StrictMode>,
);
