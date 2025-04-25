import React from 'react';
import FileButton from './FileButton';
import styles from './Files.module.css';

const FileView = ({ files, onExistingFileClick, onNewFileClick }) => {
    return (
        <div className={styles.fileView}>
            <FileButton file={"New File"} onClick={onNewFileClick} />
            {files.map((file, index) => ( <FileButton file={file} key={index} onClick={onExistingFileClick} /> ))}
        </div>
    );
    }

export default FileView;