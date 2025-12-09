const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    TransactionID: Number,
    Date: Date,
    CustomerID: String,
    CustomerName: String,
    PhoneNumber: Number,
    Gender: String,
    Age: Number,
    CustomerRegion: String,
    CustomerType: String,
    ProductID: String,
    ProductName: String,
    Brand: String,
    ProductCategory: String,
    Tags: [String],
    Quantity: Number,
    PricePerUnit: Number,
    DiscountPercentage: Number,
    TotalAmount: Number,
    FinalAmount: Number,
    PaymentMethod: String,
    OrderStatus: String,
    DeliveryType: String,
    StoreID: String,
    StoreLocation: String,
    SalespersonID: String,
    EmployeeName: String
}, { collection: "transactions" });

transactionSchema.index({ CustomerName: "text", PhoneNumber: "text" }); // Full-text search

module.exports = mongoose.model("Transaction", transactionSchema);
