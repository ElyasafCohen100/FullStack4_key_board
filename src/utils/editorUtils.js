/**
 * ===========================================================================================================================================
 * 🛠️  editorUtils.js - Text Editing Utilities
 * 👥  Developed by: Elyasaf & Shua ✨
 * 📝  Description: Contains helper functions for editing, inserting, deleting, clearing, moving the cursor, and search-replacing styled text
 * 📁  Part of Fullstack Project - Basic React Editor
 * ============================================================================================================================================
 */

// ==================================== Default Text ==================================== //
// Starter text: a cursor at the front inside an empty styled text array
export const defaultStyledText = [{ char: "|", font: "Arial", size: "16px", color: "black" }];

// ==================================== Hide Cursor ==================================== //
// Helper function: returns the text without the cursor character "|"
export const hideCursor = (text, currentPreview) => {
  return (text || currentPreview.styledText).filter((c) => c.char !== "|");
};

// ==================================== Insert Character ==================================== //
// Inserts a character at the current cursor position
export const insertChar = (char, currentPreview, currentStyle, updatePreview, setSelectionRange) => {
  const charObj = { char, ...currentStyle };
  const textWithoutCursor = hideCursor(currentPreview.styledText, currentPreview);
  const cursorIdx = currentPreview.cursorIndex || 0;
  const newCursorIndex = cursorIdx + 1;

  const newText = [
    ...textWithoutCursor.slice(0, cursorIdx),
    charObj,
    ...textWithoutCursor.slice(cursorIdx)
  ];

  // Add the cursor back after insertion
  const textWithCursor = [
    ...newText.slice(0, newCursorIndex),
    { char: "|", ...currentStyle },
    ...newText.slice(newCursorIndex)
  ];

  updatePreview(textWithCursor, newCursorIndex);
  setSelectionRange(null);
};

// ==================================== Delete Character ==================================== //
// Deletes a character before the cursor position
export const deleteChar = (currentPreview, currentStyle, updatePreview, setSelectionRange) => {
  const textWithoutCursor = hideCursor(currentPreview.styledText, currentPreview);
  const cursorIdx = currentPreview.cursorIndex || 0;

  if (cursorIdx > 0) {
    const newText = [
      ...textWithoutCursor.slice(0, cursorIdx - 1),
      ...textWithoutCursor.slice(cursorIdx)
    ];

    const newCursorIndex = cursorIdx - 1;

    const textWithCursor = [
      ...newText.slice(0, newCursorIndex),
      { char: "|", ...currentStyle },
      ...newText.slice(newCursorIndex)
    ];

    updatePreview(textWithCursor, newCursorIndex);
    setSelectionRange(null);
  }
};

// ==================================== Delete Word ==================================== //
// Deletes an entire word before the cursor position
export const deleteWord = (currentPreview, currentStyle, updatePreview, setSelectionRange) => {
  const textWithoutCursor = hideCursor(currentPreview.styledText, currentPreview);
  const cursorIdx = currentPreview.cursorIndex || 0;

  if (cursorIdx > 0) {
    const textBeforeCursor = textWithoutCursor
      .slice(0, cursorIdx)
      .map(obj => obj.char)
      .join("");

    const textAfterCursor = textWithoutCursor
      .slice(cursorIdx)
      .map(obj => obj.char)
      .join("");

    const words = textBeforeCursor.split(/\s+/);
    words.pop(); // Remove the last word

    const newTextBeforeCursor = words.join(" ");
    const newCursorIndex = newTextBeforeCursor.length;
    const fullNewText = newTextBeforeCursor + textAfterCursor;

    const textWithCursor = [
      ...fullNewText.split("").map(char => ({ char, ...currentStyle })),
    ];

    textWithCursor.splice(newCursorIndex, 0, { char: "|", ...currentStyle });

    updatePreview(textWithCursor, newCursorIndex);
    setSelectionRange(null);
  }
};

// ==================================== Clear Text ==================================== //
// Clears all text and resets cursor to the beginning
export const clearText = (currentStyle, updatePreview, setSelectionRange) => {
  const clearedText = [{ char: "|", ...currentStyle }];
  updatePreview(clearedText, 0);
  setSelectionRange(null);
};

// ==================================== Move Cursor ==================================== //
// Moves the cursor left or right based on direction
export const moveCursor = (direction, currentPreview, currentStyle, updatePreview, setSelectionRange, isSelecting, setSelectionRangeSetter) => {
  const textWithoutCursor = hideCursor(currentPreview.styledText, currentPreview);
  const cursorIdx = currentPreview.cursorIndex || 0;

  const newPosition = direction === "left"
    ? Math.max(0, cursorIdx - 1)
    : Math.min(textWithoutCursor.length, cursorIdx + 1);

  if (isSelecting) {
    setSelectionRangeSetter((prev) => prev
      ? { start: prev.start, end: newPosition }
      : { start: cursorIdx, end: newPosition });
  } else {
    setSelectionRange(null);
  }

  const newText = [
    ...textWithoutCursor.slice(0, newPosition),
    { char: "|", ...currentStyle },
    ...textWithoutCursor.slice(newPosition)
  ];

  updatePreview(newText, newPosition);
};

// ==================================== Search and Replace ==================================== //
// Allows user to search for a character and replace it with another character
export function searchAndReplace(currentText, updatePreview, currentStyle) {
  const charToFind = prompt("Enter the character to search for:");

  // Only single characters allowed
  if (!charToFind || charToFind.length !== 1) {
    alert("Please enter a single character to search for.");
    return;
  }

  const replacementChar = prompt(`Enter the replacement character for '${charToFind}':`);
  if (!replacementChar || replacementChar.length !== 1) {
    alert("Please enter a single replacement character.");
    return;
  }

  // Remove the cursor for processing
  const textWithoutCursor = currentText.filter(c => c.char !== "|");

  const newText = textWithoutCursor.map(c => {
    if (c.char === charToFind) {
      return { ...c, char: replacementChar }; // Replace only the character
    }
    return c;
  });

  const cursorIndex = currentText.findIndex(c => c.char === "|");
  const safeCursorIndex = cursorIndex === -1 ? newText.length : cursorIndex;

  const finalText = [
    ...newText.slice(0, safeCursorIndex),
    { char: "|", ...currentStyle },
    ...newText.slice(safeCursorIndex)
  ];

  updatePreview(finalText, safeCursorIndex);
}
