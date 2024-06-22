const { crawlPage } = require("./crawl.js");

// process object present at the global level along with the property arg is used to grab the cli arguments

async function main() {
  if (process.argv.length < 3) {
    console.log("no website provided");
    process.exit(1); // 1 is a pretty standard error code to indicate something is wrong
  }
  if (process.argv.length > 3) {
    console.log("too many command line args");
    process.exit(1); // 1 is a pretty standard error code to indicate something is wrong
  }

  const baseURL = process.argv[2];
  //   for (const arg of process.argv) {
  //     console.log(arg);
  //     /*
  //         1. The first argument is the interpretor --> /usr/bin/node
  //         2. name of our code/entrypoint file --> /home/abhinav/Desktop/Vanilla Js Projects/Web Crawler/Web-Crawler/main.jss
  //         3. Lastly the third argument is the one that we are actually passing in to our program
  //     */
  //   }

  console.log(`starting crawl of ${baseURL}`);
  const pages = await crawlPage(baseURL, baseURL, {});
  for (const page of Object.entries(pages)) {
    console.log(page);
  }
}

main();
