/**
 * ===============================================================================
 * ✂️  splitIntoLines Utility Function
 * 👥  Created by: Elyasaf & Shua ✨
 * 📝  Description: Splits an array of styled characters into logical text lines.
 * 📁  Part of Fullstack Project - Basic React Editor
 * ===============================================================================
 */

// ==================================== splitIntoLines function ==================================== //

/** ============================================================================ *
 * This function splits an array of styled characters into lines,                *
 * using the newline character '\n' to break each line.                          *
 * @param {Array} styledText - Array of character objects                        *
 * @returns {Array} Array of lines (each line is an array of character objects)  *
 =============================================================================== */

// split by lines
export function splitIntoLines(styledText) {
  const lines = [];
  let currentLine = [];

  for (const charObj of styledText) {
    if (charObj.char === "\n") {
      lines.push(currentLine); // Push current line and start a new one
      currentLine = [];
    } else {
      currentLine.push(charObj); // Add character to current line
    }
  }

  if (currentLine.length > 0) {
    lines.push(currentLine); // Push the last line if it exists
  }

  return lines;
}
