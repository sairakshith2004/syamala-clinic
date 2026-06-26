import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ReactGA from "react-ga4";
import "./styles.css";
import App from "./App";

// Initialize Google Analytics
ReactGA.initialize("G-04RWC846NT");

// Send initial page view
ReactGA.send({
  hitType: "pageview",
  page: window.location.pathname + window.location.search,
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);