import React, { useEffect, useState } from "react";
import axios from "axios";

function ProductDashboard() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      let res = await axios.get("http://localhost:5000/api/products", {
        withCredentials: true
      });
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h2>Product Dashboard</h2>
      <table border="1">
        <thead>
          <tr>
            <th>SKU</th>
            <th>Name</th>
            <th>Barcode</th>
            <th>Category</th>
            <th>Stock</th>
            <th>Threshold</th>
            <th>Expiry</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p._id} style={{ backgroundColor: p.stock <= p.threshold ? "#ffdddd" : "white" }}>
              <td>{p.sku}</td>
              <td>{p.name}</td>
              <td>{p.barcode}</td>
              <td>{p.category}</td>
              <td>{p.stock}</td>
              <td>{p.threshold}</td>
              <td>{p.expiry?.slice(0, 10)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductDashboard;
