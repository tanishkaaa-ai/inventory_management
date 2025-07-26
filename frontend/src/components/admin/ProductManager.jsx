import React, { useEffect, useState } from 'react';
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
  const [formData, setFormData] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');

  // Fetch products on page load
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('/product'); // ✅ Backend: GET /product
      setProducts(res.data);
    } catch (err) {
      setError('Failed to fetch products');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`/product/update/${editingId}`, formData); // ✅ PUT /product/update/:id
      } else {
        await axios.post('/product/create', formData); // ✅ POST /product/create
      }
      setFormData(initialForm);
      setEditingId(null);
      fetchProducts();
    } catch (err) {
      setError(err.response?.data || 'Error submitting form');
    }
  };

  const handleEdit = (product) => {
    setFormData(product);
    setEditingId(product._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/product/delete/${id}`); // ✅ DELETE /product/delete/:id
      fetchProducts();
    } catch (err) {
      setError('Failed to delete product');
    }
  };

  const handleStockUpdate = async (sku, action) => {
    const quantity = parseInt(prompt('Enter quantity:'), 10);
    if (!quantity || quantity <= 0) return;
    try {
      await axios.put('/product/updateStock', { sku, action, quantity }); // ✅ PUT /product/updateStock
      fetchProducts();
    } catch (err) {
      setError(err.response?.data || 'Stock update failed');
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Product Management</h1>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 mb-8">
        {Object.keys(initialForm).map((key) => (
          <input
            key={key}
            type={key === 'expiryDate' ? 'date' : 'text'}
            name={key}
            placeholder={key}
            value={formData[key]}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
        ))}
        <button
          type="submit"
          className="col-span-2 bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          {editingId ? 'Update Product' : 'Create Product'}
        </button>
      </form>

      <h2 className="text-2xl font-semibold mb-2">Product List</h2>

      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <table className="w-full border text-sm">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2">SKU</th>
              <th className="p-2">Name</th>
              <th className="p-2">Category</th>
              <th className="p-2">Stock</th>
              <th className="p-2">Threshold</th>
              <th className="p-2">Expiry</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id} className="border-t hover:bg-gray-50">
                <td className="p-2">{p.sku}</td>
                <td className="p-2">{p.name}</td>
                <td className="p-2">{p.category}</td>
                <td className={`p-2 ${p.stock < p.threshold ? 'text-red-600' : ''}`}>
                  {p.stock}
                </td>
                <td className="p-2">{p.threshold}</td>
                <td className="p-2">{p.expiryDate?.split('T')[0]}</td>
                <td className="p-2 space-x-2">
                  <button onClick={() => handleEdit(p)} className="text-blue-500 hover:underline">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(p._id)} className="text-red-500 hover:underline">
                    Delete
                  </button>
                  <button onClick={() => handleStockUpdate(p.sku, 'sale')} className="text-yellow-600 hover:underline">
                    Sale
                  </button>
                  <button onClick={() => handleStockUpdate(p.sku, 'restock')} className="text-green-600 hover:underline">
                    Restock
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
