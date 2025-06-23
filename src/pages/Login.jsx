import React, { useState } from "react";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import backgroundImage from '../assets/background.jpg';

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Logging in with", formData);
      alert("Login successful!");
      // Add actual login logic here
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

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleInputChange}
                className={`w-full p-4 border rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent ${
                  errors.username ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-gray-400"
                }`}
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
                className={`w-full p-4 border rounded-xl pr-12 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent ${
                  errors.password ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-gray-400"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
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
              className="w-full bg-red-600 text-white py-4 rounded-xl font-semibold hover:bg-red-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Login
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
