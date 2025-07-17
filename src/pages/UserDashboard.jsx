import React, { useState, useEffect } from 'react';
import { 
  Home, 
  Crown, 
  UserCog, 
  LogOut, 
  User, 
  BarChart2, 
  Calendar, 
  Clock, 
  CreditCard, 
  ChevronRight,
  TrendingUp,
  Activity,
  Target,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  MoreVertical,
  Users,
  Heart,
  CheckCircle,
  XCircle,
  Shield,
  Award,
  Lock
} from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import apiService from '../services/api';
import MyLogo from '../assets/MyLogo.png';
import PaymentGatewayModal from '../components/PaymentGatewayModal';
import { useNavigate } from 'react-router-dom';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const UserDashboard = () => {
  const navigate = useNavigate();
  const currentUser = apiService.getCurrentUser();
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [membershipPaused, setMembershipPaused] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState('12 Months');
  const [premiumFeatures, setPremiumFeatures] = useState({});
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [showUpgradePrompt, setShowUpgradePrompt] = useState(false);
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null); // 'success' | 'failure' | null
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setPremiumFeatures(apiService.getPremiumFeatures());
    }
  }, [currentUser]);

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

  const handlePaymentSelect = async (method) => {
    // Simulate payment process (replace with real integration)
    setShowPaymentModal(false);
    // TODO: Integrate Khalti/eSewa SDK here
    // For now, simulate success after 2s
    setPaymentStatus('processing');
    setTimeout(async () => {
      // Call backend to upgrade membership
      try {
        await apiService.upgradeMembership({ plan: selectedPlan.name.toLowerCase(), paymentMethod: method });
        setPaymentStatus('success');
        // Optionally, refresh user data here
        window.location.reload(); // Or fetch user data and update state
      } catch (e) {
        setPaymentStatus('failure');
      }
    }, 2000);
  };

  const isPremiumUser = apiService.isPremiumUser();
  const membershipStatus = apiService.getMembershipStatus();

  const handlePremiumClick = (e) => {
    if (!isPremiumUser) {
      e.preventDefault();
      setShowUpgradePrompt(true);
    }
  };

  const closeUpgradePrompt = () => setShowUpgradePrompt(false);

  const handlePauseMembership = () => {
    if (membershipPaused) {
      // Resume membership
      setMembershipPaused(false);
      alert('Membership resumed successfully!');
    } else {
      // Pause membership
      setMembershipPaused(true);
      alert('Membership paused successfully! You can resume anytime.');
    }
  };

  // Dynamic workout progress data
  const workoutData = {
    '7 Days': {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [{
        label: 'Workout Duration (min)',
        data: [45, 60, 30, 75, 45, 90, 30],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true,
      }]
    },
    '30 Days': {
      labels: Array.from({length: 30}, (_, i) => i + 1),
      datasets: [{
        label: 'Workout Duration (min)',
        data: Array.from({length: 30}, () => Math.floor(Math.random() * 60) + 30),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true,
      }]
    },
    '6 Months': {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [{
        label: 'Monthly Progress',
        data: [65, 72, 68, 75, 82, 78],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true,
      }]
    },
    '12 Months': {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [{
        label: 'Monthly Progress',
        data: [60, 65, 70, 68, 75, 80, 78, 82, 85, 88, 90, 92],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true,
      }]
    }
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

  // Placeholder data
  const transactionHistory = [
    { status: 'Completed', card: 'Visa card •••• 4831', amount: '$20.99', date: 'Jan 17, 2024', freq: 'Monthly' },
    { status: 'Completed', card: 'Mastercard •••• 6442', amount: '$99.99', date: 'Jul 07, 2023', freq: 'Semi-Annually' },
    { status: 'Completed', card: 'Account •••• 882', amount: '$20.99', date: 'Jun 7, 2023', freq: 'Bank payment' },
    { status: 'Completed', card: 'Amex card •••• 5666', amount: '$20.99', date: 'May 9, 2023', freq: 'Card payment' },
  ];

  const statsCards = [
    {
      title: 'Days Attended',
      value: currentUser?.activityStats?.totalWorkouts || '0',
      subtitle: 'This Month',
      icon: Calendar,
      color: 'blue',
      change: '+12%',
      trend: 'up'
    },
    {
      title: 'Last Check-in',
      value: currentUser?.activityStats?.lastWorkoutDate ? 
        new Date(currentUser.activityStats.lastWorkoutDate).toLocaleDateString() : 'Never',
      subtitle: currentUser?.activityStats?.currentStreak ? `${currentUser.activityStats.currentStreak} day streak` : 'No streak',
      icon: Clock,
      color: 'green',
      change: currentUser?.activityStats?.currentStreak ? 'On Track' : 'Start Today',
      trend: currentUser?.activityStats?.currentStreak ? 'up' : 'neutral'
    },
    {
      title: 'Next Payment',
      value: currentUser?.subscriptionDetails?.nextPaymentDate ? 
        new Date(currentUser.subscriptionDetails.nextPaymentDate).toLocaleDateString() : 'N/A',
      subtitle: membershipStatus === 'free' ? 'No active plan' : currentUser?.subscriptionDetails?.planName,
      icon: CreditCard,
      color: 'purple',
      change: membershipStatus === 'free' ? 'Upgrade Now' : 'Active',
      trend: membershipStatus === 'free' ? 'neutral' : 'up'
    },
    {
      title: 'Fitness Level',
      value: currentUser?.fitnessProfile?.fitnessLevel || 'Beginner',
      subtitle: 'Current Level',
      icon: Target,
      color: 'orange',
      change: 'Keep Going',
      trend: 'up'
    }
  ];

  const premiumFeaturesList = [
    {
      name: 'Personal Trainer',
      available: premiumFeatures.personalTrainer,
      icon: Users,
      description: 'One-on-one sessions with certified trainers'
    },
    {
      name: 'Nutrition Consultation',
      available: premiumFeatures.nutritionConsultation,
      icon: Heart,
      description: 'Customized meal plans and dietary guidance'
    },
    {
      name: 'Group Classes',
      available: premiumFeatures.groupClasses,
      icon: Zap,
      description: 'Access to all group fitness classes'
    },
    {
      name: 'Recovery Sessions',
      available: premiumFeatures.recoverySessions,
      icon: Shield,
      description: 'Professional recovery and injury prevention'
    },
    {
      name: 'Priority Booking',
      available: premiumFeatures.priorityBooking,
      icon: Target,
      description: 'Reserve equipment and classes before others'
    },
    {
      name: 'Guest Passes',
      available: premiumFeatures.guestPasses > 0,
      icon: Award,
      description: `${premiumFeatures.guestPasses} guest passes available`
    },
    {
      name: 'Towel Service',
      available: premiumFeatures.towelService,
      icon: CheckCircle,
      description: 'Fresh towels provided during workouts'
    },
    {
      name: 'Locker Access',
      available: premiumFeatures.lockerAccess,
      icon: Lock,
      description: 'Secure locker room access'
    }
  ];

  // Plan options
  const plans = [
    {
      name: 'Silver',
      price: 2500,
      features: ['Contact Trainer', 'Diet Plan', 'Workout Plan', 'Monthly Progress Check', 'Weekly Support'],
      duration: 'month',
    },
    {
      name: 'Gold',
      price: 3500,
      features: ['All Silver Features', 'Biweekly Progress Check', 'Biweekly Support', 'Live QnA'],
      duration: 'month',
    },
    {
      name: 'Platinum',
      price: 5000,
      features: ['All Gold Features', 'Weekly Progress Check', 'Priority Support', 'Video Consult', 'Lifestyle Coaching'],
      duration: 'month',
    },
  ];

  // Handle upgrade button click
  const handleUpgradeClick = () => {
    setShowPlanModal(true);
  };

  // Handle plan selection
  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    setShowPlanModal(false);
    setShowPaymentModal(true);
  };

  // Cancel subscription handler
  const handleCancelSubscription = async () => {
    setShowCancelDialog(false);
    try {
      await apiService.cancelMembership();
      window.location.reload(); // Or fetch user data and update state
    } catch (e) {
      alert('Failed to cancel subscription. Please try again.');
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col items-center py-8 min-h-screen shadow-lg">
        <img src={MyLogo} alt="Logo" className="w-20 h-20 mb-8" />
        <nav className="flex flex-col gap-2 w-full px-4">
          <a href="#" className="flex items-center gap-3 font-semibold text-lg text-gray-900 py-3 px-4 rounded-xl bg-blue-50 text-blue-600 transition-all">
            <Home className="w-6 h-6" /> Dashboard
          </a>
          <a
            href={isPremiumUser ? "/premium" : "#"}
            className={`flex items-center gap-3 font-semibold text-lg py-3 px-4 rounded-xl transition-all
              ${isPremiumUser ? "text-gray-600 hover:bg-gray-50 hover:text-gray-900" : "text-gray-400 bg-gray-100 cursor-not-allowed"}`}
            style={!isPremiumUser ? { pointerEvents: 'none' } : {}}
          >
            <Crown className="w-6 h-6" /> Premium
            {!isPremiumUser && <span className="ml-2 text-xs bg-yellow-200 text-yellow-800 px-2 py-0.5 rounded-full">Locked</span>}
          </a>
          <a href="/edit-profile" className="flex items-center gap-3 font-semibold text-lg text-gray-600 py-3 px-4 rounded-xl hover:bg-gray-50 hover:text-gray-900 transition-all">
            <UserCog className="w-6 h-6" /> Edit Profile
          </a>
          <button onClick={handleLogout} className="flex items-center gap-3 font-semibold text-lg text-gray-600 py-3 px-4 rounded-xl hover:bg-gray-50 hover:text-gray-900 transition-all w-full text-left mt-auto">
            <LogOut className="w-6 h-6" /> Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="flex items-center justify-between px-8 py-6 bg-white border-b border-gray-200 shadow-sm">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome back, {currentUser?.username || 'User'}! 👋</p>
          </div>
          <div className="flex items-center gap-4">
            {isPremiumUser && (
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                <Crown className="w-4 h-4" />
                {membershipStatus.toUpperCase()}
              </div>
            )}
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
        <main className="flex-1 p-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statsCards.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                      <p className="text-xs text-gray-500 mt-1">{stat.subtitle}</p>
                    </div>
                    <div className={`p-3 rounded-xl bg-${stat.color}-50`}>
                      <IconComponent className={`w-6 h-6 text-${stat.color}-600`} />
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mt-3">
                    {stat.trend === 'up' && <ArrowUpRight className="w-4 h-4 text-green-500" />}
                    {stat.trend === 'down' && <ArrowDownRight className="w-4 h-4 text-red-500" />}
                    <span className={`text-xs font-medium ${
                      stat.trend === 'up' ? 'text-green-600' : 
                      stat.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* User Info & Membership */}
            <div className="col-span-1 flex flex-col gap-6">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center overflow-hidden border-2 border-white shadow-lg">
                  {currentUser?.profilePicture ? (
                    <img src={currentUser.profilePicture} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                      <User className="w-8 h-8 text-white" />
                    )}
                  </div>
                  <div>
                    <div className="font-bold text-lg text-gray-900">{currentUser?.username || 'User'}</div>
                    <div className="text-sm text-gray-500">
                      {(() => {
                        const status = (currentUser?.membershipStatus || '').toLowerCase();
                        if (status === 'silver') return 'Silver Member';
                        if (status === 'gold') return 'Gold Member';
                        if (status === 'platinum') return 'Platinum Member';
                        return 'Free Member';
                      })()}
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Status</span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      membershipPaused ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {membershipPaused ? 'Paused' : 'Active'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Member Since</span>
                    <span className="text-sm font-medium text-gray-900">
                      {currentUser?.createdAt ? new Date(currentUser.createdAt).toLocaleDateString() : 'N/A'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Fitness Level</span>
                    <span className="text-sm font-medium text-gray-900">
                      {currentUser?.fitnessProfile?.fitnessLevel || 'Beginner'}
                    </span>
                  </div>
                  {isPremiumUser && currentUser?.subscriptionDetails?.endDate && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Plan Expires</span>
                      <span className="text-sm font-medium text-gray-900">
                        {new Date(currentUser.subscriptionDetails.endDate).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Membership Actions</h3>
                <div className="space-y-3">
                  {!isPremiumUser ? (
                    <>
                      <button
                        className={`w-full font-semibold py-3 rounded-xl transition-all ${
                          membershipPaused 
                            ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg' 
                            : 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white shadow-lg'
                        }`}
                        onClick={handlePauseMembership}
                      >
                        {membershipPaused ? 'Resume Membership' : 'Pause Membership'}
                      </button>
                      <button
                        className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-3 rounded-xl transition-all shadow-lg"
                        onClick={handleUpgradeClick}
                      >
                        Upgrade to Premium
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className={`w-full font-semibold py-3 rounded-xl transition-all ${
                          membershipPaused 
                            ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg' 
                            : 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white shadow-lg'
                        }`}
                        onClick={handlePauseMembership}
                      >
                        {membershipPaused ? 'Resume Membership' : 'Pause Membership'}
                      </button>
                {/* <button
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 rounded-xl transition-all shadow-lg"
                        onClick={() => navigate('/premium')}
                >
                        Manage Plan
                </button> */}
                <button
                        className="w-full bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 text-white font-semibold py-3 rounded-xl transition-all shadow-lg"
                        onClick={() => setShowCancelDialog(true)}
                >
                        Cancel Subscription
                </button>
                    </>
                  )}
                </div>
              </div>

              {/* Premium Features */}
              {isPremiumUser && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Crown className="w-5 h-5 text-yellow-500" />
                    Premium Features
                  </h3>
                  <div className="space-y-3">
                    {premiumFeaturesList.map((feature, index) => {
                      const IconComponent = feature.icon;
                      return (
                        <div key={index} className="flex items-center gap-3">
                          {feature.available ? (
                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                          ) : (
                            <XCircle className="w-5 h-5 text-gray-400 flex-shrink-0" />
                          )}
                          <div className="flex-1">
                            <div className="text-sm font-medium text-gray-900">{feature.name}</div>
                            <div className="text-xs text-gray-500">{feature.description}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Workout Progress Chart */}
            <div className="col-span-2">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Workout Progress</h3>
                    <p className="text-sm text-gray-600">Track your fitness journey</p>
                  </div>
                  <div className="flex gap-2">
                    {['7 Days', '30 Days', '6 Months', '12 Months'].map((timeframe) => (
                      <button
                        key={timeframe}
                        onClick={() => setSelectedTimeframe(timeframe)}
                        className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                          selectedTimeframe === timeframe
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {timeframe}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="h-64">
                  <Line data={workoutData[selectedTimeframe]} options={chartOptions} />
                </div>
              </div>
            </div>
          </div>

          {/* Transaction History */}
          <div className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Transaction History</h3>
                <p className="text-sm text-gray-600">Your recent payments and subscriptions</p>
              </div>
              <a href="#" className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                View All <ChevronRight className="w-4 h-4" />
              </a>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-600 text-sm">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-600 text-sm">Payment Method</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-600 text-sm">Amount</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-600 text-sm">Date</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-600 text-sm">Frequency</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-600 text-sm"></th>
                  </tr>
                </thead>
                <tbody>
                  {transactionHistory.map((t, idx) => (
                    <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {t.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-900">{t.card}</span>
                      </td>
                      <td className="py-3 px-4 font-semibold text-gray-900">{t.amount}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{t.date}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{t.freq}</td>
                      <td className="py-3 px-4">
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <MoreVertical className="w-4 h-4 text-gray-400" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
        
        {/* Plan Selection Modal */}
        {showPlanModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg p-8 relative animate-fade-in">
              <button
                onClick={() => setShowPlanModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold focus:outline-none"
                aria-label="Close"
              >
                &times;
              </button>
              <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Choose a Premium Plan</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {plans.map((plan) => (
                  <div key={plan.name} className="border rounded-xl p-4 flex flex-col items-center shadow hover:shadow-lg transition">
                    <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                    <div className="text-2xl font-bold text-red-600 mb-2">Rs. {plan.price}<span className='text-base font-medium text-gray-600'>/month</span></div>
                    <ul className="text-sm text-gray-600 mb-4 list-disc list-inside">
                      {plan.features.map((f, i) => <li key={i}>{f}</li>)}
                    </ul>
                    <button
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold mt-auto"
                      onClick={() => handlePlanSelect(plan)}
                    >
                      Select
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {/* Payment Modal */}
        <PaymentGatewayModal
          open={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          onSelect={handlePaymentSelect}
        />
        {/* Payment Status */}
        {paymentStatus === 'processing' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full text-center">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">Processing Payment...</h2>
              <p className="mb-6 text-gray-700">Please wait while we confirm your payment.</p>
            </div>
          </div>
        )}
        {paymentStatus === 'success' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full text-center">
              <h2 className="text-2xl font-bold mb-4 text-green-700">Payment Successful!</h2>
              <p className="mb-6 text-gray-700">You are now a premium member. Enjoy your new features!</p>
              <button onClick={() => setPaymentStatus(null)} className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold shadow">Close</button>
            </div>
          </div>
        )}
        {paymentStatus === 'failure' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full text-center">
              <h2 className="text-2xl font-bold mb-4 text-red-700">Payment Failed</h2>
              <p className="mb-6 text-gray-700">There was a problem processing your payment. Please try again.</p>
              <button onClick={() => setPaymentStatus(null)} className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold shadow">Close</button>
            </div>
          </div>
        )}

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

        {/* Upgrade Prompt Modal */}
        {showUpgradePrompt && (
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
        )}

        {/* Cancel Subscription Confirmation Dialog */}
        {showCancelDialog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full text-center">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">Cancel Subscription?</h2>
              <p className="mb-6 text-gray-700">Are you sure you want to cancel your premium membership? You will lose access to all premium features.</p>
              <div className="flex justify-center gap-6 mt-6">
                <button onClick={handleCancelSubscription} className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold shadow">Yes, Cancel</button>
                <button onClick={() => setShowCancelDialog(false)} className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-lg font-semibold shadow">No, Keep</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard; 