import React, { useState } from "react";
import Keyboard from "./Editing/Keyboard";
import PreviewHolder from "./Preview/PreviewHolder";
import { insertCharAt, deleteCharAt } from "../utils/editorUtils";

export default function TextArea({ initialStyledText, newText, onSaveClick }) {
  // Initialize with default values
  const defaultStyledText = [{ char: "|", font: "Arial", size: "16px", color: "black" }];
  const initialText = initialStyledText || defaultStyledText;
  
  // Initialize base editor states
  const [styledText, setStyledText] = useState(initialText);
  const [cursorIndex, setCursorIndex] = useState(0);
  const [currentStyle, setCurrentStyle] = useState({
    font: "Arial",
    size: "16px",
    color: "black",
    bold: false,
    italic: false,
  });

  const [selectionRange, setSelectionRange] = useState(null);
  const [isSelecting, setIsSelecting] = useState(false);

  // Create initial preview - this is critical to prevent undefined errors
  const initialPreview = {
    styledText: initialText,
    isActive: true,
    cursorIndex: 0
  };

  // Initialize preview states with the default first preview
  const [curPreviewIndex, setCurPreviewIndex] = useState(0);
  const [Previews, setPreviews] = useState([initialPreview]);

  // Helper functions for cursor management
  const hideCursor = () => {
    return styledText.filter((c) => c.char !== "|");
  };

  const appearCursor = (textToModify, index) => {
    if (!textToModify || !Array.isArray(textToModify)) {
      textToModify = defaultStyledText;
    }
    
    const textWithoutCursor = textToModify.filter(c => c.char !== "|");
    const safeIndex = index || 0;
    
    return [
      ...textWithoutCursor.slice(0, safeIndex),
      { char: "|", ...currentStyle },
      ...textWithoutCursor.slice(safeIndex)
    ];
  };

  // Editor control functions
  const toggleCurEditor = (index) => {
    // Guard clauses to prevent errors
    if (index === curPreviewIndex) return;
    if (!Previews || !Array.isArray(Previews)) {
      setPreviews([initialPreview]);
      return;
    }
    if (index >= Previews.length) return;
    
    // Make a safe copy
    const updatedPreviews = [...Previews];
    
    // Save current state to current preview
    if (updatedPreviews[curPreviewIndex]) {
      updatedPreviews[curPreviewIndex] = {
        ...updatedPreviews[curPreviewIndex],
        styledText: hideCursor(),
        isActive: false,
        cursorIndex: cursorIndex
      };
    }
    
    // Activate the new preview
    updatedPreviews[index].isActive = true;
    
    // Get the current state of the target preview
    const targetPreview = updatedPreviews[index];
    const targetCursorIndex = targetPreview.cursorIndex || 0;
    const targetStyledText = targetPreview.styledText || defaultStyledText;
    
    // Update states
    setPreviews(updatedPreviews);
    setCurPreviewIndex(index);
    setStyledText(appearCursor(targetStyledText, targetCursorIndex));
    setCursorIndex(targetCursorIndex);
  };

  const onCloseClick = (index) => {
    // Guard clause
    if (!Previews || !Array.isArray(Previews) || Previews.length === 0) {
      setPreviews([initialPreview]);
      return;
    }
    
    if (Previews.length === 1) {
      alert("You cannot close the last editor.");
      return;
    }

    const updatedPreviews = [...Previews];
    updatedPreviews.splice(index, 1);
    
    // If closing the active preview, switch to another one
    if (index === curPreviewIndex) {
      const newIndex = index === 0 ? 0 : index - 1;
      setPreviews(updatedPreviews);
      setCurPreviewIndex(newIndex);
      
      const newPreview = updatedPreviews[newIndex];
      if (newPreview) {
        const newCursorIndex = newPreview.cursorIndex || 0;
        const newStyledText = appearCursor(newPreview.styledText, newCursorIndex);
        setStyledText(newStyledText);
        setCursorIndex(newCursorIndex);
      }
    } else {
      // If closing inactive preview and it was before current, adjust index
      if (index < curPreviewIndex) {
        setCurPreviewIndex(curPreviewIndex - 1);
      }
      setPreviews(updatedPreviews);
    }
  };

  const addNewPreview = (initText) => {
    if (!Array.isArray(initText)) {
      console.error("initText must be an array of styled characters.");
      return;
    }
  
    const updatedPreviews = [...Previews];
  
    // Save the current preview
    if (updatedPreviews[curPreviewIndex]) {
      updatedPreviews[curPreviewIndex] = {
        ...updatedPreviews[curPreviewIndex],
        styledText: hideCursor(),
        isActive: false,
        cursorIndex: cursorIndex,
      };
    }
  
    // Calculate the new cursor position from the provided initText
    const newCursorIndex = initText.findIndex(c => c.char === "|");
  
    const newPreview = {
      styledText: initText,
      isActive: true,
      cursorIndex: newCursorIndex === -1 ? 0 : newCursorIndex,
    };
  
    updatedPreviews.push(newPreview);
  
    // Update states
    setPreviews(updatedPreviews);
    setCurPreviewIndex(updatedPreviews.length - 1);
    setStyledText(initText);
    setCursorIndex(newCursorIndex);
  };
  
  if (newText && Array.isArray(newText) && newText.length > 0) {
    console.log("New text received:", newText);
    addNewPreview(newText);
  }

  const toggleStyle = (style) => {
    setCurrentStyle((prev) => ({ ...prev, [style]: !prev[style] }));
  };

  const insertChar = (char) => {
    // Guard clause
    if (!Previews || !Array.isArray(Previews) || Previews.length === 0) {
      setPreviews([initialPreview]);
      return;
    }
    
    const charObj = { char, ...currentStyle };
    const newText = insertCharAt(styledText, cursorIndex, charObj, currentStyle);
    const newCursorIndex = cursorIndex + 1;
    
    // Update local state
    setStyledText(newText);
    setCursorIndex(newCursorIndex);
    setSelectionRange(null);
    
    // Update preview state
    const updatedPreviews = [...Previews];
    if (updatedPreviews[curPreviewIndex]) {
      updatedPreviews[curPreviewIndex] = {
        ...updatedPreviews[curPreviewIndex],
        styledText: newText,
        cursorIndex: newCursorIndex
      };
      setPreviews(updatedPreviews);
    }
  };

  const deleteChar = () => {
    // Guard clause
    if (!Previews || !Array.isArray(Previews) || Previews.length === 0) {
      setPreviews([initialPreview]);
      return;
    }
    
    const { newText, newCursorIndex } = deleteCharAt(styledText, cursorIndex, selectionRange, currentStyle);
    
    // Update local state
    setStyledText(newText);
    setCursorIndex(newCursorIndex);
    setSelectionRange(null);
    
    // Update preview state
    const updatedPreviews = [...Previews];
    if (updatedPreviews[curPreviewIndex]) {
      updatedPreviews[curPreviewIndex] = {
        ...updatedPreviews[curPreviewIndex],
        styledText: newText,
        cursorIndex: newCursorIndex
      };
      setPreviews(updatedPreviews);
    }
  };

  const moveCursor = (direction) => {
    // Guard clause
    if (!Previews || !Array.isArray(Previews) || Previews.length === 0) {
      setPreviews([initialPreview]);
      return;
    }
    
    const textWithoutCursor = styledText.filter((c) => c.char !== "|");
    let newIndex = Math.max(0, Math.min(cursorIndex + (direction === "left" ? -1 : 1), textWithoutCursor.length));

    if (isSelecting) {
      setSelectionRange((prev) => prev
        ? { start: prev.start, end: newIndex }
        : { start: cursorIndex, end: newIndex });
    } else {
      setSelectionRange(null);
    }

    const newText = [
      ...textWithoutCursor.slice(0, newIndex),
      { char: "|", ...currentStyle },
      ...textWithoutCursor.slice(newIndex)
    ];

    // Update local state
    setStyledText(newText);
    setCursorIndex(newIndex);
    
    // Update preview state
    const updatedPreviews = [...Previews];
    if (updatedPreviews[curPreviewIndex]) {
      updatedPreviews[curPreviewIndex] = {
        ...updatedPreviews[curPreviewIndex],
        styledText: newText,
        cursorIndex: newIndex
      };
      setPreviews(updatedPreviews);
    }
  };

  const handleSaveClick = () => {
    // Pass the current styledText to the parent's onSaveClick
    const textWithoutCursor = hideCursor();
    onSaveClick(textWithoutCursor);
  };

  return (
    <>
      <PreviewHolder 
        previews={Previews || [initialPreview]}
        styledText={styledText} 
        onSaveClick={handleSaveClick} 
        toggleCurEditor={toggleCurEditor}
        onCloseClick={onCloseClick}
        curPreviewIndex={curPreviewIndex}
      />
      <div className="keyboard-wrapper">
        <Keyboard
          onKeyPress={insertChar}
          onBackPress={deleteChar}
          onArrowPress={moveCursor}
          isSelecting={isSelecting}
          setIsSelecting={setIsSelecting}
        />
      </div>
    </>
  );
}
