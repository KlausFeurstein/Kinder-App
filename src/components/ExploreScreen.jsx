import React, { useState, useEffect } from 'react';
import { ExploreVisuals } from './ExploreVisuals';

const ExploreScreen = () => {
  const [currentView, setCurrentView] = useState('exterior');

  useEffect(() => {
    // Cleanup audio on unmount
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const speak = (text) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  };

  const handleInteract = (item) => {
    // Map item IDs to display text if needed, or just capitalize
    const text = item.charAt(0).toUpperCase() + item.slice(1);
    speak(text);
  };

  const handleNavigation = (view) => {
    setCurrentView(view);
  };

  const renderView = () => {
    switch (currentView) {
      case 'exterior':
        return (
          <ExploreVisuals.exterior 
            onInteract={handleInteract} 
            onEnter={() => handleNavigation('living_room')} 
          />
        );
      case 'living_room':
        return (
          <ExploreVisuals.living_room 
            onInteract={handleInteract} 
            onNavigate={handleNavigation} 
          />
        );
      case 'kitchen':
        return (
          <ExploreVisuals.kitchen 
            onInteract={handleInteract} 
            onNavigate={handleNavigation} 
          />
        );
      case 'bathroom':
        return (
          <ExploreVisuals.bathroom 
            onInteract={handleInteract} 
            onNavigate={handleNavigation} 
          />
        );
      default:
        return <div>Unknown View</div>;
    }
  };

  return (
    <div style={{ width: '100%', height: '100vh', backgroundColor: '#f0f0f0', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '10px', backgroundColor: '#2196F3', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0 }}>Explore the House</h2>
        {currentView !== 'exterior' && (
            <button 
                onClick={() => handleNavigation('exterior')}
                style={{ padding: '5px 10px', backgroundColor: '#fff', color: '#2196F3', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
            >
                Go Outside
            </button>
        )}
      </div>
      <div style={{ flex: 1, padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {renderView()}
      </div>
    </div>
  );
};

export default ExploreScreen;
