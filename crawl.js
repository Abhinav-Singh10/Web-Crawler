//stub function to see what's going in and what's coming out
const { JSDOM } = require("jsdom");

async function crawlPage(currentURl) {
  console.log(`actively crawling ${currentURl}`);

  try {
    const resp = await fetch(currentURl);

    if (resp.status > 399) {
      console.log(
        `Error in fetch with status code:  ${resp.status} on page: ${currentURl}`
      );
      return;
    }

    const contentType = resp.headers.get("content-type");

    if (!contentType.includes("text/html")) {
      console.log(
        `non html response, content type:${contentType} on page ${currentURl} `
      );
      return;
    }

    console.log(await resp.text()); // expecting the response body to be formatted as HTML
  } catch (error) {
    console.log(`Error in fetch: ${error.message}, on page: ${currentURl}`);
  }
}

function getURLsFromHTML(htmlBody, baseURL) {
  const urls = [];
  const dom = new JSDOM(htmlBody);
  const linkElements = dom.window.document.querySelectorAll("a");
  for (const linkElement of linkElements) {
    if (linkElement.href.slice(0, 1) === "/") {
      //relative
      try {
        const urlObj = new URL(`${baseURL}${linkElement.href}`);
        urls.push(urlObj.href);
      } catch (error) {
        console.log(`Error with relative url: ${error.message}`);
      }
    } else {
      //absoutle
      try {
        const urlObj = new URL(linkElement.href);
        urls.push(urlObj.href);
      } catch (error) {
        console.log(`Error with absolute url: ${error.message}`);
      }
    }
  }
  return urls;
}

function normalizeUrl(urlString) {
  const urlObj = new URL(urlString);

  const hostPath = `${urlObj.hostname}${urlObj.pathname}`;
  if (hostPath.length > 0 && hostPath.slice(-1) === "/") {
    return hostPath.slice(0, -1);
  }
  return hostPath;
}

module.exports = {
  normalizeUrl,
  getURLsFromHTML,
  crawlPage,
};
