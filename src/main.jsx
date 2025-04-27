/**
 * ============================================================================
 * 🏁  Entry Point - index.jsx
 * 👥  Developed by: Elyasaf & Shua ✨
 * 📝  Description: Initializes and renders the React application into the DOM
 * 📁  Part of Fullstack Project - Basic React Editor
 * ============================================================================
 */

import { StrictMode } from 'react'; // Import StrictMode for highlighting potential problems
import { createRoot } from 'react-dom/client'; // Import the new root API (React 18+)
import './index.css'; // Import global CSS styles
import App from './App.jsx'; // Import the main App component

// ==================================== Render the App ==================================== //

// Create a root in the HTML element with id 'root' and render the App component inside it
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App /> {/* Render the App component inside StrictMode */}
  </StrictMode>,
);
