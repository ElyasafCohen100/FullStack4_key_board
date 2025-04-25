import React from "react";
import styles from "./Files.module.css"; // Import the CSS module for styling

const FileButton = ({ file, onClick }) => {
    console.log(file)
    return (
        <button className={styles.fileButton} onClick={() => onClick(file)}>
        {file}
        </button>
    );
    }

export default FileButton;