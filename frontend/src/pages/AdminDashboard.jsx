import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = ({ onLogout }) => {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalProducts: 0,
    staffCount: 0,
    lowStockCount: 0,
  });

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get('/admin/stats');
        setStats(res.data);
      } catch (err) {
        console.error('Failed to fetch stats:', err.message);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Top Navbar */}
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">InventoryPro Admin</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </header>

      {/* Sidebar + Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow p-6 hidden md:block">
          <nav className="space-y-4">
            <a href="#" className="block text-gray-700 hover:text-blue-600 font-medium">
              Manage Staff
            </a>
            <a
              onClick={() => navigate('/admin/products')}
              className="cursor-pointer block text-gray-700 hover:text-blue-600 font-medium"
            >
              Products
            </a>
            <a href="#" className="block text-gray-700 hover:text-blue-600 font-medium">
              Settings
            </a>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Dashboard Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow border-l-4 border-blue-500">
              <h3 className="text-lg font-semibold text-gray-700">Total Products</h3>
              <p className="text-3xl font-bold text-blue-600 mt-2">{stats.totalProducts}</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow border-l-4 border-green-500">
              <h3 className="text-lg font-semibold text-gray-700">Staff Users</h3>
              <p className="text-3xl font-bold text-green-600 mt-2">{stats.staffCount}</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow border-l-4 border-yellow-500">
              <h3 className="text-lg font-semibold text-gray-700">Low Stock Alerts</h3>
              <p className="text-3xl font-bold text-yellow-600 mt-2">{stats.lowStockCount}</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
