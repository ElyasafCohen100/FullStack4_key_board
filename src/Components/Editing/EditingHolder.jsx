/**
 * =======================================================================
 * 🎹  EditingHolder Component
 * 👥  Developed by: Elyasaf & Shua ✨
 * 📝  Description: Main container for the style bar and virtual keyboard
 * 📁  Part of Fullstack Project - Basic React Editor
 * =======================================================================
 */
import React from "react";
import StyleBar from "./StyleBar"; // StyleBar component for formatting options
import Keyboard from "./Keyboard"; // Keyboard component for typing

import styles from "./css/EditingHolder.module.css"; // Local CSS module for styling

// ==================================== The EditingHolder component ==================================== //
// Props:
// - currentStyle: current text style settings
// - onStyleChange: function to update text style
// - onKeyPress: function to handle typing a key
// - onBackPress: function to handle backspace
// - onArrowPress: function to handle arrow keys
// - onDeleteWord: function to delete a full word
// - onClearText: function to clear the whole text
// - onSearch: function to handle search action
// - isSelecting: is text selection active
// - setIsSelecting: function to activate/deactivate selection

export default function EditingHolder({
  currentStyle,
  onStyleChange,
  onKeyPress,
  onBackPress,
  onArrowPress,
  onDeleteWord,
  onClearText,
  onSearch,
  isSelecting,
  setIsSelecting
}) {

  return (

    <div className="editing-holder">

      {/* StyleBar for formatting actions */}
      <StyleBar onStyleChange={onStyleChange} />

      {/* Keyboard wrapped with local styling */}
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
