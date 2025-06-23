import React from 'react';
import Coach1 from '../assets/ronnie.png';
import Coach2 from '../assets/sita.png';
import Coach3 from '../assets/cbum.png';

const coaches = [
  {
    name: 'Ramesh Shrestha',
    image: Coach1,
    description: 'Certified personal trainer with 10+ years of experience in strength training, weight loss, and nutrition. Ramesh is passionate about helping clients achieve their best selves through personalized programs and motivation.'
  },
  {
    name: 'Sita Gurung',
    image: Coach2,
    description: 'Specialist in yoga, flexibility, and holistic wellness. Sita brings a calm, supportive approach to fitness, focusing on both body and mind for a balanced, healthy lifestyle.'
  },
  {
    name: 'Bikash Lama',
    image: Coach3,
    description: 'Expert in HIIT, endurance, and athletic performance. Bikash pushes clients to their limits with energetic sessions and a results-driven mindset.'
  }
];

const Coaches = () => {
  return (
    <div className="min-h-screen bg-[#181818] py-12 px-4 flex flex-col gap-10">
      <h1 className="text-4xl font-bold text-center text-red-500 mb-8">Meet Our Coaches</h1>
      {coaches.map((coach, idx) => (
        <div
          key={coach.name}
          className="flex flex-col md:flex-row w-full max-w-5xl mx-auto bg-[#232323] rounded-2xl shadow-xl overflow-hidden min-h-[320px]"
          style={{ minHeight: '320px' }}
        >
          {/* Left: Image */}
          <div className="md:w-1/2 w-full h-64 md:h-auto flex items-center justify-center bg-black/30">
            <img
              src={coach.image}
              alt={coach.name}
              className="object-cover w-full h-full md:rounded-l-2xl md:rounded-r-none rounded-t-2xl md:rounded-t-none"
              style={{ maxHeight: '350px' }}
            />
          </div>
          {/* Right: Description */}
          <div className="md:w-1/2 w-full flex flex-col justify-center p-8 text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-red-500">{coach.name}</h2>
            <p className="text-base md:text-lg text-gray-200 leading-relaxed">{coach.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Coaches;
