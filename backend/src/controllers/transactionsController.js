const { fetchTransactions } = require("../services/transactionsService");

exports.getTransactions = async (req, res) => {
  try {
    const result = await fetchTransactions(req.query);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};
