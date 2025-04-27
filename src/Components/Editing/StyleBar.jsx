/**
 * ====================================================================================================
 * 🎨  StyleBar Component
 * 👥  Developed by: Elyasaf & Shua ✨
 * 📝  Description: Toolbar for text styling (bold, italic, underline, color, font size, font family)
 * 📁  Part of Fullstack Project - Basic React Editor
 * =====================================================================================================
 */
import React, { useState } from "react";
import StyleButton from "./StyleButton"; // Small button component for individual styles
import styles from "./css/StyleBar.module.css"; // Local CSS module for styling

// ==================================== The StyleBar component ==================================== //
// Props:
// - onStyleChange: function to notify parent about style updates

export default function StyleBar({ onStyleChange }) {

  // default style settings: //
  const [activeStyles, setActiveStyles] = useState({
    bold: false,
    italic: false,
    underline: false,
    fontColor: "#000000",
    fontSize: "16",
    fontFamily: "Arial",
  });

  // Toggle a style like bold, italic, underline
  const toggleStyle = (style) => {
    setActiveStyles((prev) => {
      const updated = { ...prev, [style]: !prev[style] };
      onStyleChange(updated);
      return updated;
    });
  };

  // Change font color
  const changeFontColor = (e) => {
    const color = e.target.value;
    setActiveStyles((prev) => {
      const updated = { ...prev, fontColor: color };
      onStyleChange(updated);
      return updated;
    });
  };

  // Change font size
  const changeFontSize = (e) => {
    const size = e.target.value;
    setActiveStyles((prev) => {
      const updated = { ...prev, fontSize: size };
      onStyleChange(updated);
      return updated;
    });
  };

  // Change font family
  const changeFontFamily = (e) => {
    const font = e.target.value;
    setActiveStyles((prev) => {
      const updated = { ...prev, fontFamily: font };
      onStyleChange(updated);
      return updated;
    });
  };

  return (

    <div className={styles.bar}>

      {/* Style buttons: Bold, Italic, Underline */}
      <StyleButton label="B" active={activeStyles.bold} onClick={() => toggleStyle("bold")} />
      <StyleButton label="I" active={activeStyles.italic} onClick={() => toggleStyle("italic")} />
      <StyleButton label="U" active={activeStyles.underline} onClick={() => toggleStyle("underline")} />

      {/* Color picker */}
      <input
        type="color"
        value={activeStyles.fontColor}
        onChange={changeFontColor}
        className={styles.colorPicker}
      />

      {/* Font size selector */}
      <select
        value={activeStyles.fontSize}
        onChange={changeFontSize}
        className={styles.select}
      >
        {[12, 14, 16, 18, 24, 32, 48].map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>

      {/* Font family selector */}
      <select
        value={activeStyles.fontFamily}
        onChange={changeFontFamily}
        className={styles.select}
      >
        {["Arial", "Times New Roman", "Courier New", "Verdana"].map((font) => (
          <option key={font} value={font}>
            {font}
          </option>
        ))}

      </select>

    </div>
  );
}
