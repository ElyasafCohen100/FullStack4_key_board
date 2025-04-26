import React from "react";
import StyleBar from "./StyleBar";
import Keyboard from "./Keyboard";

import styles from "./css/EditingHolder.module.css";

export default function EditingHolder({ currentStyle, onStyleChange, onKeyPress, onBackPress, onArrowPress, onDeleteWord, onClearText, onSearch, isSelecting, setIsSelecting }) {
  return (
    <div className="editing-holder">
      <StyleBar onStyleChange={onStyleChange} />
      <div className={styles.keyboardWrapper}>
        <Keyboard
          onKeyPress={onKeyPress}
          onBackPress={onBackPress}
          onArrowPress={onArrowPress}
          onDeleteWord={onDeleteWord}
          onClearText={onClearText}
          onSearch={onSearch}
          isSelecting={isSelecting}
          setIsSelecting={setIsSelecting}
        />
      </div>
    </div>
  );
}
