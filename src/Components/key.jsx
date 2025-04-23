import React from "react";

const Key = ({key, char, onClick}) => {
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
      }}
      onClick={handleClick}
    >
      {char}
    </button>
  );
}

export default Key;