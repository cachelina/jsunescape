const { describe, test, expect } = require("@jest/globals");

const jsUnescape = require("../src/index");

describe("jsUnescape", () => {

  test('it should unescape %u0107', () => {
    expect(jsUnescape('%u0107')).toBe('ć');
  });

  test('it should unescape non-English characters', () => {
    // this handles the special case of 'räksmörgås'
    expect(jsUnescape('r%C3%A4ksm%C3%B6rg%C3%A5s')).toBe('rÃ¤ksmÃ¶rgÃ¥s');
  });

  test('it should unescape %E4%F6%FC', () => {
    expect(jsUnescape('%E4%F6%FC')).toBe('äöü');
  });

  test('it should unescape %E4', () => {
    expect(jsUnescape('%E4')).toBe('ä');
  });


  test('it should not unescape when no escape sequences are present', () => {
    expect(jsUnescape('abc123')).toBe('abc123');
  });

  test('it should not unescape when given an empty string', () => {
    expect(jsUnescape('')).toBe('');
  });

  test('it should not unescape when given null', () => {
    expect(jsUnescape(null)).toBe('');
  });

  test('it should not unescape when given undefined', () => {
    expect(jsUnescape(undefined)).toBe('');
  });

  test('it should not unescape when given true', () => {
    expect(jsUnescape(true)).toBe('');
  });

  test('it should not unescape when given false', () => {
    expect(jsUnescape(false)).toBe('');
  });

  test('it should not unescape when given a number', () => {
    expect(jsUnescape(11)).toBe('');
  });

  test('it should not unescape when given a symbol', () => {
    const sym = Symbol('chacha');
    expect(jsUnescape(sym)).toBe('');
  });

  test('it should not unescape when given an array', () => {
    expect(jsUnescape([])).toBe('');
  });

  test('it should not unescape when given a date', () => {
    expect(jsUnescape(new Date())).toBe('');
  });

  test('it should not unescape when given an object', () => {
    expect(jsUnescape({})).toBe('');
  });

  test('it should not unescape when given a set', () => {
    expect(jsUnescape(new Set())).toBe('');
  });

  test('it should not unescape when given non-English characters', () => {
    expect(jsUnescape("スを食")).toBe("スを食");
  });

});
