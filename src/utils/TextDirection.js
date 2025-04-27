/**
 * =============================================================================================
 * ↔️  isRTL Utility
 * 👥  Developed by: Elyasaf & Shua ✨
 * 📝  Description: Checks if the first character of a text is a right-to-left (RTL) character
 * 📁  Part of Fullstack Project - Basic React Editor
 * =============================================================================================
 */

// ==================================== isRTL Function ==================================== //
// Determines if a given text starts with a character from a right-to-left language (like Hebrew or Arabic)
export const isRTL = (text) => {
  if (!text || typeof text !== 'string') return false; // If no text or not a string, return false

  const firstChar = text.trim()[0]; // Remove spaces and get the first character
  const rtlChars = /[\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC]/; // Regular expression matching RTL Unicode ranges

  return rtlChars.test(firstChar); // Return true if the first character is RTL
};
