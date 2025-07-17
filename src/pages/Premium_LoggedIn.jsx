import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/api';
import MyLogo from '../assets/MyLogo.png';
import { Crown, User, UserCog, LogOut, Utensils, Dumbbell, CheckCircle, Phone, MessageCircle, Home } from 'lucide-react';
import TrainerChatModal from '../components/TrainerChatModal';

const PLAN_FEATURES = {
  silver: [
    'Contact Trainer',
    'Diet Plan',
    'Workout Plan',
    'Monthly Progress Check',
    'Weekly Support',
  ],
  gold: [
    'All Silver Features',
    'Biweekly Progress Check',
    'Biweekly Support',
    'Live QnA',
  ],
  platinum: [
    'All Gold Features',
    'Weekly Progress Check',
    'Priority Support',
    'Video Consult',
    'Lifestyle Coaching',
  ],
};

const PLAN_COLORS = {
  silver: 'from-gray-300 to-gray-400',
  gold: 'from-yellow-400 to-yellow-500',
  platinum: 'from-blue-400 to-purple-600',
};



const PremiumLoggedIn = () => {
  const navigate = useNavigate();
  const user = apiService.getCurrentUser();
  const plan = (user?.membershipStatus || '').toLowerCase();
  const isPremium = ['silver', 'gold', 'platinum'].includes(plan);
  const [showChat, setShowChat] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [trainerData, setTrainerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Sidebar logout
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

  // Fetch trainer data from database
  useEffect(() => {
    const fetchTrainerData = async () => {
      try {
        setLoading(true);
        const response = await apiService.getTrainerData();
        if (response.success) {
          setTrainerData(response.data);
        } else {
          setError('Failed to fetch trainer data');
        }
      } catch (err) {
        console.error('Error fetching trainer data:', err);
        setError('Failed to load trainer information');
      } finally {
        setLoading(false);
      }
    };

    if (isPremium) {
      fetchTrainerData();
    } else {
      setLoading(false);
    }
  }, [isPremium]);

  // Placeholder plans (replace with real data)
  const dietPlan = [
    '8:00 AM — Oats + 2 boiled eggs + green tea',
    '12:30 PM — Brown rice + grilled chicken + salad',
    '4:00 PM — Banana + handful of almonds',
    '7:30 PM — Grilled fish/paneer + steamed veggies',
  ];
  const workoutPlan = [
    'Mon: Upper Body (Push): Chest, Shoulders, Triceps',
    'Tue: Lower Body: Quads, Hamstrings, Calves',
    'Wed: Rest or Light Cardio',
    'Thu: Upper Body (Pull): Back, Biceps',
    'Fri: Core + HIIT',
    'Sat: Full Body Stretch + Light Cardio',
    'Sun: Rest',
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col items-center py-8 min-h-screen shadow-lg">
        <img src={MyLogo} alt="Logo" className="w-20 h-20 mb-8" />
        <nav className="flex flex-col gap-2 w-full px-4">
          <a href="/dashboard" className="flex items-center gap-3 font-semibold text-lg text-gray-600 py-3 px-4 rounded-xl hover:bg-gray-50 hover:text-gray-900 transition-all">
            <Home className="w-6 h-6" /> Dashboard
          </a>
          <a href="/premium" className="flex items-center gap-3 font-semibold text-lg text-blue-600 bg-blue-50 py-3 px-4 rounded-xl transition-all">
            <Crown className="w-6 h-6" /> Premium
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
        <main className="flex-1 p-8 flex flex-col items-center">
          <div className="w-full max-w-4xl mx-auto">
            {/* Plan Card */}
            <div className={`flex items-center gap-4 p-6 rounded-2xl shadow-lg mb-8 bg-gradient-to-r ${PLAN_COLORS[plan]}`}> 
              <Crown className="w-10 h-10 text-white drop-shadow" />
              <div>
                <div className="text-2xl font-bold text-white capitalize">{plan} Plan</div>
                <div className="text-white/80 text-sm mt-1">Welcome, {user?.username}! Enjoy your premium benefits.</div>
              </div>
              <span className="ml-auto px-4 py-1 rounded-full bg-white/20 text-white font-semibold text-lg shadow">Premium</span>
            </div>

            {/* Trainer Profile Card */}
            <div className="flex flex-col md:flex-row gap-8 mb-10">
              {loading ? (
                <div className="bg-white rounded-2xl shadow-md flex flex-col items-center p-6 w-full md:w-1/3 border border-gray-100">
                  <div className="w-24 h-24 rounded-full bg-gray-200 animate-pulse mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded animate-pulse w-32 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-24 mb-4"></div>
                  <div className="space-y-2 w-full">
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
              ) : error ? (
                <div className="bg-white rounded-2xl shadow-md flex flex-col items-center p-6 w-full md:w-1/3 border border-gray-100">
                  <div className="text-center text-gray-500">
                    <div className="text-lg font-semibold mb-2">Trainer Unavailable</div>
                    <div className="text-sm">{error}</div>
                  </div>
                </div>
              ) : trainerData ? (
                <div className="bg-white rounded-2xl shadow-md flex flex-col items-center p-6 w-full md:w-1/3 border border-gray-100">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-200 shadow mb-4">
                    {trainerData.avatar ? (
                      <img src={trainerData.avatar} alt="Trainer" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
                        {trainerData.name ? trainerData.name.charAt(0).toUpperCase() : 'T'}
                      </div>
                    )}
                  </div>
                  <div className="font-bold text-xl text-gray-900 mb-1">{trainerData.name}</div>
                  <div className="text-sm text-gray-500 mb-2">{trainerData.specialization || 'Personal Trainer'}</div>
                  <div className="flex flex-col gap-1 text-gray-700 text-sm w-full">
                    <div><span className="font-semibold">Experience:</span> {trainerData.experience}</div>
                    <div><span className="font-semibold">Achievements:</span> {trainerData.achievements}</div>
                    {trainerData.rating && (
                      <div><span className="font-semibold">Rating:</span> ⭐ {trainerData.rating}/5</div>
                    )}
                    {trainerData.totalClients && (
                      <div><span className="font-semibold">Clients:</span> {trainerData.totalClients}+</div>
                    )}
                  </div>
                  <div className="flex gap-3 mt-4 w-full">
                    <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold shadow transition flex items-center justify-center gap-2">
                      <Phone className="w-5 h-5" /> Call Trainer
                    </button>
                    <button
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-blue-700 py-2 rounded-lg font-semibold shadow transition flex items-center justify-center gap-2"
                      onClick={() => setShowChat(true)}
                    >
                      <MessageCircle className="w-5 h-5" /> Message
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-md flex flex-col items-center p-6 w-full md:w-1/3 border border-gray-100">
                  <div className="text-center text-gray-500">
                    <div className="text-lg font-semibold mb-2">No Trainer Assigned</div>
                    <div className="text-sm">Please contact support to get assigned a trainer.</div>
                  </div>
                </div>
              )}
              {/* Diet & Workout Plan Cards */}
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Diet Plan */}
                <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center border border-gray-100">
                  <Utensils className="w-10 h-10 text-green-500 mb-2" />
                  <div className="font-bold text-lg mb-2">Diet Plan</div>
                  <ul className="text-gray-700 text-sm list-disc list-inside">
                    {dietPlan.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                </div>
                {/* Workout Plan */}
                <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center border border-gray-100">
                  <Dumbbell className="w-10 h-10 text-red-500 mb-2" />
                  <div className="font-bold text-lg mb-2">Workout Plan</div>
                  <ul className="text-gray-700 text-sm list-disc list-inside">
                    {workoutPlan.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                </div>
              </div>
            </div>

            {/* Features List */}
            <div className="bg-white rounded-2xl shadow p-8 mb-10 border border-gray-100">
              <div className="text-xl font-bold mb-4 flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-green-500" /> Included in your plan:
              </div>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-700 text-base">
                {PLAN_FEATURES[plan]?.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" /> {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Support/FAQ Section */}
            <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl shadow p-8 text-center">
              <div className="text-lg font-bold mb-2">Need help or have questions?</div>
              <div className="text-gray-700 mb-4">Contact our support team or your assigned trainer for personalized assistance.</div>
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-semibold shadow transition">Contact Support</button>
            </div>

            {/* Chat Modal */}
            {trainerData && (
              <TrainerChatModal open={showChat} onClose={() => setShowChat(false)} trainer={trainerData} user={user} />
            )}
          </div>
        </main>
      </div>

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
    </div>
  );
};

export default PremiumLoggedIn;
