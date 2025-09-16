import React, { useState, useEffect } from 'react';
import { LogOut, Users, Package, AlertTriangle, Settings, FileText, BarChart3, Activity, Navigation, Menu, X } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const StaffDashboard = ({ onLogout }) => {
  const navigate = useNavigate();
  
  const handleNavigate = (path) => {
    console.log('Navigate to:', path);
   navigate(path);
  };

  const [stats, setStats] = useState({
    totalProducts: 0,
    noStockCount : 0,
    lowStockCount: 0,
  });

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    onLogout();
    handleNavigate('/');
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get('https://inventory-management-n2c8.onrender.com/staff/stats');
        setStats(res.data);
      } catch (err) {
        console.error('Failed to fetch stats:', err.message);
      }
    };

    fetchStats();
  }, []);

  const navigationItems = [
    { label: 'Products', icon: Package, href: null, onClick: () => handleNavigate('/staff/products') },
    { label: 'Settings', icon: Settings, href: '#', onClick: null },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Top Navbar */}
      <header className="bg-white/80 backdrop-blur-lg shadow-lg border-b border-gray-200">
        <div className="px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                InventoryPro Staff
              </h1>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-medium"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </header>

      <div className="flex">
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        {/* Sidebar */}
        <aside className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed md:relative md:translate-x-0 z-50 w-72 h-screen bg-white/90 backdrop-blur-lg shadow-2xl transition-transform duration-300 ease-in-out`}>
          <div className="p-6">
            <div className="flex items-center justify-between mb-8 md:hidden">
              <div className="flex items-center gap-2">
                <Navigation className="w-5 h-5 text-blue-600" />
                <span className="font-semibold text-gray-800">Navigation</span>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="space-y-2">
              {navigationItems.map((item, index) => (
                <div key={index}>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-xl transition-all duration-200 font-medium group"
                    >
                      <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      {item.label}
                    </a>
                  ) : (
                    <button
                      onClick={item.onClick}
                      className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-xl transition-all duration-200 font-medium group cursor-pointer"
                    >
                      <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      {item.label}
                    </button>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg">
                  <Activity className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                    Dashboard Overview
                  </h2>
                  <p className="text-gray-600 mt-1">Monitor your inventory system performance</p>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center justify-between mb-6">
                  <div className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl shadow-lg">
                    <Package className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-500 uppercase tracking-wider">Total Products</div>
                    <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent mt-2">
                      {stats.totalProducts}
                    </div>
                  </div>
                </div>
                <div className="h-2 bg-blue-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full w-3/4"></div>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center justify-between mb-6">
                  <div className="p-4 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl shadow-lg">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-500 uppercase tracking-wider">No Stock Items</div>
                    <div className="text-4xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent mt-2">
                      {stats.noStockCount}
                    </div>
                  </div>
                </div>
                <div className="h-2 bg-green-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full w-2/3"></div>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center justify-between mb-6">
                  <div className="p-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl shadow-lg">
                    <AlertTriangle className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-500 uppercase tracking-wider">Low Stock Alerts</div>
                    <div className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-orange-700 bg-clip-text text-transparent mt-2">
                      {stats.lowStockCount}
                    </div>
                  </div>
                </div>
                <div className="h-2 bg-orange-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full w-1/2"></div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {navigationItems.slice(0, 4).map((item, index) => (
                  <div key={index}>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="block p-6 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl hover:bg-white/80 transition-all duration-300 transform hover:-translate-y-1 group"
                      >
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                            <item.icon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <div className="font-semibold text-gray-800 group-hover:text-blue-700 transition-colors">
                              {item.label}
                            </div>
                            <div className="text-sm text-gray-500">Manage and configure</div>
                          </div>
                        </div>
                      </a>
                    ) : (
                      <button
                        onClick={item.onClick}
                        className="w-full text-left p-6 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl hover:bg-white/80 transition-all duration-300 transform hover:-translate-y-1 group"
                      >
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                            <item.icon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <div className="font-semibold text-gray-800 group-hover:text-blue-700 transition-colors">
                              {item.label}
                            </div>
                            <div className="text-sm text-gray-500">Manage and configure</div>
                          </div>
                        </div>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StaffDashboard;