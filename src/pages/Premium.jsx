import React, { useState } from 'react';
import SilverImg from '../assets/silver.png'; // Replace with your silver image
import GoldImg from '../assets/gold.png';   // Replace with your gold image
import PlatinumImg from '../assets/plat.png'; // Replace with your platinum image
import PaymentGatewayModal from '../components/PaymentGatewayModal';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const packages = [
  {
    name: 'Silver Package',
    bg: 'bg-[#787878]',
    image: SilverImg,
    price: 'Rs 2500/mth',
    details: [
      'Personalized basic diet plan',
      'Custom workout plan',
      'Monthly progress check-in',
      'WhatsApp/email support (once a week)'
    ]
  },
  {
    name: 'Gold Package',
    bg: 'bg-[#B4822B]',
    image: GoldImg,
    price: 'Rs 3500/mth',
    details: [
      'Advanced personalized diet plan',
      'Goal-specific workout plan (fat loss, muscle gain, etc.)',
      'Bi-weekly progress check-ins with feedback',
      'WhatsApp/email support (twice a week)',
      'Supplement guidance (optional)',
      'Access to one live Q&A session per month'
    ]
  },
  {
    name: 'Platinum Package',
    bg: 'bg-[#356166]',
    image: PlatinumImg,
    price: 'Rs 5000/mth',
    details: [
      'Fully customized diet & training plan (updated every week)',
      'Workout split designed per your body type & goal',
      'Weekly progress checks + real-time tracking',
      'Priority WhatsApp/email support (up to 4x/week)',
      '1-on-1 video consultation (monthly)'
    ]
  }
];

const Premium = () => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);

  const handlePaymentSelect = (method) => {
    alert(`Selected: ${method} for ${selectedPackage || 'Join Now'}`);
    setShowPaymentModal(false);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-black py-10 px-2 md:px-8 text-white">
        <h1 className="text-4xl font-bold text-center text-red-500 mb-10">Premium Service</h1>
        <div className="flex justify-center mb-8">
          {/* <button
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-bold text-lg shadow transition-colors"
            onClick={() => { setSelectedPackage('Join Now'); setShowPaymentModal(true); }}
          >
            Join Now
          </button> */}
        </div>
        <div className="flex flex-col gap-10">
          {packages.map((pkg, idx) => (
            <div
              key={pkg.name}
              className={`flex flex-col md:flex-row items-stretch rounded-2xl shadow-xl ${pkg.bg} max-w-4xl mx-auto min-h-[420px] md:h-[420px] w-full border border-gray-800`}
            >
              {/* Left: Image */}
              <div className="md:w-64 w-full flex justify-center items-center p-8 md:p-0 bg-black/20">
                <img
                  src={pkg.image}
                  alt={pkg.name}
                  className="w-32 h-32 md:w-36 md:h-36 object-contain rounded-xl shadow-lg bg-white/10"
                />
              </div>
              {/* Right: Details */}
              <div className="flex-1 flex flex-col justify-between p-6 md:p-10 text-white h-full bg-black/10 rounded-r-2xl">
                <div className="flex flex-col justify-center h-full max-w-xl mx-auto w-full">
                  <h2 className="text-2xl md:text-3xl font-bold mb-3 text-white text-left">{pkg.name}</h2>
                  <ul className="text-base md:text-lg text-gray-100 leading-relaxed mb-6 list-disc list-inside pl-2">
                    {pkg.details.map((d, i) => (
                      <li key={i} className="mb-1 last:mb-0">{d}</li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-center gap-6 flex-wrap mt-2 md:mt-4">
                  <span className="text-2xl md:text-3xl font-bold text-red-500">{pkg.price}</span>
                  <button
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md font-semibold shadow transition-colors"
                    onClick={() => { setSelectedPackage(pkg.name); setShowPaymentModal(true); }}
                  >
                    Upgrade
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <PaymentGatewayModal
          open={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          onSelect={handlePaymentSelect}
        />
      </div>
      <Footer />
    </>
  );
};

export default Premium;
