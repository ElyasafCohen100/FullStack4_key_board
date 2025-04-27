import React from "react";
import styles from "./css/StyleButton.module.css";

// button component for style bar
export default function StyleButton({ icon, label, active, onClick }) {
  return (
    <button
      className={`${styles.button} ${active ? styles.active : ""}`}
      onClick={onClick}
      title={label}
    >
      {icon || label}
    </button>
  );
}
