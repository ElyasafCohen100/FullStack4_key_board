/**
 * ======================================================
 * 👀  View Component
 * 👥  Developed by: Elyasaf & חבר של אליסף ✨
 * 📝  Description: Displays the styled text (read-only)
 * 📁  Part of Fullstack Project - Basic React Editor
 * ======================================================
 */

import "../App.css";
import React from "react";
import LetterSpan from "./LetterSpan";
import { isRTL } from "../utils/TextDirection";
import { splitIntoLines } from "../utils/SplitIntoLines";

// ==================================== The View component ==================================== //

// This component receives styledText (an array of char objects)
// and displays it line by line using LetterSpan.
// It is read-only and does not allow editing.

export default function View({ styledText }) {

    const lines = splitIntoLines(styledText); // Break into lines

    return (

        <div className="view-container">

            {lines.map((line, lineIndex) => {
                const text = line.map((c) => c.char).join(""); // Raw text
                const rtl = isRTL(text); // Detect direction (RTL or LTR)

                return (
                    <div
                        key={lineIndex}
                        className={rtl ? "text-line-rtl" : "text-line-ltr"}
                    >
                        {line.map((charObj, index) => (
                            <LetterSpan key={index} charObj={charObj} />
                        ))}

                    </div>
                );
            })}

        </div>
    );
}
