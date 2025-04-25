import React from "react";
import Editor from "./Editor";
import Button from "./Button";
import styles from "./Preview.module.css";

const Preview = ({ index, styledText, onSaveClick, onCloseClick, isActive, togglecurEditor }) => {
    return(
        <div className={styles.previewContainer}>
            <div className={styles.topButtons}>
                {!isActive ? 
                    <Button text={"edit"} onClick={() => togglecurEditor(index)} color="red" /> 
                    : null // Use null instead of None, as 'None' is not valid in JavaScript/JSX
                }
                <Button text="Save" onClick={onSaveClick} />
                <Button text="Close" onClick={() => onCloseClick(index)} color="#3a3e3a"/>
            </div>
            <Editor styledText={styledText} />
        </div>
    );
};

export default Preview;