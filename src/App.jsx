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

    newText.splice(cursorIndex + 1, 0, { char: "|", ...currentStyle });

    setStyledText(newText);
    setCursorIndex(cursorIndex + 1);
  };

  const moveCursor = (direction) => {
    const textWithoutCursor = styledText.filter((c) => c.char !== "|");
    let newIndex = cursorIndex + (direction === "left" ? -1 : 1);

    newIndex = Math.max(0, Math.min(newIndex, textWithoutCursor.length));

    const newText = [
      ...textWithoutCursor.slice(0, newIndex),
      { char: "|", ...currentStyle },
      ...textWithoutCursor.slice(newIndex),
    ];

    setStyledText(newText);
    setCursorIndex(newIndex);
  };

  const viewStyles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    height: "100vh",
    width: "100vw", // makes sure it's full width for centering
    boxSizing: "border-box",
  };

  return (
    <div style={viewStyles}>
      <h2>Text Editor</h2>
      <Editor styledText={styledText} />
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <h3>Styles</h3>
        <h3>Keyboard</h3>
        <Keyboard onKeyPress={insertChar} />
      </div>
    </div>
  );
};

export default App;
