const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");

exports.streamTransactions = (filterFn, page = 1, limit = 50) => {
  return new Promise((resolve, reject) => {
    const results = [];
    const filePath = path.join(__dirname, "..", "..", "data", "truestate_assignment_dataset.csv");

    let matched = 0;
    let sent = 0;

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => {
        if (!filterFn(row)) return;

        matched++;

        if (matched > (page - 1) * limit && sent < limit) {
          results.push(row);
          sent++;
        }
      })
      .on("end", () => resolve(results))
      .on("error", (err) => reject(err));
  });
};
