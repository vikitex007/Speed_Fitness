import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { MessageCircle, User } from 'lucide-react';
import apiService from '../services/api';
import PageHeader from '../components/PageHeader';
import TrainerToUserChatModal from '../components/TrainerToUserChatModal';

const TrainerMessage = () => {
  const [conversations, setConversations] = useState([]);
  const [loadingConversations, setLoadingConversations] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        setLoadingConversations(true);
        const res = await apiService.getTrainerConversations();
        if (res.success) {
          setConversations(res.conversations);
        }
      } catch (err) {
        console.error('Error fetching conversations:', err);
      } finally {
        setLoadingConversations(false);
      }
    };

    const user = apiService.getCurrentUser();
    setCurrentUser(user);
    fetchConversations();
  }, []);

  const handleMessageUser = (user) => {
    setSelectedUser(user);
    setShowChat(true);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Sidebar role="trainer" activePage="message" />
      <div className="flex-1 flex flex-col min-h-screen">
        <PageHeader title="Messages" profilePicture={currentUser?.profilePicture} />
        <main className="flex-1 p-8 flex flex-col items-center">
          <div className="w-full max-w-4xl mx-auto">
            {/* Messages Header */}
            <div className="bg-white rounded-2xl shadow p-6 border border-gray-100 mb-6">
              <div className="text-xl font-bold mb-2 text-gray-900">Messages</div>
              <div className="text-gray-600">Manage conversations with your premium users</div>
            </div>

            {/* Conversations List */}
            <div className="bg-white rounded-2xl shadow border border-gray-100">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  Conversations <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold">{conversations.length}</span>
                </div>
              </div>
              
              {loadingConversations ? (
                <div className="text-center py-12">
                  <div className="text-gray-500">Loading conversations...</div>
                </div>
              ) : conversations.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-gray-500 mb-2">No messages yet</div>
                  <div className="text-sm text-gray-400">Messages from premium users will appear here</div>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {conversations.map((conversation, i) => (
                    <div 
                      key={i} 
                      className="flex items-center gap-4 p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => {
                        setSelectedUser(conversation._id);
                        setShowChat(true);
                      }}
                    >
                      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden">
                        {conversation._id.profilePicture ? (
                          <img src={conversation._id.profilePicture} alt="User" className="w-full h-full object-cover" />
                        ) : (
                          <User className="w-6 h-6 text-blue-500" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="font-semibold text-gray-900 truncate">
                            {conversation._id.name || conversation._id.username}
                          </div>
                          {conversation._id.membershipStatus && conversation._id.membershipStatus !== 'free' && (
                            <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 text-xs font-semibold capitalize">
                              {conversation._id.membershipStatus}
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-gray-600 truncate mb-1">
                          {conversation.lastMessage?.text || 'No messages yet'}
                        </div>
                        <div className="text-xs text-gray-400">
                          {conversation.lastMessage?.timestamp 
                            ? new Date(conversation.lastMessage.timestamp).toLocaleString()
                            : 'No recent activity'
                          }
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        {conversation.messageCount > 0 && (
                          <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">
                            {conversation.messageCount}
                          </span>
                        )}
                        <button className="p-2 rounded-full hover:bg-gray-100 text-blue-500" title="Open Chat">
                          <MessageCircle className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
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
          </div>
        </main>
      </div>
    </div>
  );
};

export default TrainerMessage;
