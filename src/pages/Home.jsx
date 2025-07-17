import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { 
  Dumbbell, 
  Users, 
  Clock, 
  Award, 
  Star, 
  ArrowRight, 
  Play, 
  CheckCircle,
  TrendingUp,
  Heart,
  Zap,
  Target
} from 'lucide-react';
import Gym1 from '../assets/b.jpg';
import HeroVideo from '../assets/hero-video.mp4';




const Home = () => {
  const [videoError, setVideoError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const packages = [
    { 
      label: 'Monthly', 
      price: 'Rs 2000', 
      duration: '1 Month',
      features: [
        'Personalized basic diet plan',
        'Custom workout plan',
        'Monthly progress check-in',
        'WhatsApp/email support (once a week)'
      ],
      popular: false
    },
    { 
      label: '3 Months', 
      price: 'Rs 5500', 
      duration: '3 Months',
      features: [
        'Personalized basic diet plan',
        'Custom workout plan',
        'Monthly progress check-in',
        'WhatsApp/email support (once a week)'
      ],
      popular: false,
      savings: 'Save Rs 500'
    },
    { 
      label: '6 Months', 
      price: 'Rs 9000', 
      duration: '6 Months',
      features: [
        'Personalized basic diet plan',
        'Custom workout plan',
        'Monthly progress check-in',
        'WhatsApp/email support (once a week)'
      ],
      popular: false,
      savings: 'Save Rs 3000'
    },
    { 
      label: 'Yearly', 
      price: 'Rs 15000', 
      duration: '12 Months',
      features: [
        'Personalized basic diet plan',
        'Custom workout plan',
        'Monthly progress check-in',
        'WhatsApp/email support (once a week)'
      ],
      popular: false,
      savings: 'Save Rs 9000'
    }
  ];

  const features = [
    {
      icon: Dumbbell,
      title: 'Modern Equipment',
      description: 'State-of-the-art fitness equipment from leading brands'
    },
    {
      icon: Users,
      title: 'Expert Trainers',
      description: 'Certified personal trainers with years of experience'
    },
    {
      icon: Clock,
      title: 'Flexible Hours',
      description: 'Open early morning to late night for your convenience'
    },
    {
      icon: Award,
      title: 'Proven Results',
      description: 'Thousands of success stories from our members'
    }
  ];

  const stats = [
    { number: '200+', label: 'Active Members', icon: Users },
    { number: '3+', label: 'Expert Trainers', icon: Award },
    { number: '100+', label: 'Equipment Pieces', icon: Dumbbell },
    { number: '24/7', label: 'Support Available', icon: Clock }
  ];

  const handleVideoError = () => {
    setVideoError(true);
  };
  const navigate = useNavigate();

  return (
    <div className="bg-black text-white font-sans overflow-hidden">
      {/* Hero Section */}
      <section className="relative flex items-center justify-center min-h-screen w-full overflow-hidden p-0 m-0 border-none">
        {!videoError ? (
          <video 
            autoPlay 
            muted 
            loop 
            playsInline
            onError={handleVideoError}
            className="absolute inset-0 w-full h-full object-cover object-center opacity-60"
          >
            <source src={HeroVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-red-900 via-gray-900 to-black opacity-80" />
        )}
        
        {/* Animated overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
        
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 md:px-0 max-w-6xl mx-auto">
          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
              <span className="bg-gradient-to-r from-red-500 via-red-600 to-orange-500 bg-clip-text text-transparent">
                TRANSFORM
              </span>
              <br />
              <span className="text-white">YOUR BODY</span>
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-200 font-light mb-8 leading-relaxed">
              Join Speed Fitness and unleash your potential. Where excuses end and results begin.
              <br />
              <span className="text-red-400 font-medium">Speed Fitness मा स्वागत छ जहाँ बहाना सकिन्छ र सफलता सुरु हुन्छ।</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                className="group bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 rounded-full font-bold text-lg shadow-2xl hover:shadow-red-500/25 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                onClick={() => navigate('/register')}
              >
                Start Your Journey
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div 
                  key={index}
                  className="text-center transform transition-all duration-700"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl md:text-4xl font-black text-red-500 mb-2">{stat.number}</div>
                  <div className="text-gray-300 font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              Why Choose <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">Speed Fitness</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We provide everything you need to achieve your fitness goals in a supportive, motivating environment.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div 
                  key={index}
                  className="group bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-700 hover:border-red-500/50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-red-500/10"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-white">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-black mb-6">
                More Than Just a <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">Gym</span>
              </h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Speed Fitness is a community of dedicated individuals pushing their limits and achieving extraordinary results. 
                Our state-of-the-art facility combines cutting-edge equipment with expert guidance to create the ultimate 
                fitness experience.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <CheckCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
                  <span className="text-gray-300">Professional trainers with international certifications</span>
                </div>
                <div className="flex items-center gap-4">
                  <CheckCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
                  <span className="text-gray-300">Latest equipment from world-renowned brands</span>
                </div>
                <div className="flex items-center gap-4">
                  <CheckCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
                  <span className="text-gray-300">Personalized training programs for every level</span>
                </div>
                <div className="flex items-center gap-4">
                  <CheckCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
                  <span className="text-gray-300">Supportive community of fitness enthusiasts</span>
                </div>
              </div>
            </div>
            
            <div>
              <div className="relative">
                <img src={Gym1} alt="Gym interior" className="rounded-2xl shadow-2xl" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                        <Target className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-white font-bold">Transform Your Life</div>
                        <div className="text-gray-300 text-sm">Join thousands of success stories</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              Choose Your <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">Plan</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Flexible membership options designed to fit your lifestyle and fitness goals.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {packages.map((pkg, index) => (
              <div
                key={index}
                className={`relative group ${
                  pkg.popular ? 'lg:scale-110 z-10' : ''
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                      MOST POPULAR
                    </div>
                  </div>
                )}
                
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700 hover:border-red-500/50 transition-all duration-300 h-full flex flex-col group-hover:shadow-2xl group-hover:shadow-red-500/10">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-white mb-2">{pkg.label}</h3>
                    <div className="text-4xl font-black text-red-500 mb-1">{pkg.price}</div>
                    <div className="text-gray-400 mb-2">{pkg.duration}</div>
                    {pkg.savings && (
                      <div className="text-green-400 text-sm font-medium">{pkg.savings}</div>
                    )}
                  </div>
                  
                  <div className="flex-1 space-y-3 mb-8">
                    {pkg.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
              
                  
                    <button onClick={() => navigate('/register')}
                      type="button"
                      className={`w-full py-3 px-6 rounded-xl font-bold transition-all duration-300 transform group-hover:scale-105 ${
                        pkg.popular
                          ? 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg'
                          : 'bg-gray-700 hover:bg-gray-600 text-white'
                      }`}
                    >
                      Get Started
                    </button>
                  
                </div>
            </div>
          ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
