import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useStats() {
  return useQuery(["dashboardStats"], async () => {
    const res = await axios.get("http://localhost:5000/api/stats/dashboard-stats"); // change if needed
    return res.data;
  });
}
