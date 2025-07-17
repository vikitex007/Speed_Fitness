import React, { useState } from 'react';
import { Home, Crown, MessageCircle, UserCog, LogOut } from 'lucide-react';
import MyLogo from '../assets/MyLogo.png';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/api';

const Sidebar = ({ role = 'user', activePage = '' }) => {
  const navigate = useNavigate();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

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

  // Sidebar links for user and trainer
  const links = role === 'trainer'
    ? [
        { label: 'Dashboard', href: '/dashboard', icon: <Home className="w-6 h-6" />, key: 'dashboard' },
        { label: 'Message', href: '/trainer-messages', icon: <MessageCircle className="w-6 h-6" />, key: 'message' },
        { label: 'Edit Profile', href: '/edit-profile', icon: <UserCog className="w-6 h-6" />, key: 'editprofile' },
      ]
    : [
        { label: 'Dashboard', href: '/dashboard', icon: <Home className="w-6 h-6" />, key: 'dashboard' },
        { label: 'Premium', href: '/premium', icon: <Crown className="w-6 h-6" />, key: 'premium' },
        { label: 'Edit Profile', href: '/edit-profile', icon: <UserCog className="w-6 h-6" />, key: 'editprofile' },
      ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col items-center py-8 min-h-screen shadow-lg">
      <img src={MyLogo} alt="Logo" className="w-20 h-20 mb-8" />
      <nav className="flex flex-col gap-2 w-full px-4">
        {links.map(link => (
          <a
            key={link.key}
            href={link.href}
            className={`flex items-center gap-3 font-semibold text-lg py-3 px-4 rounded-xl transition-all
              ${activePage === link.key
                ? 'text-blue-600 bg-blue-50'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
          >
            {link.icon} {link.label}
          </a>
        ))}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 font-semibold text-lg text-gray-600 py-3 px-4 rounded-xl hover:bg-gray-50 hover:text-gray-900 transition-all w-full text-left mt-auto"
        >
          <LogOut className="w-6 h-6" /> Logout
        </button>
      </nav>

      {/* Logout Confirmation Dialog */}
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
    </aside>
  );
};

export default Sidebar; 