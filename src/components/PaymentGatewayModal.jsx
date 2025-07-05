import React from 'react';
import khaltiLogo from '../assets/khalti.png';
import esewaLogo from '../assets/esewa.png';

const PaymentGatewayModal = ({ open, onClose, onSelect }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-8 relative animate-fade-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold focus:outline-none"
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Choose Payment Method</h2>
        <div className="flex flex-col gap-6">
          {/* Khalti */}
          <button
            onClick={() => onSelect('khalti')}
            className="flex items-center justify-center gap-4 border border-gray-200 rounded-xl py-4 px-6 hover:shadow-lg hover:border-purple-500 transition group"
          >
            <img src={khaltiLogo} alt="Khalti" className="w-16 h-10 object-contain" />
            <span className="text-lg font-semibold text-purple-700 group-hover:text-purple-900">Pay with Khalti</span>
          </button>
          {/* eSewa */}
          <button
            onClick={() => onSelect('esewa')}
            className="flex items-center justify-center gap-4 border border-gray-200 rounded-xl py-4 px-6 hover:shadow-lg hover:border-green-500 transition group"
          >
            <img src={esewaLogo} alt="eSewa" className="w-16 h-10 object-contain" />
            <span className="text-lg font-semibold text-green-700 group-hover:text-green-900">Pay with eSewa</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentGatewayModal; 