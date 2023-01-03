# jsUnescape

> Unescape special characters encoded with [JavaScript escape sequences](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#Using_special_characters_in_strings)

## Install

```
npm install --save jsunescape
```

## Motivation
Since major browsers are planning to drop the [unescape](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/unescape) function in Javascript. This package replicates the original unescape functionality found in V8 to ensure backwards comptaibility.
    
## Usage

`jsunescape` supports:
* JavaScript escape sequences described in the unescape [MDN page](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar) such as %XX and %uXXXX (where X represents one hexadecimal digit) with the character that has the hexadecimal value XX/XXXX. If the escape sequence is not a valid escape sequence (for example, if % is followed by one or no hex digit), it is left as-is.




```js
const jsUnescape = require('jsunescape');

console.log(jsUnescape('%u0107'));
// 'ć'


console.log(jsUnescape('%E4%F6%FC'));
// 'äöü'

console.log(jsUnescape('%E4"'));
// 'ä'

console.log(jsUnescape(encodeURIComponent('räksmörgås')));
//'rÃ¤ksmÃ¶rgÃ¥s'
```

## License

MIT © [Catalina Espinoza](http://codedbycat.com)