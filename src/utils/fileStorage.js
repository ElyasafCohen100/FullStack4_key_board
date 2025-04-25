export const getSavedFiles = (curUser) =>
    JSON.parse(localStorage.getItem(curUser+"Files"));
  
export const saveFile = (fileName, content, curUser) => {
  const existing = localStorage.getItem(curUser+fileName);
  if (existing) {
    const overwrite = window.confirm("File already exists. Overwrite?");
    if (!overwrite) return false;
  }

  const cleanedContent = content.filter((c) => c.char !== "|");
  localStorage.setItem(curUser+fileName, JSON.stringify(cleanedContent));

  const currentFiles = getSavedFiles(curUser);
  if (!currentFiles.includes(curUser+fileName)) {
    const updatedFiles = [...currentFiles, fileName];
    localStorage.setItem(curUser+"Files", JSON.stringify(updatedFiles));
    return updatedFiles;
  }

  return currentFiles;
};
  
  export const loadFile = (fileName) => {
    const data = localStorage.getItem(fileName);
    return JSON.parse(data);
  };
  

// export const onCloseEditor = (openEditors,)