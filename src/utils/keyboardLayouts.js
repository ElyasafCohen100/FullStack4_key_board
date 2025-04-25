/**
 * ===========================================================================
 * 🧠  keyboardLayouts.js
 * 👥  Developed by: Elyasaf & Shua ✨
 * 📝  Description: Defines the layout (structure) of keys for each language
 *                 Includes English, Hebrew, and Emoji keyboards.
 * 📁  Part of Fullstack Project - Basic React Editor
 * ===========================================================================
 */

// ==================================== English Layout ==================================== //
// This layout matches a real English QWERTY keyboard
// Each row contains actual key order. We also add special keys like shift and caps.

export const layouts = {
  en: {
    numberRow: ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='],
    row1: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
    row2: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'"],
    row3: ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/'],

    // ========= Extra keys like space, caps, arrows etc ========= //
    specialKeys: ['tab', 'caps', 'shift', 'ctrl', 'alt', 'space', 'enter', 'backspace', 'globe', 'left', 'right'],

    // ========= How to show these special keys ========= //
    special: {
      tab: 'Tab',
      caps: 'CapsLock',
      shift: 'Shift',
      ctrl: 'Ctrl',
      alt: 'Alt',
      space: ' ',
      enter: 'Enter',
      backspace: '⌫',
      globe: '🌐',
      left: '←',
      right: '→',
    }
  },

  // ==================================== Hebrew Layout ==================================== //
  // This layout matches a real Israeli keyboard including symbols

  he: {
    numberRow: ['~', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='],
    row1: ['/', '\'', 'ק', 'ר', 'א', 'ט', 'ו', 'ן', 'ם', 'פ', '[', ']', '\\'],
    row2: ['ש', 'ד', 'ג', 'כ', 'ע', 'י', 'ח', 'ל', 'ך', 'ף'],
    row3: ['ז', 'ס', 'ב', 'ה', 'נ', 'מ', 'צ', 'ת', 'ץ', '.'],

    // ========= Same extra keys as English ========= //
    specialKeys: ['tab', 'caps', 'shift', 'ctrl', 'alt', 'space', 'enter', 'backspace', 'globe', 'left', 'right'],

    // ========= Translations or symbols ========= //
    special: {
      tab: 'Tab',
      caps: 'CapsLock',
      shift: 'Shift',
      ctrl: 'Ctrl',
      alt: 'Alt',
      space: ' ',
      enter: 'אנטר',
      backspace: '⌫',
      globe: '🌐',
      left: '←',
      right: '→',
    }
  },

  // ==================================== Emoji Layout (for fun!) ==================================== //
  // Just a cute keyboard layout with emoji keys

  em: {
    numberRow: ['😀','😁','😂','🤣','😍','😎','😢','😡','👍','👎','🎉','❤️','🔥'],
    row1: ['💡','🧠','🎯','🚀','🎸','🎧','📚','💻','📱','📷'],
    row2: ['⚡','🎮','🏍️','🏆','🎓','🌈','🍕','🍟','🍔','🍦'],
    row3: ['🏠','✈️','🗺️','📍','🎁','🛒','💰','💎','🔒','🔓'],

    // Only two actions here
    specialKeys: ['space', 'backspace'],

    special: {
      space: ' ',
      backspace: '⌫'
    }
  }
};
