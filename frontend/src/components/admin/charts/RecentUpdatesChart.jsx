// RecentUpdatesChart.jsx
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

function groupByDate(items) {
  const map = {};
  items.forEach(item => {
    const date = new Date(item.updatedAt).toLocaleDateString("en-IN");
    map[date] = (map[date] || 0) + 1;
  });

  return Object.keys(map).map(date => ({ date, updates: map[date] }));
}

export default function RecentUpdatesChart({ data }) {
  const grouped = groupByDate(data);

  return (
    <div className="p-4 bg-white rounded-2xl shadow-md">
      <h2 className="text-lg font-bold mb-2">Recent Updates (Last 7 Days)</h2>
      <LineChart width={500} height={250} data={grouped}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Line type="monotone" dataKey="updates" stroke="#8884d8" strokeWidth={2} />
      </LineChart>
    </div>
  );
}
