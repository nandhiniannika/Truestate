import React, { useState, useEffect } from "react";
import "../styles/filters.css";

export default function Filters({ filters, setFilters }) {
  const handleChange = (key, value) => setFilters({ ...filters, [key]: value });

  // --- Dropdown states ---
  const [showAge, setShowAge] = useState(false);
  const [showDate, setShowDate] = useState(false);

  // --- Temporary states for inputs ---
  const [tempMinAge, setTempMinAge] = useState(filters.minAge || "");
  const [tempMaxAge, setTempMaxAge] = useState(filters.maxAge || "");
  const [ageError, setAgeError] = useState("");

  const [tempStartDate, setTempStartDate] = useState(filters.startDate || "");
  const [tempEndDate, setTempEndDate] = useState(filters.endDate || "");
  const [dateError, setDateError] = useState("");

  // --- Age validation ---
  const validateAge = () => {
    if (!tempMinAge && !tempMaxAge) {
      setAgeError("Enter at least one age");
      return false;
    }
    if (tempMinAge && tempMinAge < 0) { setAgeError("Min Age cannot be negative"); return false; }
    if (tempMaxAge && tempMaxAge < 0) { setAgeError("Max Age cannot be negative"); return false; }
    if (tempMinAge && tempMaxAge && tempMinAge > tempMaxAge) { 
      setAgeError("Min Age cannot be greater than Max Age"); 
      return false; 
    }
    if (tempMinAge && tempMinAge > 120) { setAgeError("Min Age cannot exceed 120"); return false; }
    if (tempMaxAge && tempMaxAge > 120) { setAgeError("Max Age cannot exceed 120"); return false; }

    setAgeError(""); 
    return true;
  };

  const applyAge = () => {
    if (!validateAge()) return;

    const newFilters = { ...filters };
    if (tempMinAge) newFilters.minAge = tempMinAge; else delete newFilters.minAge;
    if (tempMaxAge) newFilters.maxAge = tempMaxAge; else delete newFilters.maxAge;

    setFilters(newFilters);
    setShowAge(false);
  };

  // --- Date validation ---
  const validateDate = () => {
    if (!tempStartDate && !tempEndDate) {
      setDateError("Enter at least one date");
      return false;
    }
    if (tempStartDate && tempEndDate && new Date(tempStartDate) > new Date(tempEndDate)) {
      setDateError("Start Date cannot be greater than End Date");
      return false;
    }

    setDateError("");
    return true;
  };

  const applyDate = () => {
    if (!validateDate()) return;

    const newFilters = { ...filters };
    if (tempStartDate) newFilters.startDate = tempStartDate; else delete newFilters.startDate;
    if (tempEndDate) newFilters.endDate = tempEndDate; else delete newFilters.endDate;

    setFilters(newFilters);
    setShowDate(false);
  };

  // --- Sort ---
  const [sortLabel, setSortLabel] = useState("Sort");

  const handleSortChange = (sortOption) => {
    let label = "Sort";
    switch (sortOption) {
      case "asc":
        setFilters({ ...filters, sortBy: "Customer Name", order: "asc" });
        label = "Customer Name (A–Z)";
        break;
      case "desc":
        setFilters({ ...filters, sortBy: "Customer Name", order: "desc" });
        label = "Customer Name (Z–A)";
        break;
      case "date-newest":
        setFilters({ ...filters, sortBy: "Date", order: "desc" });
        label = "Date (Newest First)";
        break;
      case "date-oldest":
        setFilters({ ...filters, sortBy: "Date", order: "asc" });
        label = "Date (Oldest First)";
        break;
      case "quantity-low":
        setFilters({ ...filters, sortBy: "Quantity", order: "asc" });
        label = "Quantity (Low → High)";
        break;
      case "quantity-high":
        setFilters({ ...filters, sortBy: "Quantity", order: "desc" });
        label = "Quantity (High → Low)";
        break;
      default:
        setFilters({ ...filters, sortBy: null, order: "asc" });
    }
    setSortLabel(label);
  };

  // Update sort label if filters change from outside
  useEffect(() => {
    if (filters.sortBy === "Customer Name") {
      setSortLabel(filters.order === "asc" ? "Customer Name (A–Z)" : "Customer Name (Z–A)");
    } else if (filters.sortBy === "Date") {
      setSortLabel(filters.order === "asc" ? "Date (Oldest First)" : "Date (Newest First)");
    } else if (filters.sortBy === "Quantity") {
      setSortLabel(filters.order === "asc" ? "Quantity (Low → High)" : "Quantity (High → Low)");
    } else {
      setSortLabel("Sort");
    }
  }, [filters.sortBy, filters.order]);

  return (
    <div className="filters-container">
      {/* Customer Region */}
      <select value={filters.regions || ""} onChange={(e) => handleChange("regions", e.target.value)}>
        <option value="">Customer Region</option>
        <option value="north">North</option>
        <option value="south">South</option>
        <option value="east">East</option>
        <option value="west">West</option>
      </select>

      {/* Gender */}
      <select value={filters.gender || ""} onChange={(e) => handleChange("gender", e.target.value)}>
        <option value="">Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>

      {/* Age Dropdown */}
      <div className="dropdown-container">
        <button type="button" className="dropdown-button" onClick={() => setShowAge(!showAge)}>
          Age Range {filters.minAge || filters.maxAge ? `(${filters.minAge || ""}–${filters.maxAge || ""})` : ""}
        </button>
        {showAge && (
          <div className="dropdown-content">
            <input type="number" placeholder="Min Age" value={tempMinAge} onChange={(e) => setTempMinAge(e.target.value)} />
            <input type="number" placeholder="Max Age" value={tempMaxAge} onChange={(e) => setTempMaxAge(e.target.value)} />
            {ageError && <p className="error">{ageError}</p>}
            <button type="button" onClick={applyAge}>Apply</button>
          </div>
        )}
      </div>

      {/* Product Category */}
      <select value={filters.categories || ""} onChange={(e) => handleChange("categories", e.target.value)}>
        <option value="">Product Category</option>
        <option value="Clothing">Clothing</option>
        <option value="Electronics">Electronics</option>
        <option value="Beauty">Beauty</option>
        <option value="Grocery">Grocery</option>
      </select>

      {/* Payment Method */}
      <select value={filters.paymentMethods || ""} onChange={(e) => handleChange("paymentMethods", e.target.value)}>
        <option value="">Payment Method</option>
        <option value="cash">Cash</option>
        <option value="upi">UPI</option>
        <option value="debit card">Debit Card</option>
        <option value="credit card">Credit Card</option>
      </select>

      {/* Date Dropdown */}
      <div className="dropdown-container">
        <button type="button" className="dropdown-button" onClick={() => setShowDate(!showDate)}>
          Date {filters.startDate || filters.endDate ? `(${filters.startDate || ""}–${filters.endDate || ""})` : ""}
        </button>
        {showDate && (
          <div className="dropdown-content">
            <input type="date" value={tempStartDate} onChange={(e) => setTempStartDate(e.target.value)} />
            <input type="date" value={tempEndDate} onChange={(e) => setTempEndDate(e.target.value)} />
            {dateError && <p className="error">{dateError}</p>}
            <button type="button" onClick={applyDate}>Apply</button>
          </div>
        )}
      </div>

     {/* Sort */}
<select
  value={
    filters.sortBy === "Customer Name" ? (filters.order === "asc" ? "asc" : "desc") :
    filters.sortBy === "Date" ? (filters.order === "desc" ? "date-newest" : "date-oldest") :
    filters.sortBy === "Quantity" ? (filters.order === "asc" ? "quantity-low" : "quantity-high") :
    ""
  }
  onChange={(e) => handleSortChange(e.target.value)}
>
  <option value="">Sort</option>
  <option value="asc">Customer Name (A–Z)</option>
  <option value="desc">Customer Name (Z–A)</option>
  <option value="date-newest">Date (Newest First)</option>
  <option value="date-oldest">Date (Oldest First)</option>
  <option value="quantity-low">Quantity (Low → High)</option>
  <option value="quantity-high">Quantity (High → Low)</option>
</select>

    </div>
  );
}
