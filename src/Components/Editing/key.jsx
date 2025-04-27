/**
 * ==================================================================
 * 🔘  Key Component
 * 👥  Developed by: Elyasaf & Shua ✨
 * 📝  Description: Represents a single key on the virtual keyboard
 * 📁  Part of Fullstack Project - Basic React Editor
 * ==================================================================
 */
import "../../App.css";
import React from "react";
import styles from "./css/Key.module.css"; // CSS module for styling

// ==================================== The Key component ==================================== //
// Props:
// - char: the character this key represents (e.g., 'A', 'Enter')
// - altText: optional alternative text to show instead of 'char'
// - onClick: function to call when this key is clicked
// - isActive: highlights the key if active (like CapsLock)
// - wide: makes the key wider (e.g., Tab, Shift)
// - tall: makes the key taller (e.g., Enter)
// - space: special layout for the Space key

export default function Key({ char, onClick, altText, isActive, wide, tall, space }) {

  // ========= Handle click event ========= //
  const handleClick = () => {
    onClick(char);
  };

  // ========= Build class names based on props  - each one with a special ========= //
  const classes = [styles["key-button"]];
  if (wide) classes.push(styles.wide);
  if (tall) classes.push(styles.tall);
  if (space) classes.push(styles.space);
  if (isActive) classes.push(styles.active);

  return (
    // Render the button with all dynamic styles
    <button className={classes.join(" ")} onClick={handleClick}>
      {/* Show altText if provided, otherwise show char */}
      {altText === "" || altText == null ? char : altText}
    </button>
  );
}
