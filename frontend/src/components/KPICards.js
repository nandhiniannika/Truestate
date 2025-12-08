import "../styles/KPICards.css";

export default function KPICards({ data }) {
  return (
    <div className="kpi-container">
      <div className="kpi-card">
        <h4>Total Units Sold</h4>
        <p>{data.totalUnits}</p>
      </div>

      <div className="kpi-card">
        <h4>Total Amount</h4>
        <p>₹{data.totalAmount}</p>
      </div>

      <div className="kpi-card">
        <h4>Total Discount</h4>
        <p>₹{data.totalDiscount}</p>
      </div>
    </div>
  );
}
