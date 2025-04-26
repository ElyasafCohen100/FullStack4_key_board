import React, { useState } from "react";
import PreviewHolder from "./Preview/PreviewHolder";
import EditingHolder from "./Editing/EditingHolder";
import { 
  defaultStyledText, 
  insertChar, 
  deleteChar, 
  deleteWord, 
  clearText, 
  moveCursor,
  searchAndReplace
} from "../utils/editorUtils";

export default function TextArea({ 
  previews, 
  curPreviewIndex, 
  toggleCurEditor, 
  onCloseClick, 
  updatePreview, 
  onSaveClick 
}) {
  const currentPreview = previews[curPreviewIndex] || { 
    styledText: defaultStyledText, 
    cursorIndex: 0 
  };

  const [currentStyle, setCurrentStyle] = useState({
    bold: false,
    italic: false,
    underline: false,
    fontColor: "#000000",
    fontSize: "16",
    fontFamily: "Arial",
  });
  const [selectionRange, setSelectionRange] = useState(null);
  const [isSelecting, setIsSelecting] = useState(false);

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
