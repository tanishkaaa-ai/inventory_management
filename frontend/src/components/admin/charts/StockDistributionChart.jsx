import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function StockDistributionChart({ data }) {
  return (
    <div className="p-4 bg-white rounded-2xl shadow-md">
      <h2 className="text-lg font-bold mb-2">Stock by Category</h2>
      <PieChart width={400} height={250}>
        <Pie
          data={data} // ✅ use directly
          cx="50%"
          cy="50%"
          outerRadius={90}
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          dataKey="value"
          nameKey="name" // ✅ this is important!
        >
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}
