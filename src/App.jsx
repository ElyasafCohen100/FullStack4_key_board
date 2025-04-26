import "./App.css";
import React, { useState } from "react";
import FileView from "./Components/FileExplorer/FileView";
import TextArea from "./Components/TextArea";

import { getSavedFiles, saveFile, loadFile } from "./utils/fileStorage";
import { auth } from "./utils/otherUtils";

// Ensure Users and temp user exists in localStorage
if (!localStorage.getItem("Users")) {
  localStorage.setItem("Users", JSON.stringify([]));
  if (!localStorage.getItem("Shua")) {
    localStorage.setItem("Shua", JSON.stringify({name: "Shua", password: "123", files: []}));
    localStorage.setItem("ShuaFiles", JSON.stringify([]));
  }
  if (!localStorage.getItem("Elyasaf")) {
    localStorage.setItem("Elyasaf", JSON.stringify({name: "Elyasaf", password: "123", files: []}));
    localStorage.setItem("ElyasafFiles", JSON.stringify([]));
  }
}

// Add a check to ensure `auth()` is only called once
if (!sessionStorage.getItem("authChecked")) {
  auth(); // Only call auth() once
  sessionStorage.setItem("authChecked", "true");
}
const currentUser = sessionStorage.getItem("CurrentUser");

