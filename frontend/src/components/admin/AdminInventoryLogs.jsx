import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminInventoryLogs = () => {
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [actionFilter, setActionFilter] = useState('');
  const [userFilter, setUserFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const res = await axios.get('/product/logs', { withCredentials: true });
      setLogs(res.data.logs || []);
      setFilteredLogs(res.data.logs || []);
    } catch (err) {
      console.error('Error fetching inventory logs:', err);
    }
  };

  // Apply filters whenever inputs change
  useEffect(() => {
    let filtered = [...logs];

    if (actionFilter) {
      filtered = filtered.filter(log => log.action === actionFilter);
    }

    if (userFilter) {
      filtered = filtered.filter(log =>
        log.userId?.name?.toLowerCase().includes(userFilter.toLowerCase())
      );
    }

    if (dateFilter) {
      filtered = filtered.filter(log =>
        new Date(log.timestamp).toISOString().split('T')[0] === dateFilter
      );
    }

    setFilteredLogs(filtered);
  }, [actionFilter, userFilter, dateFilter, logs]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Inventory Logs</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <select
          value={actionFilter}
          onChange={e => setActionFilter(e.target.value)}
          className="p-2 border rounded bg-white shadow-sm"
        >
          <option value="">All Actions</option>
          <option value="add">Add</option>
          <option value="remove">Remove</option>
          <option value="update">Update</option>
        </select>

        <input
          type="text"
          placeholder="Filter by user name"
          value={userFilter}
          onChange={e => setUserFilter(e.target.value)}
          className="p-2 border rounded bg-white shadow-sm"
        />

        <input
          type="date"
          value={dateFilter}
          onChange={e => setDateFilter(e.target.value)}
          className="p-2 border rounded bg-white shadow-sm"
        />
      </div>

      {/* Logs Table */}
      <div className="overflow-x-auto bg-white shadow rounded">
        <table className="min-w-full table-auto border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 border text-left">Product</th>
              <th className="px-4 py-3 border text-left">Action</th>
              <th className="px-4 py-3 border text-left">Quantity</th>
              <th className="px-4 py-3 border text-left">User</th>
              <th className="px-4 py-3 border text-left">Date</th>
              <th className="px-4 py-3 border text-left">Remarks</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.length > 0 ? (
              filteredLogs.map((log, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{log.product?.name || 'N/A'}</td>
                  <td className="px-4 py-2 border capitalize">{log.action}</td>
                  <td className="px-4 py-2 border">{log.quantity}</td>
                  <td className="px-4 py-2 border">{log.userId?.name || 'N/A'}</td>
                  <td className="px-4 py-2 border">
                    {new Date(log.timestamp).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 border">{log.remarks || '-'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No logs to display.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminInventoryLogs;
