import React from "react";
import LetterSpan from "./LetterSpan";
import { isRTL } from "../utils/textDirection";

const splitIntoLines = (styledText) => {
  const lines = [];
  let currentLine = [];

  for (const charObj of styledText) {
    if (charObj.char === "\n") {
      lines.push(currentLine);
      currentLine = [];
    } else {
      currentLine.push(charObj);
    }
  }

  if (currentLine.length > 0) {
    lines.push(currentLine);
  }

  return lines;
};

const Editor = ({ styledText }) => {
  const lines = splitIntoLines(styledText);

  return (
    <div style={styles.editor}>
      {lines.map((line, lineIndex) => {
        const text = line.map((c) => c.char).join("");
        const rtl = isRTL(text);
        return (
          <div
            key={lineIndex}
            style={{
              direction: rtl ? "rtl" : "ltr",
              textAlign: rtl ? "right" : "left",
              display: "block",
              width: "100%",
            }}
          >
            {line.map((charObj, index) => (
              <LetterSpan key={index} charObj={charObj} />
            ))}
          </div>
        );
      })}
    </div>
  );
};

const styles = {
  editor: {
    border: "1px solid gray",
    padding: "10px",
    minHeight: "100px",
    maxHeight: "100px",
    minWidth: "450px",
    maxWidth: "450px",
    fontFamily: "monospace",
    whiteSpace: "pre-wrap",
    wordWrap: "break-word",
  },
};

export default Editor;
