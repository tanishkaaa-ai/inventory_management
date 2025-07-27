import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import Home from './components/Home';
import Auth from './components/Auth';
import AdminDashboard from './pages/AdminDashboard';
import StaffDashboard from './pages/StaffDashboard';
import ProductManager from './components/admin/ProductManager';
import AdminInventoryLogs  from './components/admin/AdminInventoryLogs';
import ProductManagerstaff from './components/ProductManagerstaff';
function App() {
  const [userType, setUserType] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleSelectUserType = (type) => {
    setUserType(type);
    setIsAuthenticated(false);
  };

  const handleBack = () => {
    setUserType(null);
    setIsAuthenticated(false);
  };

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
  };
  const handleLogout = () => {
  setUserType(null);
  setIsAuthenticated(false);
};

  return (
    <Router>
      <Routes>
        {/* Home Page */}
        <Route
          path="/"
          element={
            !userType ? (
              <Home onSelectUserType={handleSelectUserType} />
            ) : !isAuthenticated ? (
              <Auth
                userType={userType}
                onBack={handleBack}
                onSuccess={handleAuthSuccess}
              />
            ) : (
              <Navigate to={userType === 'admin' ? '/admin' : '/staff'} />
            )
          }
        />

        {/* Admin Dashboard */}
        <Route
          path="/admin"
          element={
            isAuthenticated && userType === 'admin' ? (
              <AdminDashboard  onLogout={handleLogout}/>
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* Staff Dashboard */}
        <Route
          path="/staff"
          element={
            isAuthenticated && userType === 'staff' ? (
              <StaffDashboard onLogout={handleLogout}/>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/admin/products"
          element={
            isAuthenticated && userType === 'admin' ? (
              <ProductManager />
          ) : (
              <Navigate to="/" />
          )
          }
        />
        <Route
          path="/staff/products"
          element={
            isAuthenticated && userType === 'staff' ? (
              <ProductManagerstaff />
          ) : (
              <Navigate to="/" />
          )
          }
        />
        <Route
  path="/admin/inventory-logs"
  element={
    isAuthenticated && userType === 'admin' ? (
      <AdminInventoryLogs />
    ) : (
      <Navigate to="/" />
    )
  }
/>

      </Routes>
    </Router>
  );
}

export default App;
