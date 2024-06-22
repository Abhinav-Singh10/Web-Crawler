// jest automatically looks for files that end in test.js
const { normalizeUrl } = require("./crawl.js");
const { test, expect } = require("@jest/globals");
const { getURLsFromHTML } = require("./crawl.js");

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

test("getURLsFromHTML absolute", () => {
  const inputHTMLBody = `
  <html>
        <body>
            <a href="https://reddit.com/r/DotA2/path/">
                Reddit r/DOTA2
            </a>
        </body>
  </html>
  `;
  const inputBaseURL = "https://reddit.com/r/DotA2/path/";
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = ["https://reddit.com/r/DotA2/path/"];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML relative", () => {
  const inputHTMLBody = `
  <html>
        <body>
            <a href="/path/">
                Reddit r/DOTA2
            </a>
        </body>
  </html>
  `;
  const inputBaseURL = "https://reddit.com/r/DotA2";
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = ["https://reddit.com/r/DotA2/path/"];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML relative", () => {
  const inputHTMLBody = `
    <html>
          <body>
              <a href="/path/">
                  Reddit r/DOTA2
              </a>
          </body>
    </html>
    `;
  const inputBaseURL = "https://reddit.com/r/DotA2";
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = ["https://reddit.com/r/DotA2/path/"];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML invalid", () => {
  const inputHTMLBody = `
    <html>
          <body>
              <a href="invalid">
                  Reddit r/DOTA2
              </a>
          </body>
    </html>
    `;
  const inputBaseURL = "https://reddit.com/r/DotA2";
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = [];
  expect(actual).toEqual(expected);
});
