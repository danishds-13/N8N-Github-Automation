// index.js
const fs = require("fs");
const https = require("https");

const LOG_FILE = "app.log";
const URLS = [
  "https://jsonplaceholder.typicode.com/posts/1",
  "https://jsonplaceholder.typicode.com/posts/2",
  "https://jsonplaceholder.typicode.com/posts/3",
];

// ---- Logger ----
function log(message) {
  const entry = `[${new Date().toISOString()}] ${message}\n`;
  fs.appendFileSync(LOG_FILE, entry);
  console.log(entry.trim());
}

// ---- HTTP Request with Retry ----
function fetchWithRetry(url, retries = 3) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        let data = "";

        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          if (res.statusCode >= 400) {
            return retries
              ? retry(url, retries, resolve, reject)
              : reject(`Failed: ${url}`);
          }
          resolve(JSON.parse(data));
        });
      })
      .on("error", () => {
        return retries
          ? retry(url, retries, resolve, reject)
          : reject(`Network error: ${url}`);
      });
  });
}

function retry(url, retries, resolve, reject) {
  log(`Retrying ${url}... (${retries})`);
  setTimeout(() => {
    fetchWithRetry(url, retries - 1).then(resolve).catch(reject);
  }, 1000);
}

// ---- Main Logic ----
async function main() {
  log("App started");

  try {
    const results = await Promise.all(
      URLS.map((url) => fetchWithRetry(url))
    );

    results.forEach((data, i) => {
      log(`Fetched post ${i + 1}: ${data.title}`);
    });
  } catch (err) {
    log(`ERROR: ${err}`);
  }
}

// ---- Graceful Shutdown ----
process.on("SIGINT", () => {
  log("App shutting down...");
  process.exit(0);
});

main();
