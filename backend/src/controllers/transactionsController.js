const { streamTransactions } = require("../services/streamTransactions");
const { buildFilter } = require("../services/filters");

exports.getTransactions = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 50;

    const filterFn = buildFilter(req.query);
    let data = await streamTransactions(filterFn, page, limit);

    // Sorting
    const sortBy = req.query.sortBy || null;
    const order = req.query.order || "asc";

    if (sortBy) {
      data.sort((a, b) => {
        let x = a[sortBy];
        let y = b[sortBy];

        // Handle date
        if (sortBy.toLowerCase() === "date") {
          x = new Date(x).getTime();
          y = new Date(y).getTime();
        }

        // Handle numbers (Quantity, Total Amount, etc.)
        if (!isNaN(x) && !isNaN(y)) return order === "asc" ? x - y : y - x;

        // Handle strings
        if (typeof x === "string") return order === "asc" ? x.localeCompare(y) : y.localeCompare(x);

        return 0;
      });
    }

    res.json({
      page,
      limit,
      count: data.length,
      rows: data,
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Server error" });
  }
};
