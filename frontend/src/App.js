// frontend/App.js
import React, { useState } from 'react';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';

function App() {
  const [reload, setReload] = useState(false);

  const triggerReload = () => setReload(!reload);

  return (
    <div>
      <h2>Inventory Dashboard</h2>
      <ProductForm onProductAdded={triggerReload} />
      <ProductList key={reload} />
    </div>
  );
}

export default App;

