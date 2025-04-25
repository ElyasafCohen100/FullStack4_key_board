export const insertCharAt = (text, cursorIndex, charObj, currentStyle) => {
    const textWithoutCursor = text.filter((c) => c.char !== "|");
  
    const newText = [
      ...textWithoutCursor.slice(0, cursorIndex),
      charObj,
      { char: "|", ...currentStyle },
      ...textWithoutCursor.slice(cursorIndex)
    ];
  
    return newText;
  };
  
  export const deleteCharAt = (text, cursorIndex, selectionRange, currentStyle) => {
    const textWithoutCursor = text.filter((c) => c.char !== "|");
  
    if (selectionRange) {
      const start = Math.min(selectionRange.start, selectionRange.end);
      const end = Math.max(selectionRange.start, selectionRange.end);
  
      return {
        newText: [
          ...textWithoutCursor.slice(0, start),
          { char: "|", ...currentStyle },
          ...textWithoutCursor.slice(end)
        ],
        newCursorIndex: start
      };
    }
  
    if (cursorIndex > 0) {
      return {
        newText: [
          ...textWithoutCursor.slice(0, cursorIndex - 1),
          { char: "|", ...currentStyle },
          ...textWithoutCursor.slice(cursorIndex)
        ],
        newCursorIndex: cursorIndex - 1
      };
    }
  
    return { newText: text, newCursorIndex: cursorIndex };
  };
  