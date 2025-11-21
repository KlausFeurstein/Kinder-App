import React, { useState, useEffect, useRef } from 'react';
import { vocabulary } from '../data/vocabulary';
import { useUser } from '../context/UserContext';
import { getVisual } from './Visuals';

const GameScreen = ({ mode, category, onBack }) => {
  const [currentItem, setCurrentItem] = useState(null);
  const [options, setOptions] = useState([]);
  const [feedback, setFeedback] = useState(null); // 'correct', 'incorrect'
  const [wrongId, setWrongId] = useState(null);
  const [score, setScore] = useState(0);
  const { addScore } = useUser();
  
  // Ref to track score for cleanup effect
  const scoreRef = useRef(0);

  // Filter vocabulary based on category
  const gameVocab = category === 'all' 
    ? vocabulary 
    : vocabulary.filter(item => item.category === category);

  useEffect(() => {
    scoreRef.current = score;
  }, [score]);

  useEffect(() => {
    startNewRound();
    return () => {
      // Save score when unmounting (exiting game)
      if (mode === 'quiz' && scoreRef.current > 0) {
        addScore(scoreRef.current);
      }
    };
  }, []);

  const speak = (text, lang = 'en-US') => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    window.speechSynthesis.speak(utterance);
  };

  const startNewRound = () => {
    if (gameVocab.length === 0) return;

    const randomItem = gameVocab[Math.floor(Math.random() * gameVocab.length)];
    setCurrentItem(randomItem);
    setFeedback(null);
    setWrongId(null);

    if (mode === 'quiz') {
      // Generate 4 random options including the correct one
      let pool = gameVocab.filter(v => v.id !== randomItem.id);
      
      // If not enough items in category, borrow from others
      if (pool.length < 3) {
        const otherPool = vocabulary.filter(v => v.category !== category && v.id !== randomItem.id);
        pool = [...pool, ...otherPool];
      }
      
      const shuffledOthers = pool.sort(() => 0.5 - Math.random()).slice(0, 3);
      const newOptions = [randomItem, ...shuffledOthers].sort(() => 0.5 - Math.random());
      setOptions(newOptions);
      
      setTimeout(() => speak(`Find the ${randomItem.english}`), 500);
    }
  };

  const handleNext = () => {
    startNewRound();
  };

  const handlePrev = () => {
    startNewRound();
  };

  const handleOptionClick = (item) => {
    if (item.id === currentItem.id) {
      setFeedback('correct');
      speak('Great job!');
      setScore(s => s + 10);
      setTimeout(startNewRound, 1500);
    } else {
      setFeedback('incorrect');
      setWrongId(item.id);
      speak('Try again');
      setScore(s => Math.max(0, s - 5));
      setTimeout(() => setWrongId(null), 500);
    }
  };

  const renderImage = (item) => {
    if (item.visualId) {
      return getVisual(item.visualId);
    }
    return item.image;
  };

  if (!currentItem) return <div>Loading...</div>;

  return (
    <div style={{ 
      flex: 1, 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '1rem',
      paddingBottom: '80px',
      width: '100%',
      boxSizing: 'border-box',
      position: 'relative'
    }}>
      {mode === 'quiz' && (
        <div style={{ 
          position: 'absolute', 
          top: '10px', 
          right: '20px', 
          fontSize: '2rem', 
          fontWeight: 'bold',
          color: '#FFD700',
          textShadow: '2px 2px 0 #000',
          zIndex: 100
        }}>
          ⭐ {score}
        </div>
      )}

      {mode === 'learn' ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button 
              onClick={handlePrev}
              style={{ fontSize: '3rem', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              ⬅️
            </button>
            
            <div 
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                fontSize: item.visualId ? '1rem' : '8rem', // Adjust size for SVGs
                width: item.visualId ? '300px' : 'auto',
                height: item.visualId ? '300px' : 'auto',
                animation: 'bounce 1s infinite alternate'
              }}
            >
              {renderImage(currentItem)}
            </div>

            <button 
              onClick={handleNext}
              style={{ fontSize: '3rem', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              ➡️
            </button>
          </div>

          <div style={{ display: 'flex', gap: '2rem' }}>
            <button
              onClick={() => speak(currentItem.english)}
              style={{
                fontSize: '3rem',
                padding: '1rem',
                borderRadius: '20px',
                border: 'none',
                backgroundColor: 'white',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                cursor: 'pointer'
              }}
            >
              🇬🇧
            </button>
            <button
              onClick={() => speak(currentItem.german, 'de-DE')}
              style={{
                fontSize: '3rem',
                padding: '1rem',
                borderRadius: '20px',
                border: 'none',
                backgroundColor: 'white',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                cursor: 'pointer'
              }}
            >
              🇩🇪
            </button>
          </div>

        </div>
      ) : (
        <>
          <h2 style={{ marginBottom: '1rem', fontSize: '2rem' }}>Find the {currentItem.english}</h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr', 
            gap: '1rem',
            width: '100%',
            maxWidth: '500px'
          }}>
            {options.map(item => (
              <button
                key={item.id}
                onClick={() => handleOptionClick(item)}
                style={{
                  fontSize: item.visualId ? '1rem' : '4rem',
                  padding: '1.5rem',
                  borderRadius: '20px',
                  border: '2px solid #eee',
                  backgroundColor: wrongId === item.id ? '#ffcccc' : 'white',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  transform: feedback === 'correct' && item.id === currentItem.id ? 'scale(1.1)' : 
                             wrongId === item.id ? 'translateX(10px)' : 'scale(1)',
                  transition: 'all 0.2s',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <div style={{ width: item.visualId ? '100px' : 'auto', height: item.visualId ? '100px' : 'auto' }}>
                  {renderImage(item)}
                </div>
              </button>
            ))}
          </div>
        </>
      )}
      
      {feedback === 'correct' && (
        <div style={{ 
          position: 'absolute', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)',
          fontSize: '8rem',
          zIndex: 10,
          pointerEvents: 'none'
        }}>
          🎉
        </div>
      )}
    </div>
  );
};

export default GameScreen;
