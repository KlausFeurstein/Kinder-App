import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import dianaImg from '../assets/profileImages/Diana.png';
import klausImg from '../assets/profileImages/Klaus.png';
import lisaImg from '../assets/profileImages/Lisa.png';
import valentinImg from '../assets/profileImages/Valentin.png';

const profiles = [
  { id: 'diana', name: 'Diana', img: dianaImg },
  { id: 'klaus', name: 'Klaus', img: klausImg },
  { id: 'lisa', name: 'Lisa', img: lisaImg },
  { id: 'valentin', name: 'Valentin', img: valentinImg },
];

const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [isEnteringName, setIsEnteringName] = useState(false);
  const { login } = useUser();

  const handleProfileSelect = (profile) => {
    login({ type: 'image', value: profile.img, name: profile.name });
  };

  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      login({ type: 'text', value: name.trim(), name: name.trim() });
    }
  };

  if (isEnteringName) {
    return (
      <div style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)',
        fontFamily: '"Comic Sans MS", "Chalkboard SE", sans-serif'
      }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '2rem', color: '#333' }}>
          What is your name? ✍️
        </h1>
        
        <form onSubmit={handleNameSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name"
            style={{
              fontSize: '2rem',
              padding: '1rem 2rem',
              borderRadius: '50px',
              border: '4px solid #FFD700',
              textAlign: 'center',
              outline: 'none',
              width: '300px'
            }}
            autoFocus
          />
          
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button
              type="button"
              onClick={() => setIsEnteringName(false)}
              style={{
                fontSize: '1.5rem',
                padding: '1rem 2rem',
                borderRadius: '50px',
                border: 'none',
                background: '#ccc',
                color: 'white',
                cursor: 'pointer'
              }}
            >
              Back
            </button>
            <button
              type="submit"
              disabled={!name.trim()}
              style={{
                fontSize: '1.5rem',
                padding: '1rem 2rem',
                borderRadius: '50px',
                border: 'none',
                background: name.trim() ? '#4CAF50' : '#ccc',
                color: 'white',
                cursor: name.trim() ? 'pointer' : 'not-allowed'
              }}
            >
              Start! 🚀
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)',
      fontFamily: '"Comic Sans MS", "Chalkboard SE", sans-serif'
    }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '3rem', color: '#333' }}>
        Who is playing? 🧒
      </h1>
      
      <div style={{ 
        display: 'flex', 
        gap: '2rem', 
        flexWrap: 'wrap', 
        justifyContent: 'center',
        maxWidth: '1000px'
      }}>
        {profiles.map((profile) => (
          <button
            key={profile.id}
            onClick={() => handleProfileSelect(profile)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              transition: 'transform 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <div style={{
              width: '150px',
              height: '150px',
              borderRadius: '50%',
              overflow: 'hidden',
              border: '5px solid white',
              boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
              marginBottom: '1rem'
            }}>
              <img src={profile.img} alt={profile.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <span style={{ fontSize: '1.5rem', color: '#555', fontWeight: 'bold' }}>{profile.name}</span>
          </button>
        ))}

        {/* 5th Option: Enter Name */}
        <button
          onClick={() => setIsEnteringName(true)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            transition: 'transform 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <div style={{
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            backgroundColor: '#f0f0f0',
            border: '5px solid white',
            boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '3rem'
          }}>
            ✍️
          </div>
          <span style={{ fontSize: '1.5rem', color: '#555', fontWeight: 'bold' }}>Enter Name</span>
        </button>
      </div>
    </div>
  );
};

export default ProfileScreen;
