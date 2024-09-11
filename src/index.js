import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter as Router } from 'react-router-dom';

import "./styles.css";

import App from "./App";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>
);
