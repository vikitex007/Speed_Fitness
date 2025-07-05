import React, { useState } from 'react';
import { Upload, User, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/background.jpg';
import apiService from '../services/api';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    retypePassword: '',
    userType: 'user',
  });
  const [profilePicture, setProfilePicture] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showRetypePassword, setShowRetypePassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    if (apiError) {
      setApiError("");
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePicture(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!formData.retypePassword) {
      newErrors.retypePassword = 'Please confirm your password';
    } else if (formData.password !== formData.retypePassword) {
      newErrors.retypePassword = 'Passwords do not match';
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
      const registrationData = {
        username: formData.username,
        password: formData.password,
        retypePassword: formData.retypePassword,
        profilePicture: profilePicture,
        userType: formData.userType,
      };

      const response = await apiService.register(registrationData);
      
      if (response.success) {
        alert('Registration successful!');
        // Redirect to login after successful registration
        navigate('/login');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setApiError(error.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <div className="flex h-screen w-screen">
      {/* Left side - Background with image */}
      <div 
        className="w-1/2 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        {/* Back arrow */}
        <button 
          onClick={() => navigate('/')}
          className="absolute top-4 left-4 text-white p-2 rounded-full bg-black/20 hover:bg-black/40 transition-colors"
          aria-label="Back to home"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
      </div>

      {/* Right side - Form */}
      <div className="w-1/2 flex flex-col justify-center items-center bg-white overflow-y-auto py-10">
        <div className="w-3/4 max-w-md">
          {/* Profile Picture Upload Section */}
          <div className="text-center mb-6">
            <div className="relative inline-block">
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-2 flex items-center justify-center overflow-hidden hover:bg-gray-300 transition-colors cursor-pointer">
                {profilePicture ? (
                  <img 
                    src={profilePicture} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="text-gray-600 w-12 h-12" />
                )}
              </div>
              <label htmlFor="profile-upload" className="absolute bottom-0 right-0 bg-red-600 hover:bg-red-700 text-white rounded-full p-1.5 cursor-pointer transition-colors shadow-lg">
                <Upload className="w-3 h-3" />
              </label>
              <input
                id="profile-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                disabled={isLoading}
              />
            </div>
            <p className="text-gray-600 text-sm">Upload Picture</p>
          </div>

          {/* API Error Display */}
          {apiError && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {apiError}
            </div>
          )}

          {/* Form */}
          <div className="space-y-4">
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

            {/* Username */}
            <input
              type="text"
              name="username"
              placeholder="Enter Username"
              value={formData.username}
              onChange={handleInputChange}
              disabled={isLoading}
              className={`w-full p-3 border rounded-md transition-colors text-gray-900 ${
                errors.username ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400 focus:border-red-500 bg-white'
              } focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            />
            {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter Password"
                value={formData.password}
                onChange={handleInputChange}
                disabled={isLoading}
                className={`w-full p-3 border rounded-md pr-10 transition-colors text-gray-900 ${
                  errors.password ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400 focus:border-red-500 bg-white'
                } focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 disabled:opacity-50"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

            {/* Retype Password */}
            <div className="relative">
              <input
                type={showRetypePassword ? "text" : "password"}
                name="retypePassword"
                placeholder="Retype Password"
                value={formData.retypePassword}
                onChange={handleInputChange}
                disabled={isLoading}
                className={`w-full p-3 border rounded-md pr-10 transition-colors text-gray-900 ${
                  errors.retypePassword ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400 focus:border-red-500 bg-white'
                } focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
              />
              <button
                type="button"
                onClick={() => setShowRetypePassword(!showRetypePassword)}
                disabled={isLoading}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 disabled:opacity-50"
              >
                {showRetypePassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.retypePassword && <p className="text-red-500 text-sm">{errors.retypePassword}</p>}

            {/* Register Button */}
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className={`w-full bg-red-600 text-white py-3 rounded-md transition-colors font-medium ${
                isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-red-700"
              }`}
            >
              {isLoading ? "Registering..." : "Register"}
            </button>
          </div>

          {/* Login Link */}
          <p className="mt-4 text-sm text-gray-600 text-center">
            Already have an account?{" "}
            <button 
              onClick={handleLoginRedirect}
              className="underline text-red-600 hover:text-red-800 transition-colors"
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;