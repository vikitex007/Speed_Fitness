import React from 'react';
import { Home, Crown, MessageCircle, UserCog, LogOut } from 'lucide-react';
import MyLogo from '../assets/MyLogo.png';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ role = 'user', activePage = '' }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // You can add your logout logic here if needed
    navigate('/login');
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
    </aside>
  );
};

export default Sidebar; 