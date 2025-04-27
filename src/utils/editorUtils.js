// editorUtils.js

// starter text, empty text with a cursor at the front. saved as a list of objects with data on how they are displayed.
export const defaultStyledText = [{ char: "|", font: "Arial", size: "16px", color: "black" }];

// helper function returns text eithout the cursor
export const hideCursor = (text, currentPreview) => {
  return (text || currentPreview.styledText).filter((c) => c.char !== "|");
};

// helper function to insert a character
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

  // add cursor back after adding character
  const textWithCursor = [
    ...newText.slice(0, newCursorIndex),
    { char: "|", ...currentStyle },
    ...newText.slice(newCursorIndex)
  ];

  updatePreview(textWithCursor, newCursorIndex);
  setSelectionRange(null);
};

// delete a character at the cursor position
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

// delete a word at the cursor position
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
    words.pop();

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

// clear the text and set the cursor at the beginning
export const clearText = (currentStyle, updatePreview, setSelectionRange) => {
  const clearedText = [{ char: "|", ...currentStyle }];
  updatePreview(clearedText, 0);
  setSelectionRange(null);
};

// move the cursor left or right
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

// In editorUtils.js or wherever you put your text functions

export function searchAndReplace(currentText, updatePreview, currentStyle) {
  const charToFind = prompt("Enter the character to search for:");
  //only replace one character as project rules dictate
  if (!charToFind || charToFind.length !== 1) {
    alert("Please enter a single character to search for.");
    return;
  }

  // get replacement character from user
  const replacementChar = prompt(`Enter the replacement character for '${charToFind}':`);
  if (!replacementChar || replacementChar.length !== 1) {
    alert("Please enter a single replacement character.");
    return;
  }

  // Hide the cursor for processing
  const textWithoutCursor = currentText.filter(c => c.char !== "|");

  // Create a new styled text array
  const newText = textWithoutCursor.map(c => {
    // replace all
    if (c.char === charToFind) {
      return { ...c, char: replacementChar }; // replace only the character, keep style
    }
    return c; // otherwise, keep it as is
  });

  // Get cursor index (after replacement, cursor stays where it was)
  const cursorIndex = currentText.findIndex(c => c.char === "|");
  const safeCursorIndex = cursorIndex === -1 ? newText.length : cursorIndex;

  // Insert cursor back
  const finalText = [
    ...newText.slice(0, safeCursorIndex),
    { char: "|", ...currentStyle },
    ...newText.slice(safeCursorIndex)
  ];

  // Update the parent state
  updatePreview(finalText, safeCursorIndex);
}
