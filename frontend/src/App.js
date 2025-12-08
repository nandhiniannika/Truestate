import { useEffect, useState } from "react";
import { fetchTransactions } from "./services/api";
import SearchBar from "./components/SearchBar";
import Filters from "./components/Filters";
import KPICards from "./components/KPICards";
import Table from "./components/Table";
import Pagination from "./components/Pagination";
import Loader from "./components/Loader";
import "./App.css";

function App() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    regions: "",
    gender: "",
    sortBy: "",   // "Customer Name" or "Date"
    order: "",    // "asc" or "desc"
    categories: "",
    paymentMethods: "",
    minAge: "",
    maxAge: "",
    startDate: "",
    endDate: "",
  });

  const [page, setPage] = useState(1);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const [kpi, setKpi] = useState({
    totalUnits: 0,
    totalAmount: 0,
    totalDiscount: 0,
  });

  const loadData = async () => {
    setLoading(true);

    const params = {
      q: search,
      regions: filters.regions,
      gender: filters.gender,           // singular
      categories: filters.categories,
      paymentMethods: filters.paymentMethods,
      minAge: filters.minAge,
      maxAge: filters.maxAge,
      startDate: filters.startDate,
      endDate: filters.endDate,

      // Sorting
      sortBy: filters.sortBy || "Transaction ID",
      order: filters.order || "asc",

      page,
      limit: 10,
    };

    try {
      const { data } = await fetchTransactions(params);
      setRows(data.rows);

      // KPI calculations
      let units = 0, amount = 0, discount = 0;
      data.rows.forEach((item) => {
        units += Number(item.Quantity);
        amount += Number(item["Total Amount"]);
        discount += Number(item["Discount Percentage"]);
      });
      setKpi({ totalUnits: units, totalAmount: amount, totalDiscount: discount });
    } catch (err) {
      console.error("Error fetching transactions:", err);
      setRows([]);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [search, filters, page]);

  return (
    <div className="app-container">
      {loading && <Loader />}

      <div className="header-section">
        <h2>Sales Management System</h2>
        <SearchBar value={search} onChange={setSearch} />
      </div>

      <Filters filters={filters} setFilters={setFilters} />
      <KPICards data={kpi} />
      <Table rows={rows} />
      <Pagination page={page} setPage={setPage} />
    </div>
  );
}

export default App;