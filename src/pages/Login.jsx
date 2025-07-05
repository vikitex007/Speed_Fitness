import React, { useState } from "react";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import backgroundImage from '../assets/background.jpg';
import apiService from '../services/api';

const Login = () => {
  const [formData, setFormData] = useState({ 
    username: "", 
    password: "",
    userType: "user"
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    if (apiError) {
      setApiError("");
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setApiError("");

    try {
      const response = await apiService.login(formData);
      
      if (response.success) {
        // Check userType match
        const loggedInUser = response.data.user;
        if (loggedInUser.userType !== formData.userType) {
          setApiError(`You are registered as a ${loggedInUser.userType}. Please select the correct type.`);
          apiService.logout();
          return;
        }
        // Redirect to dashboard after successful login
        navigate('/dashboard');
      }
    } catch (error) {
      console.error("Login error:", error);
      setApiError(error.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-screen">
      {/* Left side - Background image */}
      <div 
        className="w-1/2 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />

      {/* Right side - Form */}
      <div className="w-1/2 flex flex-col justify-center items-center bg-white p-10">
        <div className="w-full max-w-md relative">
          <button 
            onClick={() => navigate('/')}
            className="absolute -top-16 left-0 text-gray-400 hover:text-gray-600 transition"
            aria-label="Back to home"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>

          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Welcome Back
          </h2>

          {/* API Error Display */}
          {apiError && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* User Type Selector */}
            <div className="mb-4">
              <div className="font-semibold text-gray-900 mb-2 text-lg">Select Account Type:</div>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer text-gray-900 text-base">
                  <input
                    type="radio"
                    name="userType"
                    value="user"
                    checked={formData.userType === 'user'}
                    onChange={handleInputChange}
                    disabled={isLoading}
                  />
                  <span>User</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-gray-900 text-base">
                  <input
                    type="radio"
                    name="userType"
                    value="trainer"
                    checked={formData.userType === 'trainer'}
                    onChange={handleInputChange}
                    disabled={isLoading}
                  />
                  <span>Trainer</span>
                </label>
              </div>
            </div>

            <div>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleInputChange}
                disabled={isLoading}
                className={`w-full p-4 border rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent text-gray-900 ${
                  errors.username ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-gray-400 bg-white"
                } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">{errors.username}</p>
              )}
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                disabled={isLoading}
                className={`w-full p-4 border rounded-xl pr-12 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent text-gray-900 ${
                  errors.password ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-gray-400 bg-white"
                } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition disabled:opacity-50"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-red-600 text-white py-4 rounded-xl font-semibold transform transition-all duration-200 shadow-lg ${
                isLoading 
                  ? "opacity-50 cursor-not-allowed" 
                  : "hover:bg-red-700 hover:scale-105 hover:shadow-xl"
              }`}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="mt-8 text-center text-gray-600">
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="text-red-600 hover:text-red-800 font-semibold underline transition-colors cursor-pointer"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
