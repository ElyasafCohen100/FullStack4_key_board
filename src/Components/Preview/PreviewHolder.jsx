/**
 * =====================================================================
 * 🗂️  PreviewHolder Component
 * 👥  Developed by: Elyasaf & Shua ✨
 * 📝  Description: Holds and displays multiple previews of styled text
 * 📁  Part of Fullstack Project - Basic React Editor
 * =====================================================================
 */
import React from "react";
import styles from "./Preview.module.css"; // Import the CSS module for styling
import Preview from "./Preview"; // Import the Preview component

// ==================================== The PreviewHolder component ==================================== //
// Props:
// - styledText: the current styled text (not used directly here, passed to previews)
// - onSaveClick: function to call when saving a preview
// - onCloseClick: function to call when closing a preview
// - previews: array of preview objects (each preview has styledText and isActive)
// - toggleCurEditor: function to switch back to editing a specific preview

const PreviewHolder = ({ styledText, onSaveClick, onCloseClick, previews, toggleCurEditor }) => {
    return (
        <div className={styles.previewHolder}> {/* Container for all preview components */}
            {previews.map((preview, index) => (
                <Preview 
                    key={index} 
                    index={index} 
                    styledText={preview.styledText} 
                    onSaveClick={onSaveClick} 
                    onCloseClick={onCloseClick} 
                    isActive={preview.isActive} 
                    toggleCurEditor={toggleCurEditor} 
                /> // Render a Preview component for each preview object
            ))}
        </div>
    );
}

export default PreviewHolder;
