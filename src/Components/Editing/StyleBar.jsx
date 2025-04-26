import React, { useState } from "react";
import StyleButton from "./StyleButton";
import styles from "./css/StyleBar.module.css";

export default function StyleBar({ onStyleChange }) {
  const [activeStyles, setActiveStyles] = useState({
    bold: false,
    italic: false,
    underline: false,
    fontColor: "#000000",
    fontSize: "16",
    fontFamily: "Arial",
  });

  const toggleStyle = (style) => {
    setActiveStyles((prev) => {
      const updated = { ...prev, [style]: !prev[style] };
      onStyleChange(updated);
      return updated;
    });
  };

  const changeFontColor = (e) => {
    const color = e.target.value;
    setActiveStyles((prev) => {
      const updated = { ...prev, fontColor: color };
      onStyleChange(updated);
      return updated;
    });
  };

  const changeFontSize = (e) => {
    const size = e.target.value;
    setActiveStyles((prev) => {
      const updated = { ...prev, fontSize: size };
      onStyleChange(updated);
      return updated;
    });
  };

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
      <StyleButton
        label="B"
        active={activeStyles.bold}
        onClick={() => toggleStyle("bold")}
      />
      <StyleButton
        label="I"
        active={activeStyles.italic}
        onClick={() => toggleStyle("italic")}
      />
      <StyleButton
        label="U"
        active={activeStyles.underline}
        onClick={() => toggleStyle("underline")}
      />

      <input
        type="color"
        value={activeStyles.fontColor}
        onChange={changeFontColor}
        className={styles.colorPicker}
      />

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
