import React from 'react';
import HeroImage from '../assets/a.jpg';
import Gym1 from '../assets/b.jpg';
import Gym2 from '../assets/b.jpg';

const Home = () => {
  const packages = [
    { label: 'Monthly', price: 'Rs 2000', note: '' },
    { label: '3 Months', price: 'Rs 5500', note: 'Save Rs 500' },
    { label: 'Semi Annually', price: 'Rs 9000', note: 'Save Rs 3000' },
    // { label: '9 Months', price: 'Rs 12000', note: 'Save Rs 6000' },
    { label: 'Annually', price: 'Rs 15000', note: 'Save Rs 9000' }
  ];

  return (
    <div className="bg-[#121212] text-white font-sans">
      {/* Hero Section */}
      <section className="relative flex items-center justify-center min-h-[70vh] md:min-h-[80vh] w-full overflow-hidden">
        <img src={HeroImage} alt="hero" className="absolute inset-0 w-full h-full object-cover object-center opacity-70" />
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 md:px-0">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">Welcome to <span className="text-red-500">Speed Fitness</span></h1>
          <p className="text-lg md:text-2xl max-w-xl mx-auto text-gray-100 font-medium drop-shadow-md">
            Speed Fitness मा स्वागत छ जहाँ बहाना सकिन्छ र सफलता सुरु हुन्छ।
          </p>
        </div>
        <div className="absolute inset-0 bg-black/60" />
      </section>

      {/* Intro Section */}
      <section className="flex flex-col md:flex-row items-center gap-10 md:gap-16 px-6 md:px-20 py-16">
        <img src={Gym1} alt="gym1" className="w-full md:w-2/5 rounded-2xl shadow-lg object-cover max-h-[350px]" />
        <div className="flex-1">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-red-500">A Community for Progress</h2>
          <p className="text-base md:text-lg text-gray-300 leading-relaxed">
            Speed Fitness isn't just a gym—it's a community built for progress. Whether you're here to lose weight,
            gain muscle, improve your stamina, or simply feel better, our space is designed to help you reach your goals.
            With modern equipment, experienced trainers, and a motivating atmosphere, we push you to become your
            strongest self—physically and mentally.
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="flex flex-col md:flex-row-reverse items-center gap-10 md:gap-16 px-6 md:px-20 py-16">
        <img src={Gym2} alt="gym2" className="w-full md:w-2/5 rounded-2xl shadow-lg object-cover max-h-[350px]" />
        <div className="flex-1">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-red-500">About Us</h2>
          <p className="text-base md:text-lg text-gray-300 leading-relaxed">
            Speed Fitness is your go-to destination for strength, stamina, and self-improvement. We offer modern
            equipment, expert trainers, and a supportive environment to help you crush your fitness goals whether you're
            just starting or leveling up.
          </p>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-20 px-4 md:px-0 bg-[#181818]">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-red-500">Our Packages</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {packages.map((pkg, i) => (
            <div
              key={i}
              className="bg-[#232323] rounded-2xl shadow-xl p-8 w-72 flex flex-col items-center border border-[#292929] hover:scale-105 transition-transform duration-200"
            >
              <h3 className="text-xl font-semibold mb-2 text-white">{pkg.label}</h3>
              <p className="text-3xl font-bold text-red-500 mb-1">{pkg.price}</p>
              <p className="text-gray-400 text-sm mb-4">{pkg.note}</p>
              <button className="mt-auto bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold shadow-md transition-colors duration-200">
                Join now
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
