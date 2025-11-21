import React, { useState } from 'react';
import { useUser } from '../context/UserContext';

const ProfileScreen = () => {
  const [name, setName] = useState('');
  const { login } = useUser();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      login(name.trim());
    }
  };

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
        Who is playing? 🧒
      </h1>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
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
        
        <button
          type="submit"
          disabled={!name.trim()}
          style={{
            fontSize: '2rem',
            padding: '1rem 3rem',
            borderRadius: '50px',
            border: 'none',
            background: name.trim() ? '#4CAF50' : '#ccc',
            color: 'white',
            cursor: name.trim() ? 'pointer' : 'not-allowed',
            transform: name.trim() ? 'scale(1.05)' : 'scale(1)',
            transition: 'all 0.2s'
          }}
        >
          Let's Play! 🚀
        </button>
      </form>
    </div>
  );
};

export default ProfileScreen;
