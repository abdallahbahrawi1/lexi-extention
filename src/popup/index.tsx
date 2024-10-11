import '@fortawesome/fontawesome-free/css/all.min.css';

import React from "react";
import { createRoot } from "react-dom/client";
import '../assets/tailwind.css'; // Include Tailwind CSS styles
import Routes from "./Routes";
import { HashRouter as Router } from "react-router-dom";


function init() {
  const appContainer = document.createElement('div'); // Create container
  document.body.appendChild(appContainer); // Append to body

  if (!appContainer) {
    throw new Error("App container not found");
  }

  const root = createRoot(appContainer); // Create React root
  root.render(<Router><Routes /></Router>); // Render the Popup component
}

init(); // Initialize the app
