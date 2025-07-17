import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Calendar, 
  TrendingUp, 
  MessageCircle, 
  Settings, 
  LogOut, 
  Plus, 
  Clock,
  DollarSign,
  Target,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  MoreVertical,
  UserCheck,
  Award,
  BarChart3,
  UserCog,
  CheckCircle,
  Trash2,
  Edit2,
  User
} from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/api';
import MyLogo from '../assets/MyLogo.png';
import TrainerAvatar from '../assets/cbum.png';
import Sidebar from '../components/Sidebar';
import PageHeader from '../components/PageHeader';
import TrainerToUserChatModal from '../components/TrainerToUserChatModal';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale
);

const trainer = {
  name: 'Cbum',
  status: 'Active',
  joined: '2022 May 1',
  avatar: TrainerAvatar,
};

const TrainerDashboard = () => {
  const navigate = useNavigate();
  const currentUser = apiService.getCurrentUser();
  const [selectedTimeframe, setSelectedTimeframe] = useState('This Month');
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await apiService.getAllUsers();
        console.log('Fetched users:', res); // Debug log
        if (res.success) {
          setUsers(res.data);
        }
      } catch (err) {
        console.error('Error fetching users:', err); // Debug log
      }
    };

    fetchUsers();
  }, []);

  const handleRemoveUser = (username) => {
    setUsers(users.filter(u => u.username !== username));
  };
  const handleMessageUser = (user) => {
    setSelectedUser(user);
    setShowChat(true);
  };
  const handleLogout = () => setShowLogoutDialog(true);
  const confirmLogout = () => { apiService.logout(); navigate('/login'); };
  const cancelLogout = () => setShowLogoutDialog(false);

  // Revenue data for different timeframes
  const revenueData = {
    'This Week': {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [{
        label: 'Revenue',
        data: [1200, 1800, 1400, 2200, 1600, 2800, 2000],
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
        fill: true,
      }]
    },
    'This Month': {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      datasets: [{
        label: 'Revenue',
        data: [8500, 9200, 7800, 9500],
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
        fill: true,
      }]
    },
    'This Year': {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [{
        label: 'Revenue',
        data: [65000, 72000, 68000, 75000, 82000, 78000, 85000, 92000, 88000, 95000, 92000, 98000],
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
        fill: true,
      }]
    }
  };

  // Client distribution by fitness level
  const clientDistributionData = {
    labels: ['Beginner', 'Intermediate', 'Advanced', 'Elite'],
    datasets: [{
      data: [30, 40, 20, 10],
      backgroundColor: [
        'rgba(59, 130, 246, 0.8)',
        'rgba(16, 185, 129, 0.8)',
        'rgba(245, 158, 11, 0.8)',
        'rgba(239, 68, 68, 0.8)',
      ],
      borderWidth: 0,
    }]
  };

  // Session types chart
  const sessionTypesData = {
    labels: ['Strength', 'Cardio', 'Yoga', 'HIIT', 'Flexibility'],
    datasets: [{
      label: 'Sessions',
      data: [45, 32, 28, 38, 25],
      backgroundColor: [
        'rgba(59, 130, 246, 0.8)',
        'rgba(16, 185, 129, 0.8)',
        'rgba(245, 158, 11, 0.8)',
        'rgba(239, 68, 68, 0.8)',
        'rgba(139, 92, 246, 0.8)',
      ],
      borderRadius: 8,
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          padding: 20,
        },
      },
    },
  };

  const statsCards = [
    {
      title: 'Active Clients',
      value: '24',
      subtitle: '+3 this month',
      icon: Users,
      color: 'blue',
      change: '+12%',
      trend: 'up'
    },
    {
      title: 'Sessions Today',
      value: '8',
      subtitle: '2 completed',
      icon: Calendar,
      color: 'green',
      change: 'On Track',
      trend: 'up'
    },
    {
      title: 'Monthly Revenue',
      value: '₹85K',
      subtitle: '+₹12K vs last month',
      icon: DollarSign,
      color: 'purple',
      change: '+16%',
      trend: 'up'
    },
    {
      title: 'Pending Messages',
      value: '12',
      subtitle: '3 urgent',
      icon: MessageCircle,
      color: 'orange',
      change: 'New',
      trend: 'neutral'
    }
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Sidebar role="trainer" activePage="dashboard" />
      <div className="flex-1 flex flex-col min-h-screen">
        <PageHeader title="Dashboard" profilePicture={currentUser?.profilePicture} />
        <main className="flex-1 p-8 flex flex-col items-center">
          <div className="w-full max-w-5xl mx-auto">
            {/* Trainer Info Card */}
            <div className="flex items-center gap-6 p-6 rounded-2xl shadow-lg mb-8 bg-white border border-gray-100">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-200 shadow">
                {currentUser?.profilePicture ? (
                  <img src={currentUser.profilePicture} alt="Trainer" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-full h-full text-gray-400" />
                )}
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{currentUser?.username || 'Trainer'}</div>
                <div className="text-gray-600 text-sm mt-1">Status: <span className="text-green-500 font-semibold">Active</span></div>
                <div className="text-gray-500 text-sm">Joined in: {currentUser?.createdAt ? new Date(currentUser.createdAt).toLocaleDateString() : ''}</div>
              </div>
            </div>
            {/* Premium Users Table */}
            <div className="bg-white rounded-2xl shadow p-8 border border-gray-100">
              <div className="text-xl font-bold mb-4 flex items-center gap-2">
                Premium Users <span className="ml-2 px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 text-xs font-semibold">{users.length} users</span>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Name</th>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Status</th>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Goal</th>
                      <th className="px-4 py-2 text-center text-sm font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {users.map((user, i) => {
                      const isPremium = user.membershipStatus !== "free" && user.subscriptionDetails?.isActive;
                      return (
                        <tr key={i} className={`hover:bg-gray-50 ${isPremium ? 'bg-purple-50' : ''}`}>
                          <td className="px-4 py-3 flex items-center gap-3">
                            {user.profilePicture ? (
                              <img src={user.profilePicture} alt={user.name || user.username} className="w-10 h-10 rounded-full object-cover border border-gray-200" />
                            ) : (
                              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold text-lg">
                                {(user.name || user.username).split(' ').map(n => n[0]).join('')}
                              </div>
                            )}
                            <div>
                              <div className="font-semibold text-gray-900">{user.name || user.username}</div>
                              <div className="text-xs text-gray-500">{user.username}</div>
                              {isPremium && <span className="ml-2 px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700 text-xs font-semibold">Premium</span>}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                              <CheckCircle className="w-4 h-4" /> {user.status || (isPremium ? 'Active' : 'Free')}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-gray-700">{user.goal || (user.fitnessProfile?.goals?.[0] || '')}</td>
                          <td className="px-4 py-3 flex items-center gap-3 justify-center">
                            {isPremium && (
                              <button className="p-2 rounded hover:bg-gray-100 text-blue-500" title="Message" onClick={() => handleMessageUser(user)}>
                                <MessageCircle className="w-5 h-5" />
                              </button>
                            )}
                            <button className="p-2 rounded hover:bg-gray-100 text-red-500" title="Remove" onClick={() => handleRemoveUser(user.username)}>
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>



            {/* Chat Modal */}
            {showChat && selectedUser && (
              <TrainerToUserChatModal 
                open={showChat} 
                onClose={() => setShowChat(false)} 
                trainer={currentUser}
                user={selectedUser}
              />
            )}
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
        </main>
      </div>
    </div>
  );
};

export default TrainerDashboard; 