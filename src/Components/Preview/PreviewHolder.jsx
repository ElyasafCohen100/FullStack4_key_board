import React from "react";
import styles from "./Preview.module.css"; // Import the CSS module for styling
import Preview from "./Preview";

const PreviewHolder = ({ styledText, onSaveClick, onCloseClick, previews, toggleCurEditor }) => {
    return (
        <div className={styles.previewHolder}>
            {previews.map((preview, index) => (
                <Preview key={index} index={index} styledText={preview.styledText} 
                onSaveClick={onSaveClick} onCloseClick={onCloseClick}
                isActive={preview.isActive} toggleCurEditor={toggleCurEditor} />
            ))}
        </div>
    );
}

export default PreviewHolder;