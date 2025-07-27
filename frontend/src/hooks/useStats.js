// hooks/useStats.js
import { useEffect, useState } from "react";
import axios from "axios";

export default function useStats() {
  const [data, setData] = useState({
    categoryData: [],
    lowStockItems: [],
    recentUpdates: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAll() {
      try {
        const [cat, low, recent] = await Promise.all([
          axios.get("/api/stats/aggregateCategory"),
          axios.get("/api/stats/aggregateLowStock"),
          axios.get("/api/stats/recents")
        ]);
        setData({
          categoryData: cat.data,
          lowStockItems: low.data.items,
          recentUpdates: recent.data
        });
      } catch (err) {
        console.error("Error loading stats:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchAll();
  }, []);

  return { data, loading };
}
