const fs = require("fs");
const path = require("path");
const readline = require("readline");

// Stream JSON line by line (memory-efficient)
exports.fetchTransactions = async (query) => {
  const filePath = path.join(__dirname, "..", "..", "data", "sales.json");
  const results = [];

  return new Promise((resolve, reject) => {
    const readStream = fs.createReadStream(filePath, { encoding: "utf8" });
    let buffer = "";
    readStream.on("data", (chunk) => {
      buffer += chunk;

      // Split by JSON objects
      let boundary = buffer.lastIndexOf("}");
      if (boundary !== -1) {
        const jsonChunk = buffer.slice(0, boundary + 1);
        buffer = buffer.slice(boundary + 1);

        const items = jsonChunk.split("},").map((str, idx, arr) => {
          if (idx !== arr.length - 1) str += "}";
          return str.trim();
        });

        items.forEach((item) => {
          if (!item) return;
          try {
            const obj = JSON.parse(item);
            if (!query || JSON.stringify(obj).toLowerCase().includes(query.toLowerCase())) {
              results.push(obj);
            }
          } catch (e) {
            // ignore parsing errors in chunk boundaries
          }
        });
      }
    });

    readStream.on("end", () => {
      resolve(results);
    });

    readStream.on("error", (err) => {
      reject(err);
    });
  });
};
