import React from 'react';

const Home = ({ onSelectUserType }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Welcome to Inventory Management Portal</h1>
        <p className="text-gray-600 mb-12 text-lg">Please select your role to continue</p>
        
        <div className="flex flex-col sm:flex-row gap-8 justify-center">
          <div 
            onClick={() => onSelectUserType('admin')}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 p-8 w-64 border-2 border-transparent hover:border-blue-200"
          >
            <div className="text-blue-600 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Admin</h2>
            <p className="text-gray-600">Administrative access and management</p>
          </div>

          <div 
            onClick={() => onSelectUserType('staff')}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 p-8 w-64 border-2 border-transparent hover:border-green-200"
          >
            <div className="text-green-600 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Staff</h2>
            <p className="text-gray-600">Staff member portal and resources</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;