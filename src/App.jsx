import React, { useState, useEffect } from 'react';
import { UserProvider, useUser } from './context/UserContext';
import Navigation from './components/Navigation';
import GameScreen from './components/GameScreen';
import CategorySelect from './components/CategorySelect';
import GalleryScreen from './components/GalleryScreen';
import ExploreScreen from './components/ExploreScreen';
import ProfileScreen from './components/ProfileScreen';
import GameSetup from './components/GameSetup';

function AppContent() {
  const [step, setStep] = useState('home'); // 'home', 'profile', 'setup', 'category', 'game', 'gallery', 'explore'
  const [mode, setMode] = useState(null); // 'learn', 'quiz'
  const [category, setCategory] = useState(null);
  const [gameTime, setGameTime] = useState(60);
  const { currentUser, logout, highScores } = useUser();

  // Effect to handle auto-transition after login if waiting for quiz
  useEffect(() => {
    if (step === 'profile' && currentUser) {
      setStep('setup');
    }
  }, [currentUser, step]);

  const handleNavigate = (target) => {
    if (target === 'home') {
      setStep('home');
      setMode(null);
      setCategory(null);
    } else if (target === 'gallery') {
      setStep('gallery');
      setMode('gallery');
    } else if (target === 'explore') {
      setStep('explore');
      setMode('explore');
    } else if (target === 'quiz') {
      setMode('quiz');
      logout();
      setStep('profile');
    }
  };

  const handleTimeSelect = (time) => {
    setGameTime(time);
    setStep('category');
  };

  const handleCategorySelect = (selectedCategory) => {
    setCategory(selectedCategory);
    setStep('game');
  };

  const renderContent = () => {
    if (step === 'home') {
      return (
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          height: '100%',
          gap: '1rem'
        }}>
          <h1 style={{ fontSize: '3rem', color: 'var(--primary-color)', marginBottom: '0.5rem' }}>
            Kinder Learn
          </h1>
          <div style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            fontSize: '0.8rem',
            color: '#999',
            backgroundColor: 'rgba(255,255,255,0.8)',
            padding: '2px 6px',
            borderRadius: '4px'
          }}>
            v0.0.1
          </div>
          {currentUser && (
            <div style={{ fontSize: '1.5rem', color: '#666', display: 'flex', alignItems: 'center', gap: '10px' }}>
              Hello, 
              {currentUser.type === 'image' ? (
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', overflow: 'hidden', border: '2px solid #fff', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                  <img src={currentUser.value} alt={currentUser.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ) : (
                <span>{currentUser.name || currentUser.value || currentUser}</span>
              )}!
            </div>
          )}
          
          <button 
            onClick={() => handleNavigate('quiz')}
            style={{
              fontSize: '1.5rem',
              padding: '1rem 2rem',
              backgroundColor: 'var(--accent-color)',
              color: 'var(--text-color)',
              border: 'none',
              borderRadius: '50px',
              marginBottom: '1rem',
              width: '80%',
              boxShadow: '0 4px 0 #e6cf62',
              cursor: 'pointer'
            }}
          >
            Play Game 🎮
          </button>
          <button 
            onClick={() => handleNavigate('gallery')}
            style={{
              fontSize: '1.5rem',
              padding: '1rem 2rem',
              backgroundColor: '#FF9F43', // Orange
              color: 'white',
              border: 'none',
              borderRadius: '50px',
              width: '80%',
              boxShadow: '0 4px 0 #e58e3c',
              cursor: 'pointer'
            }}
          >
            Gallery 🖼️
          </button>
          <button 
            onClick={() => handleNavigate('explore')}
            style={{
              fontSize: '1.5rem',
              padding: '1rem 2rem',
              backgroundColor: '#9C27B0', // Purple
              color: 'white',
              border: 'none',
              borderRadius: '50px',
              width: '80%',
              boxShadow: '0 4px 0 #7B1FA2',
              cursor: 'pointer',
              marginBottom: '1rem'
            }}
          >
            Explore 🏠
          </button>

          {/* High Scores */}
          <div style={{ 
            marginTop: '2rem', 
            width: '80%', 
            backgroundColor: 'white', 
            padding: '1rem', 
            borderRadius: '15px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ textAlign: 'center', color: '#555' }}>🏆 High Scores</h3>
            {highScores.length === 0 ? (
              <p style={{ textAlign: 'center', color: '#888' }}>No scores yet!</p>
            ) : (
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {highScores.map((score, index) => {
                  // Handle both new profile object and legacy string/object structure
                  const profile = score.profile || { type: 'text', value: score.name, name: score.name };
                  const isImage = profile.type === 'image';
                  
                  return (
                    <li key={index} style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '0.5rem 0',
                      borderBottom: index < highScores.length - 1 ? '1px solid #eee' : 'none'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ width: '20px', color: '#888' }}>{index + 1}.</span>
                        {isImage ? (
                          <div style={{ width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden', border: '1px solid #eee' }}>
                            <img src={profile.value} alt={profile.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          </div>
                        ) : (
                          <span>{profile.name || profile.value}</span>
                        )}
                      </div>
                      <span style={{ fontWeight: 'bold', color: '#FFD700' }}>{score.score} pts</span>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
          
          {currentUser && (
            <button 
              onClick={logout}
              style={{
                marginTop: '1rem',
                background: 'none',
                border: 'none',
                color: '#999',
                textDecoration: 'underline',
                cursor: 'pointer'
              }}
            >
              Switch User
            </button>
          )}
        </div>
      );
    }

    if (step === 'profile') {
      return <ProfileScreen />;
    }

    if (step === 'setup') {
      return <GameSetup onStart={handleTimeSelect} />;
    }

    if (step === 'gallery') {
      return <GalleryScreen />;
    }

    if (step === 'explore') {
      return <ExploreScreen />;
    }

    if (step === 'category') {
      return <CategorySelect onSelectCategory={handleCategorySelect} />;
    }

    if (step === 'game') {
      return (
        <GameScreen 
          mode={mode} 
          category={category} 
          initialTime={gameTime}
          onBack={() => handleNavigate('home')} 
        />
      );
    }
  };

  return (
    <div className="app-container">
      {renderContent()}
      <Navigation currentMode={mode} onNavigate={handleNavigate} />
    </div>
  );
}

function App() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
}

export default App;
