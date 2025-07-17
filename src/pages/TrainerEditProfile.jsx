import React, { useState, useEffect } from 'react';
import { Upload, User, ArrowLeft, Home, Crown, UserCog, LogOut, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/api';
import MyLogo from '../assets/MyLogo.png';
import Sidebar from '../components/Sidebar';
import PageHeader from '../components/PageHeader';

const TrainerEditProfile = () => {
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
      <Sidebar role="trainer" activePage="editprofile" />
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        <PageHeader title="Edit Profile" profilePicture={currentUser?.profilePicture} />
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
                      <User className="w-16 h-16 text-gray-400" />
                    )}
                  </div>
                  <label htmlFor="profile-upload" className="absolute bottom-2 right-2 bg-white rounded-full p-1 shadow cursor-pointer">
                    <Upload className="w-5 h-5 text-blue-500" />
                    <input id="profile-upload" type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                  </label>
                </div>
                <div className="text-sm text-gray-600 mt-1">Change Picture</div>
              </div>
              {/* Username */}
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 bg-white"
                  placeholder="Enter your username"
                  required
                />
              </div>
              {/* Passwords */}
              <div>
                <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Current Password
                </label>
                <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  value={currentPassword}
                  onChange={handleCurrentPasswordChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50 text-gray-900"
                  placeholder="Enter your current password"
                />
              </div>
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  name="password"
                  value={password}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 bg-white"
                  placeholder="Enter new password (leave blank to keep current)"
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 bg-white"
                  placeholder="Confirm your new password"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg shadow transition"
                disabled={isLoading}
              >
                {isLoading ? 'Saving...' : 'Save Changes'}
              </button>
            </form>
          </div>
        </main>
      </div>
      {/* Logout Dialog */}
      {showLogoutDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full">
            <div className="text-lg font-semibold mb-4 text-gray-900">Confirm Logout</div>
            <div className="mb-6 text-gray-700">Are you sure you want to logout?</div>
            <div className="flex justify-end gap-3">
              <button onClick={cancelLogout} className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-800">Cancel</button>
              <button onClick={confirmLogout} className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700">Logout</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainerEditProfile; 