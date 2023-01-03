const letterFCharCode = "f".charCodeAt(0);
const zeroCharCode = "0".charCodeAt(0);

const hexValue = (c) => {
  let charCodeNum = c.charCodeAt(0);
  charCodeNum -= zeroCharCode;
  if (charCodeNum <= 9) {
    return charCodeNum;
  }
  let aCharCode = "a".charCodeAt(0);
  charCodeNum = (charCodeNum | 0x20) - (aCharCode - zeroCharCode);
  if (charCodeNum <= 5) {
    return charCodeNum + 10;
  }
  return -1;
};

const twoDigitHex = (char1, char2) => {
  if (!char1) {
    return -1;
  }
  if (!char2) {
    return -1;
  }

  let char1CharCode = char1.charCodeAt(0);
  let char2CharCode = char2.charCodeAt(0);
  if (char1CharCode > letterFCharCode) {
    return -1;
  }
  let high = hexValue(char1);
  if (high == -1) {
    return -1;
  }
  if (char2CharCode > letterFCharCode) {
    return -1;
  }
  let low = hexValue(char2);
  if (low == -1) {
    return -1;
  }
  return (high << 4) + low;
};

//JS implementation of unescaping a character
//from v8 https://github.com/v8/v8/blob/main/src/strings/uri.cc#L329

const unescapeChar = (arr, i, charLength) => {
  let hi = 0;
  let lo = 0;
  let character = arr[i];

  const encodingPresent = character == "%";
  const longHexChars = i <= charLength - 6;
  const unicodeChar = arr[i + 1] == "u";
  const firstTwoHexChars = twoDigitHex(arr[i + 2], arr[i + 3]);
  const lastTwoHexChars = twoDigitHex(arr[i + 4], arr[i + 5]);

  const validFourHex = firstTwoHexChars > -1 && lastTwoHexChars > -1;
  const startOfEscapeSeq = encodingPresent && unicodeChar;

  const escapeFourDigitHex = startOfEscapeSeq && longHexChars && validFourHex;

  if (escapeFourDigitHex) {
    hi = firstTwoHexChars;
    lo = lastTwoHexChars;
    return {
      value: (hi << 8) + lo,
      step: 6,
    };
  }

  const shortHexChars = i <= charLength - 3;
  const shortTwoHexChars = twoDigitHex(arr[i + 1], arr[i + 2]);
  const validShortHex = shortTwoHexChars > -1;

  const escapeTwoDigitHex = encodingPresent && shortHexChars && validShortHex;

  if (escapeTwoDigitHex) {
    lo = shortTwoHexChars;
    return {
      value: lo,
      step: 3,
    };
  } else {
    return {
      value: character,
      step: 1,
    };
  }
};

const findEncodingIndex = (str) => {
  let index = -1;

  for (let i = 0; i < str.length; i++) {
    let containsPercent = str[i] === "%";
    let percentNotFound = index === -1;

    if (containsPercent && percentNotFound) {
      index = i;
    }
  }
  return index;
};

const jsUnescape = (str) => {
  if (typeof str != "string") {
    return "";
  }

  const encodingIndex = findEncodingIndex(str);

  const noEscapeChars = encodingIndex < 0;
  if (noEscapeChars) {
    return str;
  }

  let len = str.length;
  let arr = str.split("");
  let destPosition = 0;
  let unescapedStr = "";
  unescapedStr += str.substring(encodingIndex, 0);

  for (let i = encodingIndex; i < len; destPosition += 1) {
    let { value, step } = unescapeChar(arr, i, len);
    if (/[0-9]/.test(value)) {
      unescapedStr += String.fromCharCode.call(this, value);
    } else {
      unescapedStr += value;
    }
    i += step;
  }
  return unescapedStr;
};

module.exports = jsUnescape;
