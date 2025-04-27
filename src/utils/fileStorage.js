/**
 * =================================================================================
 * 💾  File Storage Utilities
 * 👥  Developed by: Elyasaf & Shua ✨
 * 📝  Description: Functions to save, load, and manage user files in localStorage
 * 📁  Part of Fullstack Project - Basic React Editor
 * =================================================================================
 */

// ==================================== Get Saved Files ==================================== //
// Retrieves the list of saved file names for the current user from localStorage
export const getSavedFiles = (curUser) =>
  JSON.parse(localStorage.getItem(curUser + "Files"));

// ==================================== Save File ==================================== //
// Saves a new file (or overwrites an existing one) to localStorage
export const saveFile = (fileName, content, curUser) => {
  const existing = localStorage.getItem(curUser + fileName);

  if (existing) {
    const overwrite = window.confirm("File already exists. Overwrite?");
    if (!overwrite) return false;
  }

  // Clean content: remove cursor before saving // 
  const cleanedContent = content.filter((c) => c.char !== "|");

  // Save the file content //
  localStorage.setItem(curUser + fileName, JSON.stringify(cleanedContent));

  // Update the user's list of files //
  const currentFiles = getSavedFiles(curUser) || [];

  if (!currentFiles.includes(fileName)) {
    const updatedFiles = [...currentFiles, fileName];
    localStorage.setItem(curUser + "Files", JSON.stringify(updatedFiles));
    return updatedFiles;
  }

  return currentFiles;
};

// ==================================== Load File ==================================== //
// Loads a file's content from localStorage
export const loadFile = (fileName) => {
  const data = localStorage.getItem(fileName);
  return JSON.parse(data);
};

// ==================================== Future Feature Placeholder ==================================== //
// export const onCloseEditor = (openEditors,)
// (planned feature: to handle editor closures and file updates)
