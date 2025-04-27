/**
 * =============================================================================
 * 🎹  Keyboard Component
 * 👥  Developed by: Elyasaf & Shua ✨
 * 📝  Description: Virtual keyboard with full QWERTY layout and real structure
 * 📁  Part of Fullstack Project - Basic React Editor
 * =============================================================================
 */

import "../../App.css";
import Key from "./Key";
import React, { useState } from "react";
import { layouts } from "../../utils/keyboardLayouts";
import styles from "./css/Keyboard.module.css"; // 👈 import your Keyboard.module.css

// ==================================== Keyboard Component ==================================== //

export default function Keyboard({ onKeyPress, onBackPress, onArrowPress, onDeleteWord, onClearText, onSearch }) {
  // set initial language and caps lock
  const [language, setLanguage] = useState("en");
  const [isCapsLock, setIsCapsLock] = useState(false);

  // available languages
  const languageOrder = ["en", "he", "em"];
  const switchLanguage = () => {
    const currentIndex = languageOrder.indexOf(language);
    const nextIndex = (currentIndex + 1) % languageOrder.length;
    setLanguage(languageOrder[nextIndex]);
  };

  const toggleCaps = () => setIsCapsLock(!isCapsLock);

  const layout = layouts[language];
  const special = layout.special;

  return (

    <div className={styles["keyboard-container"]}>
      <div className={styles["keyboard-grid"]}>

        {/* ========= First row - numbers ========= */}
        <div className={styles["keyboard-row"]}>
          {layout.numberRow.map((key, i) => (
            <Key key={i} char={key} onClick={onKeyPress} />
          ))}

          <Key char="backspace" altText={special.backspace} onClick={onBackPress} />
        </div>

        {/* ========= Second row - QWERTY row1 + Tab ========= */}
        <div className={styles["keyboard-row"]}>
          <Key char="tab" altText={special.tab} wide onClick={() => onKeyPress('\t')} />
          {layout.row1.map((key, i) => (
            <Key key={i} char={isCapsLock ? key.toUpperCase() : key} onClick={onKeyPress} />
          ))}
          <Key char="globe" altText={special.globe} onClick={switchLanguage} />
        </div>

        {/* ========= Third row - row2 + CapsLock ========= */}
        <div className={styles["keyboard-row"]}>
          <Key
            char="caps"
            altText={special.caps}
            wide
            isActive={isCapsLock}
            onClick={toggleCaps}
          />
          {layout.row2.map((key, i) => (
            <Key key={i} char={isCapsLock ? key.toUpperCase() : key} onClick={onKeyPress} />
          ))}
          <Key char="enter" altText={special.enter} tall onClick={() => onKeyPress("\n")} />
        </div>

        {/* ========= Fourth row - row3 + Shift ========= */}
        <div className={styles["keyboard-row"]}>
          <Key char="shift" altText={special.shift} wide onClick={() => { }} />
          {layout.row3.map((key, i) => (
            <Key key={i} char={isCapsLock ? key.toUpperCase() : key} onClick={onKeyPress} />
          ))}
          <Key char="shift" altText={special.shift} wide onClick={() => { }} />
        </div>

        {/* ========= Fifth row - Ctrl Alt Space Arrows ========= */}
        <div className={styles["keyboard-row"]}>
          <Key char="search" altText={special.search} onClick={() => onSearch()} />
          <Key char="ctrl" altText={special.ctrl} wide onClick={() => { }} />
          <Key char="alt" altText={special.alt} wide onClick={() => { }} />
          <Key char="space" altText=" " space onClick={() => onKeyPress(" ")} />
          <Key char="left" altText={special.left} onClick={() => onArrowPress("left")} />
          <Key char="right" altText={special.right} onClick={() => onArrowPress("right")} />
          <Key char="del" altText={special.del} onClick={() => onDeleteWord()} />
          <Key char="clear" altText={special.clear} onClick={() => onClearText()} />
        </div>

      </div>
    </div>
  );
}
