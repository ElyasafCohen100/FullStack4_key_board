/**
 * ==================================================================
 * 📁  FileButton Component
 * 👥  Developed by: Elyasaf & Shua ✨
 * 📝  Description: Represents a single file button in the File Explorer
 * 📁  Part of Fullstack Project - Basic React Editor
 * ==================================================================
 */
import React from "react";
import styles from "./Files.module.css"; // Import the CSS module for styling

// ==================================== The FileButton component ==================================== //
// Props:
// - file: the file name to display on the button
// - onClick: the function to call when the button is clicked (passing the file)

const FileButton = ({ file, onClick }) => {
  console.log(file); // For debugging: logs the file name to the console

  return (
    <button
      className={styles.fileButton} // Apply styling from the CSS module
      onClick={() => onClick(file)} // When clicked, call onClick with the file
    >
      {file} {/* Display the file name inside the button */}
    </button>
  );
};

export default FileButton;
