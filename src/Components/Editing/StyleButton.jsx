/**
 * ===============================================================================
 * 🎨  StyleButton Component
 * 👥  Developed by: Elyasaf & Shua ✨
 * 📝  Description: Represents a single style option button (e.g., Bold, Italic) 
 * 📁  Part of Fullstack Project - Basic React Editor
 * ===============================================================================
 */
import React from "react";
import styles from "./css/StyleButton.module.css";

// ==================================== The StyleButton component ==================================== //
// Props:
// - icon: optional small image or symbol to display inside the button
// - label: text to display inside the button (e.g., 'B', 'I', 'U')
// - active: determines if the button should be styled as active (highlighted)
// - onClick: function to call when the button is clicked

export default function StyleButton({ icon, label, active, onClick }) {
  return (
    <button
      className={`${styles.button} ${active ? styles.active : ""}`} // Apply button styling, add active style if needed
      onClick={onClick}  // Handle click events
      title={label}      // Show label as tooltip on hover
    >
      {/* Display either the icon (if provided) or the label */}
      {icon || label}
    </button>
  );
}
