import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, User } from 'lucide-react';

const TrainerChatModal = ({ open, onClose, trainer, user }) => {
  const [messages, setMessages] = useState([
    { sender: 'trainer', text: 'Hello' },
    { sender: 'user', text: 'Hi coach.' },
  ]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [open, messages]);

  if (!open) return null;

  const handleSend = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setMessages([...messages, { sender: 'user', text: input }]);
      setInput('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="w-full max-w-2xl bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl shadow-2xl border-2 border-blue-200 p-0 flex flex-col relative animate-fade-in">
        {/* Header */}
        <div className="flex items-center gap-4 px-6 py-4 border-b border-gray-200 bg-white rounded-t-2xl">
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 text-2xl font-bold focus:outline-none mr-2">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center overflow-hidden">
              {trainer.avatar ? (
                <img src={trainer.avatar} alt="Trainer" className="w-full h-full object-cover" />
              ) : (
                <User className="w-6 h-6 text-purple-500" />
              )}
            </div>
            <div>
              <div className="font-bold text-base text-gray-900">Trainer</div>
              <div className="text-xs text-gray-500">@{trainer.name?.toLowerCase()}</div>
            </div>
          </div>
        </div>
        {/* Chat Body */}
        <div className="flex-1 px-6 py-4 overflow-y-auto" style={{ minHeight: 300, maxHeight: 400 }}>
          {messages.map((msg, i) => (
            <div key={i} className={`flex mb-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`} >
              {msg.sender === 'trainer' && (
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-2">
                  {trainer.avatar ? (
                    <img src={trainer.avatar} alt="Trainer" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-5 h-5 text-purple-500" />
                  )}
                </div>
              )}
              <div className={`px-4 py-2 rounded-2xl text-sm font-medium shadow ${msg.sender === 'user' ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white' : 'bg-white text-gray-900 border border-gray-200'}`}>
                {msg.text}
              </div>
              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center ml-2">
                  {user?.profilePicture ? (
                    <img src={user.profilePicture} alt="User" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-5 h-5 text-blue-500" />
                  )}
                </div>
              )}
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
        {/* Input */}
        <form onSubmit={handleSend} className="flex items-center gap-3 px-6 py-4 bg-white rounded-b-2xl border-t border-gray-200">
          <input
            type="text"
            className="flex-1 rounded-full px-5 py-3 bg-gray-100 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 border border-gray-200"
            placeholder="Type your message"
            value={input}
            onChange={e => setInput(e.target.value)}
            autoFocus
          />
          <button type="submit" className="ml-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-2 rounded-full font-semibold shadow transition disabled:opacity-50" disabled={!input.trim()}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default TrainerChatModal; 