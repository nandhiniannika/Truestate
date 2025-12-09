const Transaction = require("../models/Transaction");

exports.fetchTransactions = async (query) => {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const skip = (page - 1) * limit;

    const search = query.search || "";
    const sortField = query.sortBy || "Date";
    const sortOrder = query.order === "asc" ? 1 : -1;

    // Filters
    const filters = {};

    if (query.gender)
        filters.Gender = { $in: query.gender.split(",").map(g => new RegExp(`^${g.trim()}$`, "i")) };

    if (query.productCategory)
        filters.ProductCategory = { $in: query.productCategory.split(",").map(c => new RegExp(`^${c.trim()}$`, "i")) };

    if (query.customerRegion)
        filters.CustomerRegion = { $in: query.customerRegion.split(",").map(r => new RegExp(`^${r.trim()}$`, "i")) };

    if (query.paymentMethod)
        filters.PaymentMethod = { $in: query.paymentMethod.split(",").map(p => new RegExp(`^${p.trim()}$`, "i")) };

    if (query.tags)
        filters.Tags = { $in: query.tags.split(",").map(t => new RegExp(`^${t.trim()}$`, "i")) };

    if (query.ageMin || query.ageMax) filters.Age = {};
    if (query.ageMin) filters.Age.$gte = parseInt(query.ageMin);
    if (query.ageMax) filters.Age.$lte = parseInt(query.ageMax);

    if (query.dateFrom || query.dateTo) filters.Date = {};
    if (query.dateFrom) filters.Date.$gte = new Date(query.dateFrom);
    if (query.dateTo) filters.Date.$lte = new Date(query.dateTo);

    // Search
    let searchQuery = {};
    if (search) {
        searchQuery = { $text: { $search: search } };
    }

    const finalQuery = { ...filters, ...searchQuery };

    const total = await Transaction.countDocuments(finalQuery);
    const transactions = await Transaction.find(finalQuery)
        .sort({ [sortField]: sortOrder })
        .skip(skip)
        .limit(limit);

    return {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
        data: transactions
    };
};
