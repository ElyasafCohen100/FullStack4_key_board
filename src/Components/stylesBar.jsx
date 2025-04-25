/**
 * ===================================================================
 * 🧰  StylesBar Component
 * 👥  Developed by: Elyasaf & חבר של אליסף ✨
 * 📝  Description: A bar with multiple StyleButtons for text styling
 * 📁  Part of Fullstack Project - Basic React Editor
 * ===================================================================
 */

import "../App.css";
import React from "react";
import StyleButton from "./styleButton";

// ===================== The StylesBar component ===================== //
// Props:
// - styles: array of style objects { label, value }
// - activeStyles: array of currently active styles
// - onToggle: function to call when a style is toggled

export default function StylesBar({ styles, activeStyles, onToggle }) {
  return (
    <div className="styles-bar">
      {styles.map((style) => (
        <StyleButton
          key={style.value}
          label={style.label}
          onClick={() => onToggle(style.value)}
          isActive={activeStyles.includes(style.value)}
        />
      ))}
    </div>
  );
}
