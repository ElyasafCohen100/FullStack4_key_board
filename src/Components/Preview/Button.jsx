import React from "react";
import styles from "./Preview.module.css"; // Import the CSS module for styling

const Button = ({ text, onClick, color="#4CAF50" }) => {
    return (
        <button className={styles.button} onClick={onClick} style={{ backgroundColor: color }}>
            {text}
        </button>
    );
}

export default Button;