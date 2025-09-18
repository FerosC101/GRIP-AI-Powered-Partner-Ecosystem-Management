import React, { useState } from 'react';
import { ArrowLeft, Facebook, Chrome, Linkedin } from 'lucide-react';
import { loginUser } from '../services/authService';

const LoginPage = ({ onNavigate }) => {
  const [loginData, setLoginData] = useState({
    workEmail: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await loginUser(loginData.workEmail, loginData.password);

      if (result.success) {
        console.log('Login successful:', result.user);
        console.log('User data:', result.userData);
        // Redirect to dashboard
        onNavigate('dashboard');
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('An unexpected error occurred');
    }

    setLoading(false);
  };

  return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
        <div className="flex items-center space-x-4 mb-2">
          <button
              onClick={() => onNavigate('landing')}
              className="p-1 hover:bg-gray-100 rounded"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div className="flex items-center space-x-2 mx-auto">
            <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl">G</div>
            <p className="text-2xl font-bold text-orange-500">Grip</p>
          </div>
        </div>

        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
          {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Work Email
              </label>
              <input
                  type="email"
                  name="workEmail"
                  value={loginData.workEmail}
                  onChange={handleInputChange}
                  placeholder="your@company.com"
                  required
                  className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-base"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                  type="password"
                  name="password"
                  value={loginData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  required
                  className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-base"
              />
              <div className="text-right mt-2">
                <button type="button" className="text-sm text-gray-500 hover:text-gray-700">
                  Forgot Password
                </button>
              </div>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-orange-500 text-white rounded-md font-semibold hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-base"
            >
              {loading ? 'Logging in...' : 'Log In'}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or login with</span>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button className="flex-1 p-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors flex items-center justify-center">
                <Facebook className="w-5 h-5 text-blue-600" />
              </button>
              <button className="flex-1 p-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors flex items-center justify-center">
                <Chrome className="w-5 h-5 text-red-500" />
              </button>
              <button className="flex-1 p-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors flex items-center justify-center">
                <Linkedin className="w-5 h-5 text-blue-700" />
              </button>
            </div>

            <div className="text-center text-sm text-gray-600 mt-6">
              Don't have an account?{' '}
              <button
                  type="button"
                  onClick={() => onNavigate('register')}
                  className="text-orange-500 hover:underline font-medium"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
  );
};

export default LoginPage;