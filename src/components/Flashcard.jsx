import React, { useState } from 'react';
import { useSpeech } from '../hooks/useSpeech';

const Flashcard = ({ item, onResult }) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const { speakDual } = useSpeech();

  // Auto-play removed as per request

  const handleReveal = () => {
    setIsRevealed(true);
  };

  const handleResult = (result) => {
    if (onResult) onResult(result);
    // No need to reset state here because the parent will unmount us (key change)
  };

  return (
    <div style={{ 
      width: '320px', 
      minHeight: '500px', // Taller to fit everything
      backgroundColor: 'white',
      borderRadius: '30px',
      boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '2rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      
      {/* Image Section - Always Visible */}
      <div style={{ marginBottom: '1.5rem', transform: 'scale(1)', transition: 'transform 0.3s' }}>
        <div style={{ fontSize: '8rem', lineHeight: '1' }}>
          {item.image && (item.image.includes('/') || item.image.includes('.')) ? (
            <img src={item.image} alt={item.english} style={{ width: '180px', height: '180px', objectFit: 'contain' }} />
          ) : (
            item.image
          )}
        </div>
      </div>

      {/* Audio Button - Only Visible When Revealed */}
      {isRevealed && (
        <button 
          onClick={(e) => { 
            e.stopPropagation(); 
            speakDual(item.english, 'en-US', item.german, 'de-DE'); 
          }}
          style={{
            background: 'var(--secondary-color)',
            border: 'none',
            borderRadius: '50%',
            width: '60px',
            height: '60px',
            fontSize: '2rem',
            color: 'white',
            cursor: 'pointer',
            boxShadow: '0 4px 0 #3aa8a0',
            marginBottom: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: 'popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
          }}
        >
          🔊
        </button>
      )}

      {/* Interaction Section */}
      {!isRevealed ? (
        <button
          onClick={handleReveal}
          style={{
            width: '100%',
            padding: '1.5rem',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: 'white',
            backgroundColor: '#333',
            border: 'none',
            borderRadius: '20px',
            cursor: 'pointer',
            marginTop: 'auto', // Push to bottom
            boxShadow: '0 4px 0 #000'
          }}
        >
          👀 Show Answer
        </button>
      ) : (
        <div style={{ 
          width: '100%', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          animation: 'slideUp 0.3s ease-out'
        }}>
          <h2 style={{ fontSize: '3rem', color: 'var(--primary-color)', margin: '0 0 0.5rem 0' }}>{item.english}</h2>
          <p style={{ fontSize: '1.5rem', color: '#888', margin: '0 0 2rem 0' }}>{item.german}</p>
          
          <div style={{ display: 'flex', gap: '1rem', width: '100%' }}>
            <button
              onClick={() => handleResult('hard')}
              style={{
                flex: 1,
                padding: '1rem',
                borderRadius: '15px',
                border: 'none',
                backgroundColor: '#FF9F43',
                color: 'white',
                fontSize: '1.2rem',
                cursor: 'pointer',
                boxShadow: '0 4px 0 #e58e3c'
              }}
            >
              🤔 Hard
            </button>
            <button
              onClick={() => handleResult('easy')}
              style={{
                flex: 1,
                padding: '1rem',
                borderRadius: '15px',
                border: 'none',
                backgroundColor: '#4CAF50',
                color: 'white',
                fontSize: '1.2rem',
                cursor: 'pointer',
                boxShadow: '0 4px 0 #388E3C'
              }}
            >
              🟢 I knew it!
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes popIn {
          from { transform: scale(0); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default Flashcard;
