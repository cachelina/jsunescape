const { describe, test, expect } = require("@jest/globals");

const legacyUnescape = require("../src/index");

describe("legacyUnescape", () => {

  test('it should unescape %u0107', () => {
    expect(legacyUnescape('%u0107')).toBe('ć');
  });

  test('it should unescape non-English characters', () => {
    // this handles the special case of 'räksmörgås'
    expect(legacyUnescape('r%C3%A4ksm%C3%B6rg%C3%A5s')).toBe('rÃ¤ksmÃ¶rgÃ¥s');
  });

  test('it should unescape %E4%F6%FC', () => {
    expect(legacyUnescape('%E4%F6%FC')).toBe('äöü');
  });

  test('it should unescape %E4', () => {
    expect(legacyUnescape('%E4')).toBe('ä');
  });


  test('it should not unescape when no escape sequences are present', () => {
    expect(legacyUnescape('abc123')).toBe('abc123');
  });

  test('it should not unescape when given an empty string', () => {
    expect(legacyUnescape('')).toBe('');
  });

  test('it should not unescape when given null', () => {
    expect(legacyUnescape(null)).toBe('');
  });

  test('it should not unescape when given undefined', () => {
    expect(legacyUnescape(undefined)).toBe('');
  });

  test('it should not unescape when given true', () => {
    expect(legacyUnescape(true)).toBe('');
  });

  test('it should not unescape when given false', () => {
    expect(legacyUnescape(false)).toBe('');
  });

  test('it should not unescape when given a number', () => {
    expect(legacyUnescape(11)).toBe('');
  });

  test('it should not unescape when given a symbol', () => {
    const sym = Symbol('chacha');
    expect(legacyUnescape(sym)).toBe('');
  });

  test('it should not unescape when given an array', () => {
    expect(legacyUnescape([])).toBe('');
  });

  test('it should not unescape when given a date', () => {
    expect(legacyUnescape(new Date())).toBe('');
  });

  test('it should not unescape when given an object', () => {
    expect(legacyUnescape({})).toBe('');
  });

  test('it should not unescape when given a set', () => {
    expect(legacyUnescape(new Set())).toBe('');
  });

  test('it should not unescape when given non-English characters', () => {
    expect(legacyUnescape("スを食")).toBe("スを食");
  });

});
