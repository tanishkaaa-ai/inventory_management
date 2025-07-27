// LowStockItemsChart.jsx
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export default function LowStockItemsChart({ data }) {
  const barData = data.map(item => ({
    name: item.name || item._id,
    quantity: item.quantity
  }));

  return (
    <div className="p-4 bg-white rounded-2xl shadow-md">
      <h2 className="text-lg font-bold mb-2">Low Stock Items</h2>
      <BarChart width={500} height={250} data={barData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="quantity" fill="#FF8042" />
      </BarChart>
    </div>
  );
}
