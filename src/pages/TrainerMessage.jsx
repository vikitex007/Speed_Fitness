import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { MessageCircle, User } from 'lucide-react';
import apiService from '../services/api';
import PageHeader from '../components/PageHeader';

const TrainerMessage = () => {
  const [premiumUsers, setPremiumUsers] = useState([]);
  const [showChat, setShowChat] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchPremiumUsers = async () => {
      try {
        const res = await apiService.getPremiumUsers();
        if (res.success) {
          setPremiumUsers(res.data);
        }
      } catch (err) {
        // Optionally handle error
      }
    };
    fetchPremiumUsers();
  }, []);

  const handleMessageUser = (user) => {
    setSelectedUser(user);
    setShowChat(true);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Sidebar role="trainer" activePage="message" />
      <div className="flex-1 flex flex-col min-h-screen">
        <PageHeader title="Message" />
        <main className="flex-1 p-8 flex flex-col items-center">
          <div className="w-full max-w-3xl mx-auto">
            {/* User List Card */}
            <div className="bg-white rounded-2xl shadow p-0 border border-gray-100">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Start Messaging</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                    <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {premiumUsers.length === 0 && (
                    <tr>
                      <td colSpan={3} className="text-gray-500 text-center py-6">No premium users available.</td>
                    </tr>
                  )}
                  {premiumUsers.map((user, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="px-6 py-4 flex items-center gap-3">
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
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                          <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span> Active
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button className="p-2 rounded hover:bg-gray-100 text-black" title="Message" onClick={() => handleMessageUser(user)}>
                          <MessageCircle className="w-6 h-6" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Chat Modal Placeholder */}
            {showChat && selectedUser && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
                <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full">
                  <div className="text-lg font-semibold mb-4">Chat with {selectedUser.name || selectedUser.username}</div>
                  <div className="mb-6">(Chat UI goes here)</div>
                  <div className="flex justify-end gap-3">
                    <button onClick={() => setShowChat(false)} className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">Close</button>
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

export default TrainerMessage;
