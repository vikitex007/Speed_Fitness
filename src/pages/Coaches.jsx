import React from 'react';
import { Star, Mail, Instagram, Facebook } from 'lucide-react';
import coach1 from '../assets/sita.png';
import coach2 from '../assets/ronnie.png';
import coach3 from '../assets/cbum.png';

const coaches = [
  {
    name: 'Sita Sharma',
    photo: coach1,
    specialty: 'Strength & Conditioning',
    bio: 'With over 10 years of experience in the fitness industry, Sita specializes in strength training and conditioning programs. She has helped hundreds of clients achieve their fitness goals through personalized workout plans and nutrition guidance. Her approach combines traditional strength training with modern functional fitness techniques.',
    certifications: ['ACE Certified', 'Nutrition Specialist'],
    socials: { instagram: '#', facebook: '#' }
  },
  {
    name: 'Ronnie Coleman',
    photo: coach2,
    specialty: 'Weight Loss & Nutrition',
    bio: 'David is a certified nutrition specialist with a passion for helping people transform their lives through sustainable weight loss strategies. He believes in creating lasting lifestyle changes rather than quick fixes. His programs focus on balanced nutrition, regular exercise, and mental wellness.',
    certifications: ['NASM CPT', 'Precision Nutrition'],
    socials: { instagram: '#', facebook: '#' }
  },
  {
    name: 'CBum' ,
    photo: coach3,
    specialty: 'Bodybuilding & Hypertrophy',
    bio: 'Ronnie is a professional bodybuilder and certified personal trainer with extensive experience in muscle building and hypertrophy training. He has competed at national levels and now dedicates his time to helping others build muscle, confidence, and discipline through structured training programs.',
    certifications: ['IFBB Pro', 'Certified Personal Trainer'],
    socials: { instagram: '#', facebook: '#' }
  }
];

const Coaches = () => (
  <div className="min-h-screen bg-black text-white py-16">
    <div className="max-w-5xl mx-auto px-4">
      <h1 className="text-4xl md:text-5xl font-black text-center mb-12">
        Meet Our <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">Coaches</span>
      </h1>
      <div className="flex flex-col gap-10">
        {coaches.map((coach, idx) => (
          <div key={idx} className={`bg-gray-900 rounded-2xl p-8 border border-gray-800 shadow-lg hover:scale-105 transition-transform duration-300 flex ${idx % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} items-center gap-8`}>
            <img src={coach.photo} alt={coach.name} className="w-32 h-32 rounded-full object-cover border-4 border-red-500 flex-shrink-0" />
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-1">{coach.name}</h2>
              <div className="text-red-400 font-semibold mb-2">{coach.specialty}</div>
              <p className="text-gray-300 mb-3 leading-relaxed">{coach.bio}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {coach.certifications.map((cert, i) => (
                  <span key={i} className="bg-gray-800 text-xs px-3 py-1 rounded-full flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-400" /> {cert}
                  </span>
                ))}
              </div>
              <div className="flex gap-3">
                <a href={coach.socials.instagram} target="_blank" rel="noopener noreferrer"><Instagram className="w-5 h-5 text-pink-400 hover:text-pink-500" /></a>
                <a href={coach.socials.facebook} target="_blank" rel="noopener noreferrer"><Facebook className="w-5 h-5 text-blue-400 hover:text-blue-500" /></a>
                <a href={`mailto:info@gym.com`}><Mail className="w-5 h-5 text-gray-300 hover:text-white" /></a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Coaches;
