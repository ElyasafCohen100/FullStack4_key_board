export const isRTL = (text) => {
  if (!text || typeof text !== 'string') return false;
  const firstChar = text.trim()[0]; // remove leading spaces
  const rtlChars = /[\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC]/;
  return rtlChars.test(firstChar);
};
