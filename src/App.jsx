import React, { useState } from 'react';
import { UserProvider, useUser } from './context/UserContext';
import Navigation from './components/Navigation';
import GameScreen from './components/GameScreen';
import CategorySelect from './components/CategorySelect';
import GalleryScreen from './components/GalleryScreen';
import ExploreScreen from './components/ExploreScreen';
import ProfileScreen from './components/ProfileScreen';

function AppContent() {
  const [step, setStep] = useState('home'); // 'home', 'category', 'game', 'gallery'
  const [mode, setMode] = useState(null); // 'learn', 'quiz'
  const [category, setCategory] = useState(null);
  const { currentUser, highScores, logout } = useUser();

  if (!currentUser) {
    return <ProfileScreen />;
  }

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
    } else {
      // learn or quiz
      setMode(target);
      setStep('category');
    }
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
          <p style={{ fontSize: '1.5rem', color: '#666' }}>Hello, {currentUser}!</p>
          
          <button 
            onClick={() => handleNavigate('learn')}
            style={{
              fontSize: '1.5rem',
              padding: '1rem 2rem',
              backgroundColor: 'var(--secondary-color)',
              color: 'white',
              border: 'none',
              borderRadius: '50px',
              marginBottom: '1rem',
              width: '80%',
              boxShadow: '0 4px 0 #3dbdb4',
              cursor: 'pointer'
            }}
          >
            Start Learning
          </button>
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
            Play Game
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
                {highScores.map((score, index) => (
                  <li key={index} style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    padding: '0.5rem 0',
                    borderBottom: index < highScores.length - 1 ? '1px solid #eee' : 'none'
                  }}>
                    <span>{index + 1}. {score.name}</span>
                    <span style={{ fontWeight: 'bold', color: '#FFD700' }}>{score.score} pts</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          
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
        </div>
      );
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
      return <GameScreen mode={mode} category={category} />;
    }
  };

  return (
    <div className="app-container">
      {renderContent()}
      <Navigation currentMode={step === 'home' ? 'home' : mode} onNavigate={handleNavigate} />
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
