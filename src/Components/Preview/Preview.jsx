/**
 * ==========================================================================================
 * 🖼️  Preview Component
 * 👥  Developed by: Elyasaf & Shua ✨
 * 📝  Description: Displays a preview of the styled text with save, edit, and close options
 * 📁  Part of Fullstack Project - Basic React Editor
 * ==========================================================================================
 */
import React from "react";
import Editor from "./Editor"; // Import the Editor component
import Button from "./Button"; // Import the Button component
import styles from "./Preview.module.css"; // Import the CSS module for styling

// ==================================== The Preview component ==================================== //
// Props:
// - index: the index of the preview (used for labeling and actions)
// - styledText: the text with styles to display inside the editor
// - onSaveClick: function to call when saving the preview
// - onCloseClick: function to call when closing the preview
// - isActive: boolean indicating if this is the currently active preview
// - toggleCurEditor: function to switch back to editing this preview

const Preview = ({ index, styledText, onSaveClick, onCloseClick, isActive, toggleCurEditor }) => {
    const handleSaveClick = () => {
        onSaveClick(index); // Handle the save button click by passing the current index
    };

    return (
        <div className={styles.previewContainer}> {/* Main container for the preview */}
            <div className={styles.topButtons}> {/* Container for the action buttons */}
                {isActive ? (
                    <h1 className={styles.previewTitle}>Current Preview</h1> // Title for the active preview
                ) : (
                    <h1 className={styles.previewTitle}>Preview {index + 1}</h1> // Title for inactive previews
                )}

                {!isActive ? (
                    <Button
                        text={"edit"}
                        onClick={() => toggleCurEditor(index)}
                        color="red"
                    /> // Button to switch back to edit mode (only for inactive previews)
                ) : null}

                <Button
                    text="Save"
                    onClick={handleSaveClick}
                /> {/* Button to save the preview */}

                <Button
                    text="Close"
                    onClick={() => onCloseClick(index)}
                    color="#3a3e3a"
                /> {/* Button to close the preview */}
            </div>

            <Editor styledText={styledText} /> {/* Display the styled text using the Editor component */}
        </div>
    );
};

export default Preview;
