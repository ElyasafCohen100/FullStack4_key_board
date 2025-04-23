import React from 'react';
import Key from './key';

const Keyboard = ({ onKeyPress }) => {
    const keys = [
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
        'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
        'U', 'V', 'W', 'X', 'Y', 'Z', '\n', ' '
    ];
    const specialKeys = { '\n': "enter", ' ': "space" };
    
    return (
        <div style={{ display: "flex", flexWrap: "wrap", maxWidth: "400px", justifyContent: "center" }}>
        {keys.map((key, index) => (
            <Key key={index} char={key} onClick={onKeyPress} altText={specialKeys[key] ? specialKeys[key] : ""} />
        ))}
        </div>
    );
}

export default Keyboard;