const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const transactionRoutes = require("./routes/transactionsRoutes");

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// API
app.use("/api/transactions", transactionRoutes);

app.get("/", (_, res) => res.send("Backend running successfully 🚀"));

const PORT = 4000;
app.listen(PORT, () =>
  console.log(`✔ Server running on http://localhost:${PORT}`)
);
