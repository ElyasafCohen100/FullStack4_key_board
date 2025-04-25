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
const currentUser = localStorage.getItem("CurrentUser");

export default function App() {
  const [styledText, setStyledText] = useState([
    { char: "|", font: "Arial", size: "16px", color: "black" }
  ]);
  const [files, setFiles] = useState(() => getSavedFiles(currentUser));
  const [openEditors, setOpenEditors] = useState(1);
  const [newText, setNewText] = useState([]);


  const onExistingFileClick = (file) => {
    const data = loadFile(currentUser + file);
    console.log(data);
    // setNewText([...data, { char: "|", font: "Arial", size: "16px", color: "black" }]);
    // // Reset the newText state after the file content is rendered
    // setTimeout(() => {
    //   setNewText([]);  // Reset the state after rendering
    // }, 0);
  };

  const onNewFileClick = () => {
    // setNewText([{ char: "|", font: "Arial", size: "16px", color: "black" }]);
    // // Reset the newText state after the file content is rendered
    // setTimeout(() => {
    //   setNewText([]);  // Reset the state after rendering
    // }, 0);
  };




  const onSaveFileClick = (updatedStyledText) => {
    const fileName = prompt("Enter file name:");
    if (!fileName) return;

    const updatedFiles = saveFile(fileName, updatedStyledText, currentUser);
    setFiles(updatedFiles);
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
            initialStyledText={styledText}
            newText={newText}
            onSaveClick={onSaveFileClick}
            
          />
        </div>
      </div>
    </div>
  );
}