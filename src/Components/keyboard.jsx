/**
 * =============================================================================
 * 🎹  Keyboard Component
 * 👥  Developed by: Elyasaf & חבר של אליסף ✨
 * 📝  Description: Virtual keyboard with full QWERTY layout and real structure
 * 📁  Part of Fullstack Project - Basic React Editor
 * =============================================================================
 */

import "../App.css";
import React, { useState } from "react";
import Key from "./key";
import { layouts } from "../utils/keyboardLayouts";

// ==================================== Keyboard Component ==================================== //

export default function Keyboard({ onKeyPress, onBackPress, onArrowPress }) {

  // ========= State for language and caps ========= //
  const [language, setLanguage] = useState("en");
  const [isCaps, setIsCaps] = useState(false);

  // ========= Change to next language (en → he → em) ========= //
  const languageOrder = ["en", "he", "em"];
  const switchLanguage = () => {
    const currentIndex = languageOrder.indexOf(language);
    const nextIndex = (currentIndex + 1) % languageOrder.length;
    setLanguage(languageOrder[nextIndex]);
  };

  // ========= Toggle caps lock ON/OFF ========= //
  const toggleCaps = () => setIsCaps(!isCaps);

  // ========= Load current layout ========= //
  const layout = layouts[language];

  // ========= Pick rows based on language ========= //
  const rows = [
    layout.numberRow,
    layout.row1,
    layout.row2,
    layout.row3
  ];

  const special = layout.special;

  return (

    <div className="keyboard-container">

      <div className="keyboard-grid">

        {/* ========= First row - numbers ========= */}
        <div className="keyboard-row">
          {layout.numberRow.map((key, i) => (
            <Key key={i} char={key} onClick={onKeyPress} />
          ))}
          <Key char="backspace" altText={special.backspace} onClick={onBackPress} />
        </div>

        {/* ========= Second row - QWERTY row1 + Tab ========= */}
        <div className="keyboard-row">
          <Key char="tab" altText={special.tab} wide onClick={() => onKeyPress('\t')} />
          {layout.row1.map((key, i) => (
            <Key key={i} char={isCaps ? key.toUpperCase() : key} onClick={onKeyPress} />
          ))}
          <Key char="globe" altText={special.globe} onClick={switchLanguage} />
        </div>

        {/* ========= Third row - row2 + CapsLock ========= */}
        <div className="keyboard-row">
          <Key
            char="caps"
            altText={special.caps}
            wide
            isActive={isCaps}
            onClick={toggleCaps}
          />
          {layout.row2.map((key, i) => (
            <Key key={i} char={isCaps ? key.toUpperCase() : key} onClick={onKeyPress} />
          ))}
          <Key char="enter" altText={special.enter} tall onClick={() => onKeyPress("\n")} />
        </div>

        {/* ========= Fourth row - row3 + Shift ========= */}
        <div className="keyboard-row">
          <Key char="shift" altText={special.shift} wide onClick={() => { }} />
          {layout.row3.map((key, i) => (
            <Key key={i} char={isCaps ? key.toUpperCase() : key} onClick={onKeyPress} />
          ))}
          <Key char="shift" altText={special.shift} wide onClick={() => { }} />
        </div>

        {/* ========= Fifth row - Ctrl Alt Space Arrows ========= */}
        <div className="keyboard-row">
          <Key char="ctrl" altText={special.ctrl} wide onClick={() => { }} />
          <Key char="alt" altText={special.alt} wide onClick={() => { }} />
          <Key char="space" altText=" " space onClick={() => onKeyPress(" ")} />
          <Key char="left" altText={special.left} onClick={() => onArrowPress("left")} />
          <Key char="right" altText={special.right} onClick={() => onArrowPress("right")} />
        </div>

      </div>
    </div>
  );
}
