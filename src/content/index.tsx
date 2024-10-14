import React from "react";
import { createRoot } from "react-dom/client";
import Content from "./content";
import "./content.css";

function init() {
  const appContainer = document.createElement('div'); // Create container
  document.body.appendChild(appContainer); 

  if (!appContainer) {
    throw new Error("App container not found");
  }

  const root = createRoot(appContainer); 
  root.render(<Content />);
}

init(); 
