import React, { useState, useEffect } from 'react';
import { ExploreVisuals } from './ExploreVisuals';
import { useSpeech } from '../hooks/useSpeech';

const ExploreScreen = () => {
  const scenes = ['exterior', 'living_room', 'kitchen', 'bathroom'];
  const [currentIndex, setCurrentIndex] = useState(0);
  const { speak } = useSpeech();

  useEffect(() => {
    // Cleanup audio on unmount
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const handleInteract = (item) => {
    // Map item IDs to display text if needed, or just capitalize
    const text = item.charAt(0).toUpperCase() + item.slice(1);
    speak(text);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % scenes.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + scenes.length) % scenes.length);
  };

  const currentView = scenes[currentIndex];

  const renderView = () => {
    const Component = ExploreVisuals[currentView];
    if (Component) {
      return <Component onInteract={handleInteract} />;
    }
    return <div>Unknown View</div>;
  };

  return (
    <div style={{ width: '100%', height: '100vh', backgroundColor: '#f0f0f0', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '10px', backgroundColor: '#2196F3', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <h2 style={{ margin: 0 }}>Explore: {currentView.replace('_', ' ').toUpperCase()}</h2>
      </div>
      
      <div style={{ flex: 1, padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
        {renderView()}
      </div>

      <div style={{ 
        padding: '20px', 
        backgroundColor: 'white', 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '2rem',
        boxShadow: '0 -2px 10px rgba(0,0,0,0.1)'
      }}>
        <button 
          onClick={handlePrev}
          style={{
            fontSize: '1.5rem',
            padding: '10px 30px',
            backgroundColor: '#FF9800',
            color: 'white',
            border: 'none',
            borderRadius: '50px',
            cursor: 'pointer',
            boxShadow: '0 4px 0 #F57C00'
          }}
        >
          ⬅️ Previous
        </button>
        <button 
          onClick={handleNext}
          style={{
            fontSize: '1.5rem',
            padding: '10px 30px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '50px',
            cursor: 'pointer',
            boxShadow: '0 4px 0 #388E3C'
          }}
        >
          Next ➡️
        </button>
      </div>
      
      {/* Spacer for bottom navigation */}
      <div style={{ height: '80px' }}></div>
    </div>
  );
};

export default ExploreScreen;
