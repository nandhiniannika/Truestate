import React from "react";
import "../styles/sort.css";

function SortDropdown({ sort, setSort }) {
  return (
    <select
      className="sort-dropdown"
      value={sort}
      onChange={(e) => setSort(e.target.value)}
    >
      <option value="date_desc">Date (Newest First)</option>
      <option value="quantity">Quantity</option>
      <option value="name_asc">Customer Name (A–Z)</option>
    </select>
  );
}

export default SortDropdown;
