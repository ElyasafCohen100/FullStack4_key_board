/**
 * ==================================================================================
 * ✏️  Editor Component
 * 👥  Developed by: Elyasaf & חבר של אליסף ✨
 * 📝  Description: Editable text area that displays styled characters line by line
 * 📁  Part of Fullstack Project - Basic React Editor
 * ==================================================================================
 */

import "../App.css";
import React from "react";
import LetterSpan from "./LetterSpan";
import { isRTL } from "../utils/TextDirection";
import { splitIntoLines } from "../utils/SplitIntoLines";

// ==================================== The Editor component ==================================== //

// This component receives styledText (an array of character objects),
// splits it into lines based on '\n', detects direction (RTL/LTR),
// and renders each character using the LetterSpan component.

export default function Editor({ styledText }) {
  const lines = splitIntoLines(styledText); // Break the text into lines

  return (

    <div className="editor-container">

      {lines.map((line, lineIndex) => {
        const text = line.map((c) => c.char).join(""); // Extract the raw text
        const rtl = isRTL(text); // Determine text direction

        return (

          <div
            key={lineIndex}
            className={rtl ? "text-line-rtl" : "text-line-ltr"} // Apply direction class
          >
            {line.map((charObj, index) => (
              <LetterSpan key={index} charObj={charObj} /> // Display each styled character
            ))}

          </div>
        );
      })}

    </div>
  );
}
