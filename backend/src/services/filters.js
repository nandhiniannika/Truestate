exports.buildFilter = (query) => {
  const q = query.q?.toLowerCase();

  const matchList = (value, list) => {
    if (!list) return true;
    return list.split(",").map(s => s.trim().toLowerCase()).includes(value);
  };

  const minAge = query.minAge ? Number(query.minAge) : null;
  const maxAge = query.maxAge ? Number(query.maxAge) : null;

  const startDate = query.startDate ? new Date(query.startDate) : null;
  const endDate = query.endDate ? new Date(query.endDate) : null;

  return (item) => {
    const name = item["Customer Name"]?.toLowerCase();
    const phone = item["Phone Number"]?.toLowerCase();

    if (q && !name.includes(q) && !phone.includes(q)) return false;

    if (!matchList(item["Customer Region"]?.toLowerCase(), query.regions)) return false;

    // ✅ Corrected gender
    if (!matchList(item["Gender"]?.toLowerCase(), query.gender)) return false;

    if (!matchList(item["Product Category"]?.toLowerCase(), query.categories)) return false;
    if (!matchList(item["Payment Method"]?.toLowerCase(), query.paymentMethods)) return false;
    if (!matchList(item["Delivery Type"]?.toLowerCase(), query.delivery)) return false;
    if (!matchList(item["Order Status"]?.toLowerCase(), query.status)) return false;
    if (!matchList(item["Tags"]?.toLowerCase(), query.tags)) return false;

    if (minAge && item.Age < minAge) return false;
    if (maxAge && item.Age > maxAge) return false;

    // Flexible date filter: allow either start or end
    const itemDate = new Date(item["Date"]).getTime();
    if (startDate && itemDate < startDate.getTime()) return false;
    if (endDate && itemDate > endDate.getTime()) return false;

    return true;
  };
};
