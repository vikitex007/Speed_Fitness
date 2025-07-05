import React from 'react';
import { User } from 'lucide-react';

const PageHeader = ({ title }) => (
  <header className="flex items-center justify-between px-8 py-6 bg-white border-b border-gray-200 shadow-sm">
    <div className="text-2xl font-bold text-gray-900">{title}</div>
    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center overflow-hidden border-2 border-white shadow-lg">
      <User className="w-7 h-7 text-white" />
    </div>
  </header>
);

export default PageHeader; 