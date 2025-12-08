import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000/api",
});

export const fetchTransactions = (params) =>
  API.get("/transactions", { params });