export default function App() {
  // Default styled text for new editors
  const defaultStyledText = [
    { char: "|", font: "Arial", size: "16px", color: "black" }
  ];
  
  // Define initial preview state
  const initialPreview = {
    styledText: defaultStyledText,
    isActive: true,
    cursorIndex: 0
  };
  
  // State moved from TextArea to App
  const [files, setFiles] = useState(() => getSavedFiles(currentUser));
  const [previews, setPreviews] = useState([initialPreview]);
  const [curPreviewIndex, setCurPreviewIndex] = useState(0);

  // Handle opening an existing file
  const onExistingFileClick = (file) => {
    const data = loadFile(currentUser + file);
    if (data && Array.isArray(data)) {
      // Add cursor to the file data
      const textWithCursor = [...data, { char: "|", font: "Arial", size: "16px", color: "black" }];
      
      // Create new previews array with inactive current tab and new active tab
      const updatedPreviews = [...previews];
      
      // Set current tab to inactive
      if (updatedPreviews[curPreviewIndex]) {
        updatedPreviews[curPreviewIndex] = {
          ...updatedPreviews[curPreviewIndex],
          isActive: false
        };
      }
      
      // Add new tab with file data
      updatedPreviews.push({
        styledText: textWithCursor,
        isActive: true,
        cursorIndex: textWithCursor.length - 1
      });
      
      // Update state
      setPreviews(updatedPreviews);
      setCurPreviewIndex(updatedPreviews.length - 1);
    }
  };

  // Handle creating a new file
  const onNewFileClick = () => {
    // Create new previews array with inactive current tab and new active tab
    const updatedPreviews = [...previews];
    
    // Set current tab to inactive
    if (updatedPreviews[curPreviewIndex]) {
      updatedPreviews[curPreviewIndex] = {
        ...updatedPreviews[curPreviewIndex],
        isActive: false
      };
    }
    
    // Add new tab with default text
    updatedPreviews.push({
      styledText: defaultStyledText,
      isActive: true,
      cursorIndex: 0
    });
    
    // Update state
    setPreviews(updatedPreviews);
    setCurPreviewIndex(updatedPreviews.length - 1);
  };

  // Handle saving a file
  const onSaveFileClick = (updatedStyledText) => {
    const fileName = prompt("Enter file name:");
    if (!fileName) return;

    const updatedFiles = saveFile(fileName, updatedStyledText, currentUser);
    setFiles(updatedFiles);
  };

  // Update preview state when text changes in TextArea
  const updatePreview = (styledText, cursorIndex) => {
    const updatedPreviews = [...previews];
    if (updatedPreviews[curPreviewIndex]) {
      updatedPreviews[curPreviewIndex] = {
        ...updatedPreviews[curPreviewIndex],
        styledText,
        cursorIndex
      };
      setPreviews(updatedPreviews);
    }
  };

  // Switch between preview tabs
  // In App.jsx - modify toggleCurEditor
  const toggleCurEditor = (index) => {
    if (index === curPreviewIndex || index >= previews.length) return;
    
    const updatedPreviews = [...previews];
    
    // First, save the current cursor position for the current editor
    const currentEditor = updatedPreviews[curPreviewIndex];
    const currentTextWithoutCursor = currentEditor.styledText.filter(c => c.char !== '|');
    
    // Update current preview to be inactive and remove cursor
    updatedPreviews[curPreviewIndex] = {
      ...currentEditor,
      isActive: false,
      styledText: currentTextWithoutCursor
    };
    
    // Now handle the target editor we're switching to
    console.log("Switching to editor at index:", index);
    const targetEditor = updatedPreviews[index];
    const targetTextWithoutCursor = targetEditor.styledText.filter(c => c.char !== '|');
    const targetCursorIdx = targetEditor.cursorIndex || 0;
    
    // Add cursor at the right position in the target editor
    const newTargetText = [
      ...targetTextWithoutCursor.slice(0, targetCursorIdx),
      { char: '|', font: 'Arial', size: '16px', color: 'black' },
      ...targetTextWithoutCursor.slice(targetCursorIdx)
    ];
    
    // Update target editor to be active with cursor
    updatedPreviews[index] = {
      ...targetEditor,
      isActive: true,
      styledText: newTargetText
    };
    
    setPreviews(updatedPreviews);
    setCurPreviewIndex(index);
  };
  // Close a preview tab
  const onCloseClick = (index) => {
    if (previews.length <= 1) {
      alert("You cannot close the last editor.");
      return;
    }
  
    const updatedPreviews = [...previews];
    
    // Calculate new active index
    let newActiveIndex = curPreviewIndex;
    
    // If closing active tab
    if (index === curPreviewIndex) {
      newActiveIndex = index === 0 ? 0 : index - 1;
    } 
    // If closing tab before current tab
    else if (index < curPreviewIndex) {
      newActiveIndex = curPreviewIndex - 1;
    }
    
    // Make sure the new active index is valid (after removing the tab)
    const finalActiveIndex = Math.min(newActiveIndex, updatedPreviews.length - 2);
    
    // First, process all editors to remove cursors
    const cleanPreviews = updatedPreviews.map(preview => {
      const textWithoutCursor = preview.styledText.filter(c => c.char !== '|');
      return {
        ...preview,
        isActive: false,
        styledText: textWithoutCursor
      };
    });
    
    // Remove the tab we want to close
    cleanPreviews.splice(index, 1);
    
    // Now set the new active editor with cursor
    if (cleanPreviews[finalActiveIndex]) {
      const cursorPos = cleanPreviews[finalActiveIndex].cursorIndex || 0;
      const textWithoutCursor = cleanPreviews[finalActiveIndex].styledText;
      
      cleanPreviews[finalActiveIndex] = {
        ...cleanPreviews[finalActiveIndex],
        isActive: true,
        styledText: [
          ...textWithoutCursor.slice(0, cursorPos),
          { char: '|', font: 'Arial', size: '16px', color: 'black' },
          ...textWithoutCursor.slice(cursorPos)
        ]
      };
    }
    
    setPreviews(cleanPreviews);
    setCurPreviewIndex(finalActiveIndex);
  };

  return (
    <div className="app-container">
      <div className="app-layout">
        <FileView
          files={files}
          onExistingFileClick={onExistingFileClick}
          onNewFileClick={onNewFileClick}
        />

        <div className="editor-area">
          <TextArea 
            previews={previews}
            curPreviewIndex={curPreviewIndex}
            toggleCurEditor={toggleCurEditor}
            onCloseClick={onCloseClick}
            updatePreview={updatePreview}
            onSaveClick={onSaveFileClick}
          />
        </div>
      </div>
    </div>
  );
}