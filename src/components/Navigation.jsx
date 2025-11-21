import React from 'react';

const Navigation = ({ currentMode, onNavigate }) => {
  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-around',
      padding: '1rem',
      backgroundColor: 'white',
      boxShadow: '0 -2px 10px rgba(0,0,0,0.1)',
      position: 'fixed',
      bottom: 0,
      width: '100%',
      zIndex: 100
    }}>
      <button 
        onClick={() => onNavigate('home')}
        style={{
          fontSize: '2rem',
          background: 'none',
          border: 'none',
          opacity: currentMode === 'home' ? 1 : 0.5
        }}
      >
        🏠
      </button>
      <button 
        onClick={() => onNavigate('gallery')}
        style={{
          fontSize: '2rem',
          background: 'none',
          border: 'none',
          opacity: currentMode === 'gallery' ? 1 : 0.5
        }}
      >
        🖼️
      </button>
      <button 
        onClick={() => onNavigate('learn')}
        style={{
          fontSize: '2rem',
          background: 'none',
          border: 'none',
          opacity: currentMode === 'learn' ? 1 : 0.5
        }}
      >
        📚
      </button>
      <button 
        onClick={() => onNavigate('quiz')}
        style={{
          fontSize: '2rem',
          background: 'none',
          border: 'none',
          opacity: currentMode === 'quiz' ? 1 : 0.5
        }}
      >
        🎮
      </button>
    </nav>
  );
};

export default Navigation;
