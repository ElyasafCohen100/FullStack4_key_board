/**
 * ===================================================================================================
 * 🖥️  App Component (Main)
 * 👥  Developed by: Elyasaf & Shua ✨
 * 📝  Description: Manages the entire app layout — file management, editor tabs, user authentication
 * 📁  Part of Fullstack Project - Basic React Editor
 * ===================================================================================================
 */

import "./App.css";
import React, { useState } from "react";
import FileView from "./Components/FileExplorer/FileView";
import TextArea from "./Components/TextArea";

import { getSavedFiles, saveFile, loadFile } from "./utils/fileStorage";
import { auth } from "./utils/otherUtils";

// ==================================== Initial Authentication and User Setup ==================================== //

// Ensure default users exist in localStorage
if (!localStorage.getItem("Users")) {
  localStorage.setItem("Users", JSON.stringify([]));

  if (!localStorage.getItem("Shua")) {
    localStorage.setItem("Shua", JSON.stringify({ name: "Shua", password: "123", files: [] }));
    localStorage.setItem("ShuaFiles", JSON.stringify([]));
  }

  if (!localStorage.getItem("Elyasaf")) {
    localStorage.setItem("Elyasaf", JSON.stringify({ name: "Elyasaf", password: "123", files: [] }));
    localStorage.setItem("ElyasafFiles", JSON.stringify([]));
  }
}

// Run authentication once
if (!sessionStorage.getItem("authChecked")) {
  auth();
  sessionStorage.setItem("authChecked", "true");
}

// Get the currently logged-in user
const currentUser = sessionStorage.getItem("CurrentUser");

// ==================================== App Component ==================================== //
export default function App() {
  // ------------------------------------ State Management ------------------------------------ //

  const defaultStyledText = [{ char: "|", font: "Arial", size: "16px", color: "black" }];

  const initialPreview = {
    styledText: defaultStyledText,
    isActive: true,
    cursorIndex: 0
  };

  const [files, setFiles] = useState(() => getSavedFiles(currentUser));
  const [previews, setPreviews] = useState([initialPreview]);
  const [curPreviewIndex, setCurPreviewIndex] = useState(0);

  // ------------------------------------ File Operations ------------------------------------ //

  // Open an existing file
  const onExistingFileClick = (file) => {
    const data = loadFile(currentUser + file);

    if (data && Array.isArray(data)) {
      const textWithCursor = [...data, { char: "|", font: "Arial", size: "16px", color: "black" }];
      const updatedPreviews = [...previews];

      if (updatedPreviews[curPreviewIndex]) {
        const currentTextWithoutCursor = updatedPreviews[curPreviewIndex].styledText.filter(c => c.char !== '|');
        updatedPreviews[curPreviewIndex] = {
          ...updatedPreviews[curPreviewIndex],
          isActive: false,
          styledText: currentTextWithoutCursor
        };
      }

      updatedPreviews.push({
        styledText: textWithCursor,
        isActive: true,
        cursorIndex: textWithCursor.length - 1
      });

      setPreviews(updatedPreviews);
      setCurPreviewIndex(updatedPreviews.length - 1);
    }
  };

  // Create a new file
  const onNewFileClick = () => {
    const updatedPreviews = [...previews];

    if (updatedPreviews[curPreviewIndex]) {
      const currentTextWithoutCursor = updatedPreviews[curPreviewIndex].styledText.filter(c => c.char !== '|');
      updatedPreviews[curPreviewIndex] = {
        ...updatedPreviews[curPreviewIndex],
        isActive: false,
        styledText: currentTextWithoutCursor
      };
    }

    updatedPreviews.push({
      styledText: defaultStyledText,
      isActive: true,
      cursorIndex: 0
    });

    setPreviews(updatedPreviews);
    setCurPreviewIndex(updatedPreviews.length - 1);
  };

  // Save a file
  const onSaveFileClick = (updatedStyledText) => {
    const fileName = prompt("Enter file name:");
    if (!fileName) return;

    const updatedFiles = saveFile(fileName, updatedStyledText, currentUser);
    setFiles(updatedFiles);
  };

  // ------------------------------------ Text Editing Operations ------------------------------------ //

  // Update text inside an editor tab
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

  // Switch between editor tabs
  const toggleCurEditor = (index) => {
    if (index === curPreviewIndex || index >= previews.length) return;

    const updatedPreviews = [...previews];
    const currentEditor = updatedPreviews[curPreviewIndex];
    const currentTextWithoutCursor = currentEditor.styledText.filter(c => c.char !== '|');

    updatedPreviews[curPreviewIndex] = {
      ...currentEditor,
      isActive: false,
      styledText: currentTextWithoutCursor
    };

    const targetEditor = updatedPreviews[index];
    const targetTextWithoutCursor = targetEditor.styledText.filter(c => c.char !== '|');
    const targetCursorIdx = targetEditor.cursorIndex || 0;

    const newTargetText = [
      ...targetTextWithoutCursor.slice(0, targetCursorIdx),
      { char: '|', font: 'Arial', size: '16px', color: 'black' },
      ...targetTextWithoutCursor.slice(targetCursorIdx)
    ];

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
    let newActiveIndex = curPreviewIndex;

    if (index === curPreviewIndex) {
      newActiveIndex = index === 0 ? 0 : index - 1;
    } else if (index < curPreviewIndex) {
      newActiveIndex = curPreviewIndex - 1;
    }

    const finalActiveIndex = Math.min(newActiveIndex, updatedPreviews.length - 2);

    const cleanPreviews = updatedPreviews.map(preview => {
      const textWithoutCursor = preview.styledText.filter(c => c.char !== '|');
      return {
        ...preview,
        isActive: false,
        styledText: textWithoutCursor
      };
    });

    cleanPreviews.splice(index, 1);

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

  // ==================================== Render the App Layout ==================================== //

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
