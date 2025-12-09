const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");

const transactionsRoutes = require("./routes/transactionsRoutes");

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/transactions", transactionsRoutes);

// Hardcoded MongoDB connection string
const MONGO_URI = "mongodb+srv://nandhiniannikalla322005_db_user:Nandhini%40322005@truestatecluster.epy7obj.mongodb.net/truestate?retryWrites=true&w=majority";

// MongoDB connection
mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
