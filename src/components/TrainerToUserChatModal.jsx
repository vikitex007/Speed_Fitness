import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, User, Send } from 'lucide-react';
import apiService from '../services/api';

const TrainerToUserChatModal = ({ open, onClose, trainer, user }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);
  const chatEndRef = useRef(null);

  // Fetch messages when modal opens
  useEffect(() => {
    if (open && user?._id) {
      fetchMessages();
    }
  }, [open, user?._id]);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (open) {
      setTimeout(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [open, messages]);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      setError(null);
      let response;
      if (trainer?.userType === 'trainer') {
        response = await apiService.getMessagesWithUser(user._id);
      } else {
        response = await apiService.getMessages(user._id);
      }
      if (response.success) {
        setMessages(response.messages);
      } else {
        setError('Failed to load messages');
      }
    } catch (err) {
      console.error('Error fetching messages:', err);
      setError('Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || sending) return;

    try {
      setSending(true);
      setError(null);
      let response;
      if (trainer?.userType === 'trainer') {
        response = await apiService.sendMessageToUser(user._id, input.trim());
      } else {
        response = await apiService.sendMessage(user._id, input.trim());
      }
      if (response.success) {
        setMessages(prev => [...prev, response.message]);
        setInput('');
      } else {
        setError('Failed to send message');
      }
    } catch (err) {
      console.error('Error sending message:', err);
      setError('Failed to send message');
    } finally {
      setSending(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="w-full max-w-2xl bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl shadow-2xl border-2 border-blue-200 p-0 flex flex-col relative animate-fade-in">
        {/* Header */}
        <div className="flex items-center gap-4 px-6 py-4 border-b border-gray-200 bg-white rounded-t-2xl">
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 text-2xl font-bold focus:outline-none mr-2">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden">
              {user.profilePicture ? (
                <img src={user.profilePicture} alt="User" className="w-full h-full object-cover" />
              ) : (
                <User className="w-6 h-6 text-blue-500" />
              )}
            </div>
            <div>
              <div className="font-bold text-base text-gray-900">{user.name || user.username}</div>
              <div className="text-xs text-gray-500">@{user.username?.toLowerCase()}</div>
              {user.membershipStatus && user.membershipStatus !== 'free' && (
                <div className="text-xs text-purple-600 font-semibold capitalize">{user.membershipStatus} Member</div>
              )}
            </div>
          </div>
        </div>
        {/* Chat Body */}
        <div className="flex-1 px-6 py-4 overflow-y-auto" style={{ minHeight: 300, maxHeight: 400 }}>
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-gray-500">Loading messages...</div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-red-500 text-center">
                <div className="font-semibold mb-2">Error</div>
                <div className="text-sm">{error}</div>
                <button 
                  onClick={fetchMessages}
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600"
                >
                  Retry
                </button>
              </div>
            </div>
          ) : messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-gray-500 text-center">
                <div className="font-semibold mb-2">No messages yet</div>
                <div className="text-sm">Start a conversation with {user.name || user.username}!</div>
              </div>
            </div>
          ) : (
            messages.map((msg, i) => {
              const isTrainer = msg.sender._id === trainer?._id || msg.sender === trainer?._id;
              return (
                <div key={msg._id || i} className={`flex mb-3 ${isTrainer ? 'justify-end' : 'justify-start'}`}>
                  {!isTrainer && (
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                      {user.profilePicture ? (
                        <img src={user.profilePicture} alt="User" className="w-full h-full object-cover" />
                      ) : (
                        <User className="w-5 h-5 text-blue-500" />
                      )}
                    </div>
                  )}
                  <div className={`px-4 py-2 rounded-2xl text-sm font-medium shadow max-w-xs break-words ${
                    isTrainer 
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white' 
                      : 'bg-white text-gray-900 border border-gray-200'
                  }`}>
                    {msg.text}
                    <div className={`text-xs mt-1 ${isTrainer ? 'text-white/70' : 'text-gray-500'}`}>
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                  {isTrainer && (
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center ml-2">
                      {trainer?.profilePicture ? (
                        <img src={trainer.profilePicture} alt="Trainer" className="w-full h-full object-cover" />
                      ) : (
                        <User className="w-5 h-5 text-purple-500" />
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
          <div ref={chatEndRef} />
        </div>
        {/* Input */}
        <form onSubmit={handleSend} className="flex items-center gap-3 px-6 py-4 bg-white rounded-b-2xl border-t border-gray-200">
          <input
            type="text"
            className="flex-1 rounded-full px-5 py-3 bg-gray-100 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 border border-gray-200 disabled:opacity-50"
            placeholder={sending ? "Sending..." : "Type your message"}
            value={input}
            onChange={e => setInput(e.target.value)}
            disabled={sending || loading}
            autoFocus
          />
          <button 
            type="submit" 
            className="ml-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-2 rounded-full font-semibold shadow transition disabled:opacity-50 flex items-center gap-2" 
            disabled={!input.trim() || sending || loading}
          >
            {sending ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Sending
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Send
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TrainerToUserChatModal; 