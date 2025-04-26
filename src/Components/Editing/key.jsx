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
// - char: actual character (e.g. 'a', 'Enter')
// - altText: what to show instead of char (optional)
// - onClick: function to call when pressed
// - isActive: highlight the key (like CapsLock)
// - wide / tall / space: for special size styling

export default function Key({ char, onClick, altText, isActive, wide, tall, space }) {
  const handleClick = () => {
    onClick(char);
  };

  // ========= Build class names based on props ========= //
  const classes = [styles["key-button"]];
  if (wide) classes.push(styles.wide);
  if (tall) classes.push(styles.tall);
  if (space) classes.push(styles.space);
  if (isActive) classes.push(styles.active);

  return (
    <button className={classes.join(" ")} onClick={handleClick}>
      {altText === "" || altText == null ? char : altText}
    </button>
  );
}