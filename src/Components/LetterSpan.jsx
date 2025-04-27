/**
 * ======================================================
 * 🔤  LetterSpan Component
 * 👥  Developed by: Elyasaf & Shua ✨
 * 📝  Description: Displays a single styled character
 * 📁  Part of Fullstack Project - Basic React Editor
 * ======================================================
 */

import React from "react";

// ==================================== The LetterSpan component ==================================== //

// This component receives one character object (charObj),
// and displays it inside a <span> with the given style.

export default function LetterSpan({ charObj }) {
  const { char, bold, italic, underline, fontColor, fontSize, fontFamily } = charObj;

  // ========= Create inline styles from the charObj ========== //
  const style = {
    fontWeight: bold ? "bold" : "normal",
    fontStyle: italic ? "italic" : "normal",
    textDecoration: underline ? "underline" : "none",
    color: fontColor || "#000000",
    fontSize: fontSize ? `${fontSize}px` : "16px",
    fontFamily: fontFamily || "Arial",
    display: "inline",
  };

  // ========= Display the letter with the correct styles ========== //
  return (
    <span className="letter-fire" style={style}>
      {char}
    </span>
  );
}
