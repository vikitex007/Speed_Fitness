import React, { useState, useEffect } from 'react';
import { Upload, User, ArrowLeft, Home, Crown, UserCog, LogOut, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/api';
import MyLogo from '../assets/MyLogo.png';
import Sidebar from '../components/Sidebar';

const EditProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '' });
  const [profilePicture, setProfilePicture] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [success, setSuccess] = useState(false);
  const [password, setPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const currentUser = apiService.getCurrentUser();
  const isPremiumUser = apiService.isPremiumUser();
  const [showUpgradePrompt, setShowUpgradePrompt] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setFormData({ username: currentUser.username });
      setProfilePicture(currentUser.profilePicture || null);
      setPreview(currentUser.profilePicture || null);
    }
  }, [currentUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setApiError('');
    setSuccess(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target.result);
        setProfilePicture(e.target.result);
      };
      reader.readAsDataURL(file);
    }
    setApiError('');
    setSuccess(false);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setApiError('');
    setSuccess(false);
  };

  const handleCurrentPasswordChange = (e) => {
    setCurrentPassword(e.target.value);
    setApiError('');
    setSuccess(false);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setApiError('');
    setSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setApiError('');
    setSuccess(false);
    try {
      // Update username and picture
      const updateData = {
        username: formData.username,
        profilePicture: profilePicture,
      };
      let response = { success: true };
      // Always try to update if there are changes
      const hasUsernameChanged = formData.username !== currentUser.username;
      const hasPictureChanged = profilePicture && profilePicture !== currentUser.profilePicture;
      
      console.log('Current user:', currentUser);
      console.log('Form data:', formData);
      console.log('Profile picture:', profilePicture);
      console.log('Has username changed:', hasUsernameChanged);
      console.log('Has picture changed:', hasPictureChanged);
      
      if (hasUsernameChanged || hasPictureChanged) {
        response = await apiService.updateProfile(updateData);
      }
      
      // Update password if provided
      let passwordSuccess = true;
      if (password) {
        if (!currentPassword) {
          setApiError('Please enter your current password to change password.');
          setIsLoading(false);
          return;
        }
        if (password !== confirmPassword) {
          setApiError('New passwords do not match.');
          setIsLoading(false);
          return;
        }
        try {
          await apiService.changePassword({ currentPassword, newPassword: password, confirmNewPassword: confirmPassword });
        } catch (err) {
          passwordSuccess = false;
          setApiError('Profile updated, but password change failed: ' + (err.message || 'Try again.'));
        }
      }
      
      if (response.success && passwordSuccess) {
        setSuccess(true);
        setPassword('');
        setCurrentPassword('');
        setConfirmPassword('');
        // Fetch latest profile and update localStorage/UI
        const fresh = await apiService.getProfile();
        if (fresh.success && fresh.data.user) {
          localStorage.setItem('user', JSON.stringify(fresh.data.user));
        }
      } else if (!response.success) {
        setApiError(response.message || 'Update failed. Please try again.');
      }
    } catch (error) {
      setApiError(error.message || 'Update failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePremiumClick = (e) => {
    if (!isPremiumUser) {
      e.preventDefault();
      setShowUpgradePrompt(true);
    }
  };
  const closeUpgradePrompt = () => setShowUpgradePrompt(false);

  const handleLogout = () => {
    setShowLogoutDialog(true);
  };
  const confirmLogout = () => {
    apiService.logout();
    navigate('/login');
  };
  const cancelLogout = () => {
    setShowLogoutDialog(false);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Sidebar */}
      <Sidebar role={currentUser?.role === 'trainer' ? 'trainer' : 'user'} activePage="editprofile" />
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="flex items-center justify-between px-8 py-6 bg-white border-b border-gray-200 shadow-sm">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Edit Profile</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-3 h-3 bg-green-500 rounded-full absolute -top-1 -right-1 border-2 border-white"></div>
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center overflow-hidden border-2 border-white shadow-lg">
                {currentUser?.profilePicture ? (
                  <img src={currentUser.profilePicture} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-7 h-7 text-white" />
                )}
              </div>
            </div>
          </div>
        </header>
        {/* Content */}
        <main className="flex-1 p-8 flex flex-col items-center justify-center">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 relative">
            {apiError && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                {apiError}
              </div>
            )}
            {success && (
              <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                Profile updated successfully!
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Profile Picture Upload */}
              <div className="text-center mb-4">
                <div className="relative inline-block">
                  <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-2 flex items-center justify-center overflow-hidden hover:bg-gray-300 transition-colors cursor-pointer">
                    {preview ? (
                      <img src={preview} alt="Profile" className="w-full h-full object-cover" />
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
                <p className="text-gray-600 text-sm">Change Picture</p>
              </div>
              {/* Username */}
              <input
                type="text"
                name="username"
                placeholder="Enter Username"
                value={formData.username}
                onChange={handleInputChange}
                disabled={isLoading}
                className="w-full p-3 border rounded-md transition-colors text-gray-900 border-gray-300 hover:border-gray-400 focus:border-red-500 bg-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
              />
              {/* Password Section */}
              <div className="space-y-3">
                <input
                  type="password"
                  name="currentPassword"
                  placeholder="Current Password (required to change password)"
                  value={currentPassword}
                  onChange={handleCurrentPasswordChange}
                  disabled={isLoading}
                  className="w-full p-3 border rounded-md transition-colors text-gray-900 border-gray-300 hover:border-gray-400 focus:border-red-500 bg-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                />
                <input
                  type="password"
                  name="password"
                  placeholder="New Password (leave blank to keep current)"
                  value={password}
                  onChange={handlePasswordChange}
                  disabled={isLoading}
                  className="w-full p-3 border rounded-md transition-colors text-gray-900 border-gray-300 hover:border-gray-400 focus:border-red-500 bg-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                />
                <input
                  type="password"
                  
                  name="confirmPassword"
                  placeholder="Confirm New Password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  disabled={isLoading}
                  className="w-full p-3 border rounded-md transition-colors text-gray-900 border-gray-300 hover:border-gray-400 focus:border-red-500 bg-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                />
              </div>
              {/* Save Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Saving...' : 'Save Changes'}
              </button>
            </form>
          </div>
        </main>
      </div>
      {/* Upgrade Prompt Modal */}
      {/* {showUpgradePrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full text-center">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Premium Feature Locked</h2>
            <p className="mb-6 text-gray-700">Upgrade to a premium plan to access exclusive features!</p>
            <div className="flex justify-center gap-6 mt-6">
              <a href="/premium" className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold shadow">Upgrade Now</a>
              <button onClick={closeUpgradePrompt} className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-lg font-semibold shadow">Cancel</button>
            </div>
          </div>
        </div>
      )} */}
      {/* Logout Confirmation Dialog */}
      {showLogoutDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full text-center">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Are you sure you want to logout?</h2>
            <div className="flex justify-center gap-6 mt-6">
              <button onClick={confirmLogout} className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold shadow">Logout</button>
              <button onClick={cancelLogout} className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-lg font-semibold shadow">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
