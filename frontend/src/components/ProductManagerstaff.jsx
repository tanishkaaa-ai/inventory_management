
import React, { useEffect, useState } from 'react';
import { Package, Plus, Edit3, Trash2, TrendingDown, TrendingUp, AlertTriangle, Calendar, Barcode, Tag, Archive } from 'lucide-react';
import axios from 'axios';
const initialForm = {
  sku: '',
  name: '',
  barcode: '',
  category: '',
  stock: '',
  threshold: '',
  expiryDate: '',
};

export default function ProductManager() {
  const [products, setProducts] = useState([]);

  const [error, setError] = useState('');

  const [searchQuery, setSearchQuery] = useState('');
const [categoryFilter, setCategoryFilter] = useState('');

  // Fetch products on page load
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
       const res = await axios.get('https://inventory-management-n2c8.onrender.com/product/products');
       setProducts(res.data);
    } catch (err) {
      setError('Failed to fetch products');
    }
  };


  

 

  const handleStockUpdate = async (sku, action) => {
    const quantity = parseInt(prompt('Enter quantity:'), 10);
    if (!quantity || quantity <= 0) return;
    try {
    await axios.put('https://inventory-management-n2c8.onrender.com/product/updateStock', { sku, action, quantity },{ withCredentials: true });
      fetchProducts();
    } catch (err) {
      setError(err.response?.data || 'Stock update failed');
    }
  };

  const getStockStatus = (stock, threshold) => {
    if (stock === 0) return { color: 'text-red-600', bg: 'bg-red-50', icon: AlertTriangle, label: 'Out of Stock' };
    if (stock < threshold) return { color: 'text-orange-600', bg: 'bg-orange-50', icon: AlertTriangle, label: 'Low Stock' };
    return { color: 'text-green-600', bg: 'bg-green-50', icon: Package, label: 'In Stock' };
  };

  const isExpiringSoon = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30;
  };
  const filteredProducts = products.filter((p) => {
  const query = searchQuery.toLowerCase();
  const matchesSearch =
    p.name.toLowerCase().includes(query) ||
    p.sku.toLowerCase().includes(query) ||
    p.barcode.toLowerCase().includes(query);

  const matchesCategory = categoryFilter ? p.category === categoryFilter : true;

  return matchesSearch && matchesCategory;
});

// 📦 Unique categories for filter dropdown
const uniqueCategories = [...new Set(products.map((p) => p.category))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg">
              <Package className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Product Management
              </h1>
              <p className="text-gray-600 mt-1">Manage your inventory with ease</p>
            </div>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Products</p>
                  <p className="text-2xl font-bold text-gray-900">{products.length}</p>
                </div>
                <Archive className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Low Stock</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {products.filter(p => p.stock < p.threshold).length}
                  </p>
                </div>
                <AlertTriangle className="w-8 h-8 text-orange-600" />
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Out of Stock</p>
                  <p className="text-2xl font-bold text-red-600">
                    {products.filter(p => p.stock === 0).length}
                  </p>
                </div>
                <TrendingDown className="w-8 h-8 text-red-600" />
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Expiring Soon</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {products.filter(p => isExpiringSoon(p.expiryDate)).length}
                  </p>
                </div>
                <Calendar className="w-8 h-8 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-6">
  <input
    type="text"
    placeholder="Search by name, SKU, or barcode"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    className="flex-1 border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
  />

  <select
    value={categoryFilter}
    onChange={(e) => setCategoryFilter(e.target.value)}
    className="border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
  >
    <option value="">All Categories</option>
    {uniqueCategories.map((cat) => (
      <option key={cat} value={cat}>{cat}</option>
    ))}
  </select>
</div>
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <span className="text-red-700">{error}</span>
            <button 
              onClick={() => setError('')}
              className="ml-auto text-red-500 hover:text-red-700"
            >
              ×
            </button>
          </div>
        )}

        {/* Form */}
        


        {/* Product List */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
              <Archive className="w-6 h-6 text-blue-600" />
              Product Inventory
            </h2>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="p-12 text-center">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No products available</p>
              <p className="text-gray-400">Add your first product to get started</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <div className="flex justify-end gap-3 mt-4">
  <button
    onClick={() => window.open('https://inventory-management-n2c8.onrender.com/product/export/pdf', '_blank')}
    className="bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-700 transition-all text-sm font-medium"
  >
    Export PDF
  </button>
  <button
    onClick={() => window.open('https://inventory-management-n2c8.onrender.com/product/export/excel', '_blank')}
    className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 transition-all text-sm font-medium"
  >
    Export Excel
  </button>
</div>
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Details</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock Status</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry Date</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredProducts.map((p) => {
                    const stockStatus = getStockStatus(p.stock, p.threshold);
                    const isExpiring = isExpiringSoon(p.expiryDate);
                    
                    return (
                      <tr key={p._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 rounded-lg">
                              <Package className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">{p.name}</div>
                              <div className="text-sm text-gray-500">SKU: {p.sku}</div>
                              <div className="text-xs text-gray-400">Barcode: {p.barcode}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            {p.category}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg ${stockStatus.bg}`}>
                            <stockStatus.icon className={`w-4 h-4 ${stockStatus.color}`} />
                            <div>
                              <div className={`font-medium ${stockStatus.color}`}>
                                {p.stock} units
                              </div>
                              <div className="text-xs text-gray-500">
                                Threshold: {p.threshold}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className={`flex items-center gap-2 ${isExpiring ? 'text-red-600' : 'text-gray-600'}`}>
                            <Calendar className="w-4 h-4" />
                            <div>
                              <div className="font-medium">{p.expiryDate?.split('T')[0]}</div>
                              {isExpiring && (
                                <div className="text-xs text-red-500 font-medium">Expiring Soon!</div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            
                            
                            <button
                              onClick={() => handleStockUpdate(p.sku, 'sale')}
                              className="px-3 py-1 text-xs font-medium text-orange-700 bg-orange-100 hover:bg-orange-200 rounded-lg transition-colors flex items-center gap-1"
                              title="Record Sale"
                            >
                              <TrendingDown className="w-3 h-3" />
                              Sale
                            </button>
                            <button
                              onClick={() => handleStockUpdate(p.sku, 'restock')}
                              className="px-3 py-1 text-xs font-medium text-green-700 bg-green-100 hover:bg-green-200 rounded-lg transition-colors flex items-center gap-1"
                              title="Restock"
                            >
                              <TrendingUp className="w-3 h-3" />
                              Restock
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}