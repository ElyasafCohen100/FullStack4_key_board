/**
 * ==================================================================
 * 🧠 App.jsx – Main Component
 * 👥 Made by: Elyasaf & חבר של אליסף ✨
 * 📄 This file connects the Editor and Keyboard together
 * ==================================================================
 */

import "./App.css";
import React, { useState } from "react";
import Editor from "./Components/Editor";
import Keyboard from "./Components/keyboard";

export default function App() {

  // ========= The styled text (each letter has font, size, color...) ========= //
  const [styledText, setStyledText] = useState([
    { char: "|", font: "Arial", size: "16px", color: "black" }
  ]);

  // ========= The cursor index – where the "|" is ========= //
  const [cursorIndex, setCursorIndex] = useState(0);

  // ========= The default style applied to each typed character ========= //
  const [currentStyle, setCurrentStyle] = useState({
    font: "Arial",
    size: "16px",
    color: "black",
    bold: false,
    italic: false,
  });

  // ========= Shift selection mode ========= //
  const [selectionRange, setSelectionRange] = useState(null); // selected range
  const [isSelecting, setIsSelecting] = useState(false);      // Shift pressed?

  // ========= Toggle a style on/off (like bold or italic) ========= //
  const toggleStyle = (style) => {
    setCurrentStyle((prev) => ({
      ...prev,
      [style]: !prev[style]
    }));
  };

  // ========= Insert a character at the current cursor location ========= //
  const insertChar = (newChar) => {
    const newCharObj = { char: newChar, ...currentStyle };

    const textWithoutCursor = styledText.filter((c) => c.char !== "|");

    const newText = [
      ...textWithoutCursor.slice(0, cursorIndex),
      newCharObj,
      { char: "|", ...currentStyle },
      ...textWithoutCursor.slice(cursorIndex)
    ];

    setStyledText(newText);
    setCursorIndex(cursorIndex + 1);
    setSelectionRange(null); // reset any selection
  };

  // ========= Delete the character before the cursor or the selected block ========= //
  const deleteChar = () => {
    const textWithoutCursor = styledText.filter((c) => c.char !== "|");

    // If something is selected – delete all of it
    if (selectionRange) {
      const start = Math.min(selectionRange.start, selectionRange.end);
      const end = Math.max(selectionRange.start, selectionRange.end);

      const newText = [
        ...textWithoutCursor.slice(0, start),
        { char: "|", ...currentStyle },
        ...textWithoutCursor.slice(end)
      ];

      setStyledText(newText);
      setCursorIndex(start);
      setSelectionRange(null);
      return;
    }

    // If no selection – delete one character
    if (cursorIndex > 0) {
      const newText = [
        ...textWithoutCursor.slice(0, cursorIndex - 1),
        { char: "|", ...currentStyle },
        ...textWithoutCursor.slice(cursorIndex)
      ];

      setStyledText(newText);
      setCursorIndex(cursorIndex - 1);
    }
  };

  // ========= Move the cursor left or right ========= //
  const moveCursor = (direction) => {
    const textWithoutCursor = styledText.filter((c) => c.char !== "|");

    let newIndex = cursorIndex + (direction === "left" ? -1 : 1);
    newIndex = Math.max(0, Math.min(newIndex, textWithoutCursor.length));

    let newSelection = null;

    if (isSelecting) {
      if (!selectionRange) {
        newSelection = {
          start: cursorIndex,
          end: newIndex
        };
      } else {
        newSelection = {
          start: selectionRange.start,
          end: newIndex
        };
      }
      setSelectionRange(newSelection);
    } else {
      setSelectionRange(null); // if Shift is not held, clear selection
    }

    const newText = [
      ...textWithoutCursor.slice(0, newIndex),
      { char: "|", ...currentStyle },
      ...textWithoutCursor.slice(newIndex)
    ];

    setStyledText(newText);
    setCursorIndex(newIndex);
  };

  // ========= Render the App ========= //
  return (
    <div className="app-container">

      {/* 📝 The main editor area */}
      <Editor styledText={styledText} />

      {/* 🎹 The virtual keyboard */}
      <div className="keyboard-wrapper">
        <Keyboard
          onKeyPress={insertChar}
          onBackPress={deleteChar}
          onArrowPress={moveCursor}
          isSelecting={isSelecting}
          setIsSelecting={setIsSelecting}
        />
      </div>

    </div>
  );
}
