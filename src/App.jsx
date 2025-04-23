import React, { useState } from "react";
import Editor from "./Components/Editor";
import Keyboard from "./Components/keyboard";

const App = () => {
  const [styledText, setStyledText] = useState([
    { char: "|", font: "Arial", size: "16px", color: "black" },
  ]);

  const [cursorIndex, setCursorIndex] = useState(0);

  const currentStyle = { font: "Arial", size: "16px", color: "black" };

  const insertChar = (newChar) => {
    const newCharObj = { char: newChar, ...currentStyle };
    const textWithoutCursor = styledText.filter((c) => c.char !== "|");
    const newText = [
      ...textWithoutCursor.slice(0, cursorIndex),
      newCharObj,
      ...textWithoutCursor.slice(cursorIndex),
    ];

    // Insert cursor back
    newText.splice(cursorIndex + 1, 0, { char: "|", ...currentStyle });

    setStyledText(newText);
    setCursorIndex(cursorIndex + 1);
  };

  const moveCursor = (direction) => {
    const textWithoutCursor = styledText.filter((c) => c.char !== "|");
    let newIndex = cursorIndex + (direction === "left" ? -1 : 1);

    if (newIndex < 0) newIndex = 0;
    if (newIndex > textWithoutCursor.length) newIndex = textWithoutCursor.length;

    const newText = [
      ...textWithoutCursor.slice(0, newIndex),
      { char: "|", ...currentStyle },
      ...textWithoutCursor.slice(newIndex),
    ];

    setStyledText(newText);
    setCursorIndex(newIndex);
  };

  return (
    <div>
      <h2>Text Editor</h2>
      <Editor styledText={styledText} />
      <div style={{ marginTop: "20px" }}>
        <Keyboard onKeyPress={insertChar} />
      </div>
    </div>
  );
};

export default App;
