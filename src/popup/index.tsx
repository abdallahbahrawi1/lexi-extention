import '@fortawesome/fontawesome-free/css/all.min.css';

import React from "react";
import { createRoot } from "react-dom/client";
import '../assets/tailwind.css'; 
import Routes from "./Routes";
import { HashRouter as Router } from "react-router-dom";


function init() {
  const appContainer = document.createElement('div');
  document.body.appendChild(appContainer); 

  if (!appContainer) {
    throw new Error("App container not found");
  }

  const root = createRoot(appContainer); 
  root.render(<Router><Routes /></Router>);
}

init();