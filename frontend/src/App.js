import React, { useState } from 'react';
import Home from './components/Home';
import Auth from './components/Auth';

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
  return (
    <div className="App">
      {!userType ? (
        <Home onSelectUserType={handleSelectUserType} />
      ) : !isAuthenticated ? (
        <Auth userType={userType} onBack={handleBack} onSuccess={handleAuthSuccess} />
      ) : (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">
              {userType === 'admin' ? 'Admin Dashboard' : 'Staff Dashboard'}
            </h1>
            <p className="text-lg mb-8">
              Welcome, {userType}!
            </p>
            <button
              className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={handleBack}
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}


export default App;