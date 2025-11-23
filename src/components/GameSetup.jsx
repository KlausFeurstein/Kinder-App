import React from 'react';

const GameSetup = ({ onStart }) => {
  return (
    <div style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '2rem',
      padding: '1rem'
    }}>
      <h2 style={{ fontSize: '2.5rem', color: '#333', textAlign: 'center' }}>
        Select Time ⏱️
      </h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%', maxWidth: '300px' }}>
        {[1, 2, 3].map((minutes) => (
          <button
            key={minutes}
            onClick={() => onStart(minutes * 60)}
            style={{
              fontSize: '1.5rem',
              padding: '1rem',
              borderRadius: '25px',
              border: 'none',
              backgroundColor: '#4CAF50',
              color: 'white',
              boxShadow: '0 4px 0 #388E3C',
              cursor: 'pointer',
              transition: 'transform 0.1s'
            }}
          >
            {minutes} Minute{minutes > 1 ? 's' : ''}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GameSetup;
