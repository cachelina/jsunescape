"use strict";

var _this = void 0;
var letterFCharCode = "f".charCodeAt(0);
var zeroCharCode = "0".charCodeAt(0);
var hexValue = function hexValue(c) {
  var charCodeNum = c.charCodeAt(0);
  charCodeNum -= zeroCharCode;
  if (charCodeNum <= 9) {
    return charCodeNum;
  }
  var aCharCode = "a".charCodeAt(0);
  charCodeNum = (charCodeNum | 0x20) - (aCharCode - zeroCharCode);
  if (charCodeNum <= 5) {
    return charCodeNum + 10;
  }
  return -1;
};
var twoDigitHex = function twoDigitHex(char1, char2) {
  if (!char1) {
    return -1;
  }
  if (!char2) {
    return -1;
  }
  var char1CharCode = char1.charCodeAt(0);
  var char2CharCode = char2.charCodeAt(0);
  if (char1CharCode > letterFCharCode) {
    return -1;
  }
  var high = hexValue(char1);
  if (high == -1) {
    return -1;
  }
  if (char2CharCode > letterFCharCode) {
    return -1;
  }
  var low = hexValue(char2);
  if (low == -1) {
    return -1;
  }
  return (high << 4) + low;
};

//JS implementation of unescaping a character
//from v8 https://github.com/v8/v8/blob/main/src/strings/uri.cc#L329

var unescapeChar = function unescapeChar(arr, i, charLength) {
  var hi = 0;
  var lo = 0;
  var character = arr[i];
  var encodingPresent = character == "%";
  var longHexChars = i <= charLength - 6;
  var unicodeChar = arr[i + 1] == "u";
  var firstTwoHexChars = twoDigitHex(arr[i + 2], arr[i + 3]);
  var lastTwoHexChars = twoDigitHex(arr[i + 4], arr[i + 5]);
  var validFourHex = firstTwoHexChars > -1 && lastTwoHexChars > -1;
  var startOfEscapeSeq = encodingPresent && unicodeChar;
  var escapeFourDigitHex = startOfEscapeSeq && longHexChars && validFourHex;
  if (escapeFourDigitHex) {
    hi = firstTwoHexChars;
    lo = lastTwoHexChars;
    return {
      value: (hi << 8) + lo,
      step: 6
    };
  }
  var shortHexChars = i <= charLength - 3;
  var shortTwoHexChars = twoDigitHex(arr[i + 1], arr[i + 2]);
  var validShortHex = shortTwoHexChars > -1;
  var escapeTwoDigitHex = encodingPresent && shortHexChars && validShortHex;
  if (escapeTwoDigitHex) {
    lo = shortTwoHexChars;
    return {
      value: lo,
      step: 3
    };
  } else {
    return {
      value: character,
      step: 1
    };
  }
};
var findEncodingIndex = function findEncodingIndex(str) {
  var index = -1;
  for (var i = 0; i < str.length; i++) {
    var containsPercent = str[i] === "%";
    var percentNotFound = index === -1;
    if (containsPercent && percentNotFound) {
      index = i;
    }
  }
  return index;
};
var legacyUnescape = function legacyUnescape(str) {
  if (typeof str != "string") {
    return "";
  }
  var encodingIndex = findEncodingIndex(str);
  var noEscapeChars = encodingIndex < 0;
  if (noEscapeChars) {
    return str;
  }
  var len = str.length;
  var arr = str.split("");
  var destPosition = 0;
  var unescapedStr = "";
  unescapedStr += str.substring(encodingIndex, 0);
  for (var i = encodingIndex; i < len; destPosition += 1) {
    var _unescapeChar = unescapeChar(arr, i, len),
      value = _unescapeChar.value,
      step = _unescapeChar.step;
    if (/[0-9]/.test(value)) {
      unescapedStr += String.fromCharCode.call(_this, value);
    } else {
      unescapedStr += value;
    }
    i += step;
  }
  return unescapedStr;
};
module.exports = legacyUnescape;