/**
 * =======================================================================================
 * 📝  TextArea Component
 * 👥  Developed by: Elyasaf & Shua ✨
 * 📝  Description: Manages editing and previewing of styled text, handling user actions
 * 📁  Part of Fullstack Project - Basic React Editor
 * =======================================================================================
 */
import React, { useState } from "react";
import PreviewHolder from "./Preview/PreviewHolder"; // Import the PreviewHolder component
import EditingHolder from "./Editing/EditingHolder"; // Import the EditingHolder component

import { 
  defaultStyledText, 
  insertChar, 
  deleteChar, 
  deleteWord, 
  clearText, 
  moveCursor,
  searchAndReplace
} from "../utils/editorUtils"; // Import editor utility functions

// ==================================== The TextArea component ==================================== //
// Props:
// - previews: array of all previews
// - curPreviewIndex: index of the currently active preview
// - toggleCurEditor: function to switch to editing mode
// - onCloseClick: function to close a preview
// - updatePreview: function to update a preview's content
// - onSaveClick: function to save a preview

export default function TextArea({ 
  previews, 
  curPreviewIndex, 
  toggleCurEditor, 
  onCloseClick, 
  updatePreview, 
  onSaveClick 
}) {
  // Get the current preview or create a default one if none exists
  const currentPreview = previews[curPreviewIndex] || { 
    styledText: defaultStyledText, 
    cursorIndex: 0 
  };

  // State for managing the current text style
  const [currentStyle, setCurrentStyle] = useState({
    bold: false,
    italic: false,
    underline: false,
    fontColor: "#000000",
    fontSize: "16",
    fontFamily: "Arial",
  });

  // State for managing text selection
  const [selectionRange, setSelectionRange] = useState(null);
  const [isSelecting, setIsSelecting] = useState(false);

  // ==================================== Handlers for editing actions ==================================== //

  const handleInsertChar = (char) => {
    insertChar(char, currentPreview, currentStyle, updatePreview, setSelectionRange);
  };

  const handleDeleteChar = () => {
    deleteChar(currentPreview, currentStyle, updatePreview, setSelectionRange);
  };

  const handleDeleteWord = () => {
    deleteWord(currentPreview, currentStyle, updatePreview, setSelectionRange);
  };

  const handleClearText = () => {
    clearText(currentStyle, updatePreview, setSelectionRange);
  };

  const handleMoveCursor = (direction) => {
    moveCursor(direction, currentPreview, currentStyle, updatePreview, setSelectionRange, isSelecting, setSelectionRange);
  };

  const handleSaveClick = (index) => {
    const textWithoutCursor = currentPreview.styledText.filter(c => c.char !== "|");
    onSaveClick(textWithoutCursor);
  };

  const handleCloseClick = (index) => {
    onCloseClick(index);
  };

  const handleToggleCurEditor = (index) => {
    toggleCurEditor(index);
  };

  const handleSearch = () => {
    searchAndReplace(currentPreview.styledText, updatePreview, currentStyle);
  };

  // ==================================== Render the Preview and Editing areas ==================================== //

  return (
    <>
      <PreviewHolder 
        previews={previews} 
        styledText={currentPreview.styledText} 
        onSaveClick={handleSaveClick} 
        toggleCurEditor={handleToggleCurEditor}
        onCloseClick={handleCloseClick}
        curPreviewIndex={curPreviewIndex}
      />
      
      <EditingHolder 
        currentStyle={currentStyle}
        onStyleChange={setCurrentStyle}
        onKeyPress={handleInsertChar}
        onBackPress={handleDeleteChar}
        onArrowPress={handleMoveCursor}
        onDeleteWord={handleDeleteWord}
        onClearText={handleClearText}
        onSearch={handleSearch}
        isSelecting={isSelecting}
        setIsSelecting={setIsSelecting}
      />
    </>
  );
}
