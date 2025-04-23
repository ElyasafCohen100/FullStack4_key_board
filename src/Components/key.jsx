import React from "react";

const Key = ({key, char, onClick, altText}) => {
  const handleClick = () => {
    onClick(char);
  };

  return (
    <button
      style={{
        margin: "5px",
        padding: "10px",
        fontSize: "16px",
        cursor: "pointer",
        backgroundColor: "#f0f0f0",
        border: "1px solid #ccc",
      }}
      onClick={handleClick}
    >
      {altText == "" ? char : altText}
    </button>
  );
}

export default Key;