import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { BackgroundBeams } from "./components/ui/background-beams.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      {/* change background beams color to dark */}
      <BackgroundBeams className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 " />
    </BrowserRouter>
  </React.StrictMode>
);
