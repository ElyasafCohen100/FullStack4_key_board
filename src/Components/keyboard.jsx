import React, { useState } from "react";
import Key from "./Key"; // Assuming you have a Key component

const layouts = {
  en: {
    number: ['1','2','3','4','5','6','7','8','9','0'],
    letters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
    specialKeys: ['\n', ' '],
    special: { '\n': 'enter', ' ': 'space' },
  },
  he: {
    number: ['1','2','3','4','5','6','7','8','9','0'],
    letters: 'אבגדהוזחטיכלמנסעפצקרשת'.split(''),
    specialKeys: ['\n', ' '],
    special: { '\n': 'אנטר', ' ': 'רווח' },
  },
  em: {
    number: ['1','2','3','4','5','6','7','8','9','0'],
    letters: ['😀', '😂', '😍', '😎', '😢', '😡', '👍', '👎', '🎉', '❤️'],
    specialKeys: ['\n', ' '],
    special: { '\n': 'enter', ' ': 'space' },
  }
};

const Keyboard = ({ onKeyPress, onBackPress, onArrowPress}) => {
  const [language, setLanguage] = useState("en");
  const languageOrder = ["en", "he", "em"];

  const switchLanguage = () => {
    const currentIndex = languageOrder.indexOf(language);
    const nextIndex = (currentIndex + 1) % languageOrder.length;
    setLanguage(languageOrder[nextIndex]);
  };

  const { number, letters, special } = layouts[language];

  return (
    <div style={{ textAlign: "center" }}>
      <button onClick={switchLanguage}>Switch Language ({language.toUpperCase()})</button>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          maxWidth: "500px",
          justifyContent: "center",
          marginTop: "10px",
        }}
      >
        {[...number, ...letters, '\n', ' '].map((key, index) => (
          <Key
            key={index}
            char={key}
            onClick={onKeyPress}
            altText={special[key] || ""}
          />
        ))}
        <Key
          key="backspace"
          char="⌫"
          onClick={onBackPress}
          altText="" />
          <Key
          key="left"
          char="left"
          onClick={onArrowPress}
          altText="<-" />
          <Key
          key="right"
          char="right"
          onClick={onArrowPress}
          altText="->" />
      </div>
    </div>
  );
};

export default Keyboard;
