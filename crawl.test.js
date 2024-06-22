// jest automatically looks for files that end in test.js
const { normalizeUrl } = require("./crawl.js");
const { test, expect } = require("@jest/globals");

test("normalizeURL strip protocol", () => {
  const input = "https://reddit.com/r/DotA2/";
  const actual = normalizeUrl(input);
  const expected = "reddit.com/r/DotA2";
  expect(actual).toEqual(expected);
});

test("normalizeURL strip trailing slash", () => {
  const input = "https://reddit.com/r/DotA2/";
  const actual = normalizeUrl(input);
  const expected = "reddit.com/r/DotA2";
  expect(actual).toEqual(expected);
});

test("normalizeURL capitals", () => {
  const input = "https://REDDIT.com/r/DotA2/";
  const actual = normalizeUrl(input);
  const expected = "reddit.com/r/DotA2";
  expect(actual).toEqual(expected);
});

test("normalizeURL strip http", () => {
  const input = "https://REDDIT.com/r/DotA2/";
  const actual = normalizeUrl(input);
  const expected = "reddit.com/r/DotA2";
  expect(actual).toEqual(expected);
});
