import React, { useState } from "react";
import axios from "axios";

function ProductForm({ onAdd }) {
  const [product, setProduct] = useState({
    sku: "",
    name: "",
    barcode: "",
    category: "",
    stock: "",
    threshold: "",
    expiry: ""
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let errs = {};
    if (!product.sku) errs.sku = "SKU is required";
    if (!product.name) errs.name = "Name is required";
    if (product.stock <= 0) errs.stock = "Stock must be > 0";
    if (product.threshold <= 0) errs.threshold = "Threshold must be > 0";
    if (!product.expiry) errs.expiry = "Expiry date required";
    return errs;
  };

  const handleChange = e => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    try {
      const res = await axios.post("http://localhost:5000/api/products", product, {
        withCredentials: true
      });
      alert("Product added!");
      onAdd(); // callback to refresh list
      setProduct({
        sku: "",
        name: "",
        barcode: "",
        category: "",
        stock: "",
        threshold: "",
        expiry: ""
      });
    } catch (err) {
      alert(err.response?.data || "Error adding product");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {["sku", "name", "barcode", "category", "stock", "threshold", "expiry"].map((field) => (
        <div key={field}>
          <label>{field.toUpperCase()}</label>
          <input
            name={field}
            type={field === "expiry" ? "date" : "text"}
            value={product[field]}
            onChange={handleChange}
          />
          {errors[field] && <p style={{ color: "red" }}>{errors[field]}</p>}
        </div>
      ))}
      <button type="submit">Add Product</button>
    </form>
  );
}

export default ProductForm;
