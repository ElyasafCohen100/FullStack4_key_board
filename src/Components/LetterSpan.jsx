import React from "react";

const LetterSpan = ({ charObj }) => {
  const { char, font, size, color } = charObj;

  const style = {
    fontFamily: font,
    fontSize: size,
    color: color,
    display: "inline",
  };

  return <span style={style}>{char}</span>;
};

export default LetterSpan;
