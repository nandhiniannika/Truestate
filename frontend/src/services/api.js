import axios from "axios";

const API = axios.create({
  baseURL: "https://truestate-o8fx.onrender.com",
});

export const fetchTransactions = (params) =>
  API.get("/api/transactions", { params });
