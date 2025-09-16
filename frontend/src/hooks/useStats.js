import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useStats() {
  return useQuery(["dashboardStats"], async () => {
    const res = await axios.get("https://inventory-management-n2c8.onrender.com/api/stats/dashboard-stats"); // change if needed
    return res.data;
  });
}
