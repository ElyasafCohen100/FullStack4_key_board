import React from "react";
import Editor from "./Editor";
import Button from "./Button";
import styles from "./Preview.module.css";

const Preview = ({ index, styledText, onSaveClick, onCloseClick, isActive, toggleCurEditor }) => {
const handleSaveClick = () => {
    onSaveClick(index);
}

    return(
        <div className={styles.previewContainer}>
            <div className={styles.topButtons}>
            {isActive ?
                    <h1 className={styles.previewTitle}>Current Preview</h1>
                    : <h1 className={styles.previewTitle}>Preview {index+1}</h1>
                    }
                {!isActive ? 
                    <Button text={"edit"} onClick={() => toggleCurEditor(index)} color="red" /> 
                    : null // Use null instead of None, as 'None' is not valid in JavaScript/JSX
                }
                
                <Button text="Save" onClick={handleSaveClick} />
                <Button text="Close" onClick={() => onCloseClick(index)} color="#3a3e3a"/>
            </div>
            <Editor styledText={styledText} />
        </div>
    );
};

export default Preview;