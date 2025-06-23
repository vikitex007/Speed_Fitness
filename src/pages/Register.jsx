import React, { useState } from 'react';
import { Upload, User, Eye, EyeOff } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    retypePassword: ''
  });
  const [profileImage, setProfileImage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showRetypePassword, setShowRetypePassword] = useState(false);
  const [errors, setErrors] = useState({});

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
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Registration data:', { ...formData, profileImage });
      alert('Registration successful!');
    }
  };

  const handleLoginRedirect = () => {
    alert('Redirecting to login page...');
  };

  return (
    <div className="flex h-screen w-screen">
      {/* Left side - Background with image */}
      <div 
        className="w-1/2 bg-cover bg-center relative"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(99, 102, 241, 0.7), rgba(168, 85, 247, 0.7)), url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><defs><radialGradient id="grad1" cx="50%" cy="50%" r="50%"><stop offset="0%" style="stop-color:rgb(147,51,234);stop-opacity:0.3" /><stop offset="100%" style="stop-color:rgb(59,130,246);stop-opacity:0.8" /></radialGradient></defs><rect width="100%" height="100%" fill="url(%23grad1)"/><circle cx="200" cy="300" r="150" fill="rgba(255,255,255,0.1)"/><circle cx="800" cy="700" r="100" fill="rgba(255,255,255,0.05)"/><circle cx="600" cy="200" r="80" fill="rgba(255,255,255,0.08)"/></svg>')`,
          filter: "brightness(0.8)",
        }}
      >
        {/* Back arrow */}
        <div className="absolute top-4 left-4 text-white text-4xl cursor-pointer hover:text-gray-200 transition-colors">
          ←
        </div>
        
        {/* Content overlay */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center p-8">
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8 border border-white border-opacity-20 max-w-md">
            <h1 className="text-4xl font-bold mb-4">Join Our Community</h1>
            <p className="text-lg opacity-90 leading-relaxed">
              Create your account and start your journey with us. Connect, share, and grow together.
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-1/2 flex flex-col justify-center items-center bg-white">
        <div className="w-3/4 max-w-md">
          {/* Profile Picture Upload Section */}
          <div className="text-center mb-6">
            <div className="relative inline-block">
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-2 flex items-center justify-center overflow-hidden hover:bg-gray-300 transition-colors cursor-pointer">
                {profileImage ? (
                  <img 
                    src={profileImage} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="text-gray-600 w-12 h-12" />
                )}
              </div>
              <label htmlFor="profile-upload" className="absolute bottom-0 right-0 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-1.5 cursor-pointer transition-colors shadow-lg">
                <Upload className="w-3 h-3" />
              </label>
              <input
                id="profile-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
            <p className="text-gray-600 text-sm">Upload Picture</p>
          </div>

          {/* Form */}
          <div className="space-y-4">
            {/* Username */}
            <input
              type="text"
              name="username"
              placeholder="Enter Username"
              value={formData.username}
              onChange={handleInputChange}
              className={`w-full p-3 border rounded-md transition-colors ${
                errors.username ? 'border-red-500' : 'border-gray-300 hover:border-gray-400 focus:border-blue-500'
              } focus:outline-none`}
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
                className={`w-full p-3 border rounded-md pr-10 transition-colors ${
                  errors.password ? 'border-red-500' : 'border-gray-300 hover:border-gray-400 focus:border-blue-500'
                } focus:outline-none`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
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
                className={`w-full p-3 border rounded-md pr-10 transition-colors ${
                  errors.retypePassword ? 'border-red-500' : 'border-gray-300 hover:border-gray-400 focus:border-blue-500'
                } focus:outline-none`}
              />
              <button
                type="button"
                onClick={() => setShowRetypePassword(!showRetypePassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showRetypePassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.retypePassword && <p className="text-red-500 text-sm">{errors.retypePassword}</p>}

            {/* Register Button */}
            <button
              onClick={handleSubmit}
              className="w-full bg-black text-white py-3 rounded-md hover:bg-red-600 transition-colors font-medium"
            >
              Register
            </button>
          </div>

          {/* Login Link */}
          <p className="mt-4 text-sm text-gray-600 text-center">
            Already have an account?{" "}
            <button 
              onClick={handleLoginRedirect}
              className="underline text-blue-600 hover:text-blue-800 transition-colors"
            >
              Login
            </button>
          </p>

          {/* Login Button */}
          <button
            onClick={handleLoginRedirect}
            className="mt-2 w-full bg-black text-white py-3 rounded-md hover:bg-red-600 transition-colors font-medium"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;