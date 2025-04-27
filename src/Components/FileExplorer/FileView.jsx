/**
 * ====================================================================================
 * 🗂️  FileView Component
 * 👥  Developed by: Elyasaf & Shua ✨
 * 📝  Description: Displays the list of file buttons (including the "New File" option)
 * 📁  Part of Fullstack Project - Basic React Editor
 * ====================================================================================
 */
import React from 'react';
import FileButton from './FileButton'; // Import the FileButton component
import styles from './Files.module.css'; // Import the CSS module for styling

// ==================================== The FileView component ==================================== //
// Props:
// - files: array of existing file names
// - onExistingFileClick: function to call when an existing file button is clicked
// - onNewFileClick: function to call when the "New File" button is clicked

const FileView = ({ files, onExistingFileClick, onNewFileClick }) => {
    return (
        <div className={styles.fileView}> {/* Container for the file buttons */}
            <FileButton 
                file={"New File"} 
                onClick={onNewFileClick} 
            /> {/* Button for creating a new file */}
            
            {files.map((file, index) => (
                <FileButton 
                    file={file} 
                    key={index} 
                    onClick={onExistingFileClick} 
                /> // Buttons for each existing file
            ))}
        </div>
    );
};

export default FileView;
