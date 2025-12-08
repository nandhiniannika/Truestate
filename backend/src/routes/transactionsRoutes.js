const express = require("express");
const router = express.Router();
const controller = require("../controllers/transactionsController");

router.get("/", controller.getTransactions);

module.exports = router;
