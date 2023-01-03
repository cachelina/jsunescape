# legacy-unescape

> Unescape special characters encoded with [JavaScript escape sequences](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#Using_special_characters_in_strings)

## Install

```
npm install --save legacy-unescape
```

## Motivation
Since major browsers are planning to drop the [unescape](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/unescape) function in Javascript. This package replicates the original unescape functionality found in V8 to ensure backwards comptaibility.
    
## Usage

`legacy-unescape` supports:
* JavaScript escape sequences described in the unescape [MDN page](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#Using_special_characters_in_strings) such as %XX and %uXXXX (where X represents one hexadecimal digit) with the character that has the hexadecimal value XX/XXXX. If the escape sequence is not a valid escape sequence (for example, if % is followed by one or no hex digit), it is left as-is.




```js
const legacyUnescape = require('legacy-unescape');

console.log(legacyUnescape('%u0107'));
// 'ć'


console.log(legacyUnescape('%E4%F6%FC'));
// 'äöü'

console.log(legacyUnescape('%E4"'));
// 'ä'

console.log(legacyUnescape('räksmörgås'));
//
```

## License

MIT © [Catalina Espinoza](http://codedbycat.com)