import "../styles/Table.css";

export default function Table({ rows }) {
  return (
    <table className="data-table">
      <thead>
        <tr>
          <th>Transaction ID</th>
          <th>Date</th>
          <th>Customer ID</th>
          <th>Customer name</th>
          <th>Phone Number</th>
          <th>Gender</th>
          <th>Age</th>
          <th>Product Category</th>
          <th>Quantity</th>
        </tr>
      </thead>

      <tbody>
        {rows.map((item, idx) => (
          <tr key={idx}>
            <td>{item["Transaction ID"]}</td>
            <td>{item["Date"]}</td>
            <td>{item["Customer ID"]}</td>
            <td>{item["Customer Name"]}</td>
            <td>{item["Phone Number"]}</td>
            <td>{item["Gender"]}</td>
            <td>{item["Age"]}</td>
            <td>{item["Product Category"]}</td>
            <td>{item["Quantity"]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
