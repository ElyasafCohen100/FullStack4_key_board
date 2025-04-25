/**
 * ======================================================
 * 🔤  LetterSpan Component
 * 👥  Developed by: Elyasaf & חבר של אליסף ✨
 * 📝  Description: Displays a single styled character
 * 📁  Part of Fullstack Project - Basic React Editor
 * ======================================================
 */

import React from "react";

// ==================================== The LetterSpan component ==================================== //

// This component receives one character object (charObj),
// and displays it inside a <span> with the given style.
// Example styles: font, size, color.

export default function LetterSpan({ charObj }) {
  
  const { char, font, size, color } = charObj;

  // ========= Create inline styles from the charObj ========== //
  const style = {
    fontFamily: font,
    fontSize: size,
    color: color,
    display: "inline", // inline makes sure it flows with other letters
  };

  // ========= Display the letter with "fire" class for special effect ========== //
  return <span className="letter-fire" style={style}>{char}</span>;
}
