/**
 * ===============================================================
 * 🎨  StyleButton Component
 * 👥  Developed by: Elyasaf & חבר של אליסף ✨
 * 📝  Description: Button used to apply a specific text style
 * 📁  Part of Fullstack Project - Basic React Editor
 * ===============================================================
 */

import "../App.css";
import React from "react";

// ===================== The StyleButton component ===================== //
// Props:
// - label: string or icon to display on the button
// - onClick: function to call when button is pressed
// - isActive: whether the button is currently active/selected

export default function StyleButton({ label, onClick, isActive }) {
  return (
    <button
      className={`style-button ${isActive ? "active" : ""}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
