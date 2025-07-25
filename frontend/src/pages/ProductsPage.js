import React from "react";
import ProductForm from "../components/ProductForm";
import ProductDashboard from "../components/ProductDashboard";

function ProductsPage() {
  const [refresh, setRefresh] = React.useState(false);

  const triggerRefresh = () => setRefresh(prev => !prev);

  return (
    <div>
      <h1>Inventory Management</h1>
      <ProductForm onAdd={triggerRefresh} />
      <ProductDashboard key={refresh} />
    </div>
  );
}

export default ProductsPage;
