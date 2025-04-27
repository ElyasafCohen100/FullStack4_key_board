/**
 * ======================================================================
 * 🔘  Button Component
 * 👥  Developed by: Elyasaf & Shua ✨
 * 📝  Description: Represents a customizable button with optional color
 * 📁  Part of Fullstack Project - Basic React Editor
 * ======================================================================
 */
import React from "react";
import styles from "./Preview.module.css"; // Import the CSS module for styling

// ==================================== The Button component ==================================== //
// Props:
// - text: the text to display inside the button
// - onClick: the function to call when the button is clicked
// - color: optional background color for the button (default is green)

const Button = ({ text, onClick, color = "#4CAF50" }) => {
    return (
        <button
            className={styles.button} // Apply button styling from CSS
            onClick={onClick} // Handle button click
            style={{ backgroundColor: color }} // Apply custom background color
        >
            {text} {/* Display the button text */}
        </button>
    );
}

export default Button;
