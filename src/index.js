import React from "react";
import { createRoot } from "react-dom/client"; // Sử dụng từ "react-dom/client"
import App from "./TrangchuFuta/App";
import "./index.scss"





const root = document.getElementById("root");
const reactRoot = createRoot(root);

reactRoot.render(
  <React.StrictMode>
    
      <App />
    
  </React.StrictMode>
);
