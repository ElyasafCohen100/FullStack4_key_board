import React from "react";
import LetterSpan from "./LetterSpan";

const Editor = ({ styledText }) => {
  return (
    <div className="editor" style={styles.editor}>
      {styledText.map((charObj, index) => (
        <LetterSpan key={index} charObj={charObj} />
      ))}
    </div>
  );
};

const styles = {
  editor: {
    border: "1px solid gray",
    padding: "10px",
    minHeight: "100px",
    fontFamily: "monospace",
    whiteSpace: "pre-wrap",
    wordWrap: "break-word",
  },
};

export default Editor;
