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
    <div style={{ backgroundColor: '#121212', color: 'white', fontFamily: 'sans-serif' }}>

      {/* Hero Section */}
      <section
        className="hero"
        style={{
          backgroundImage: `url(${HeroImage})`,
          height: '80vh',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backdropFilter: 'blur(500px)',
          WebkitBackdropFilter: 'blur(10px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          paddingLeft: '5%',
          color: 'white',
        }}
      >
        <h1 style={{ fontSize: '3rem', fontWeight: 'bold' }}>Welcome to Speed Fitness</h1>
        <p style={{ fontSize: '1.2rem', maxWidth: '500px' }}>
          Speed Fitness मा स्वागत छ जहाँ बहाना सकिन्छ र सफलता सुरु हुन्छ।
        </p>
      </section>

      {/* Intro Section */}
      <section style={{ display: 'flex', padding: '50px', gap: '30px', alignItems: 'center' }}>
        <img src={Gym1} alt="gym1" style={{ width: '40%', borderRadius: '16px' }} />
        <div>
          <p style={{ fontSize: '1rem', lineHeight: '1.8', color: '#ccc' }}>
            Speed Fitness isn’t just a gym—it’s a community built for progress. Whether you’re here to lose weight,
            gain muscle, improve your stamina, or simply feel better, our space is designed to help you reach your goals.
            With modern equipment, experienced trainers, and a motivating atmosphere, we push you to become your
            strongest self—physically and mentally.
          </p>
        </div>
      </section>

      {/* About Section */}
      <section style={{ display: 'flex', flexDirection: 'row-reverse', padding: '50px', gap: '30px', alignItems: 'center' }}>
        <img src={Gym2} alt="gym2" style={{ width: '40%', borderRadius: '16px' }} />
        <div>
          <h2>About US</h2>
          <p style={{ fontSize: '1rem', lineHeight: '1.8', color: '#ccc' }}>
            Speed Fitness is your go-to destination for strength, stamina, and self-improvement. We offer modern
            equipment, expert trainers, and a supportive environment to help you crush your fitness goals whether you’re
            just starting or leveling up.
          </p>
        </div>
      </section>

      {/* Packages Section */}
      <section style={{ padding: '60px', textAlign: 'center' }}>
        <h2>Our Packages</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '30px', marginTop: '40px' }}>
          {packages.map((pkg, i) => (
            <div
              key={i}
              style={{
                backgroundColor: '#1e1e1e',
                borderRadius: '16px',
                padding: '20px 30px',
                width: '220px',
                boxShadow: '0 0 10px rgba(255, 255, 255, 0.05)'
              }}
            >
              <h3 style={{ color: 'white' }}>{pkg.label}</h3>
              <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#ff4747' }}>{pkg.price}</p>
              <p style={{ color: 'gray', fontSize: '14px' }}>{pkg.note}</p>
              <button style={{
                marginTop: '15px',
                padding: '10px 20px',
                backgroundColor: '#ff4747',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer'
              }}>
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
