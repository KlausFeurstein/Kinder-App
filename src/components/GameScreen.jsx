import React, { useState, useEffect, useRef, useCallback } from 'react';
import { vocabulary } from '../data/vocabulary';
import { useUser } from '../context/UserContext';
import { getVisual } from './Visuals';
import { useSpeech } from '../hooks/useSpeech';

const GameScreen = ({ mode, category, initialTime, onBack }) => {
  const [currentItem, setCurrentItem] = useState(null);
  const [options, setOptions] = useState([]);
  const [feedback, setFeedback] = useState(null); // 'correct', 'incorrect'
  const [wrongId, setWrongId] = useState(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [timeLeft, setTimeLeft] = useState(initialTime || 60);
  const usedQuestionIdsRef = useRef([]); // Use ref instead of state to avoid re-renders/dependency loops
  const [gameOver, setGameOver] = useState(false);
  const { addScore } = useUser();
  
  // Ref to track score for cleanup effect
  const scoreRef = useRef(0);
  const scoreSubmittedRef = useRef(false); // Track if score has been submitted

  // Filter vocabulary based on category
  const gameVocab = React.useMemo(() => category === 'all' 
    ? vocabulary 
    : vocabulary.filter(item => item.category === category), [category]);

  useEffect(() => {
    scoreRef.current = score;
  }, [score]);

  const { speak } = useSpeech();

  const endGame = useCallback(() => {
    setGameOver(true);
    speak('Game Over');
    if (scoreRef.current > 0 && !scoreSubmittedRef.current) {
      addScore(scoreRef.current);
      scoreSubmittedRef.current = true;
    }
  }, [addScore, speak]);

  const startNewRound = useCallback(() => {
    // Filter out used questions using ref
    const availableVocab = gameVocab.filter(item => !usedQuestionIdsRef.current.includes(item.id));

    if (availableVocab.length === 0) {
      endGame();
      return;
    }

    const randomItem = availableVocab[Math.floor(Math.random() * availableVocab.length)];
    setCurrentItem(randomItem);
    usedQuestionIdsRef.current.push(randomItem.id); // Update ref directly
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
  }, [gameVocab, mode, category, endGame, speak]);

  useEffect(() => {
    startNewRound();
    
    // Timer interval
    const timer = setInterval(() => {
      if (!gameOver) {
        setTimeLeft(prev => {
          if (prev <= 1) {
            endGame();
            return 0;
          }
          return prev - 1;
        });
      }
    }, 1000);

    return () => {
      clearInterval(timer);
      // Save score when unmounting (exiting game)
      if (mode === 'quiz' && scoreRef.current > 0 && !scoreSubmittedRef.current) {
        addScore(scoreRef.current);
        scoreSubmittedRef.current = true;
      }
    };
  }, [startNewRound, gameOver, mode, addScore, endGame]); // Added missing dependencies

  const handleOptionClick = (item) => {
    if (gameOver) return;

    if (item.id === currentItem.id) {
      setFeedback('correct');
      speak('Great job!');
      setScore(s => s + 10);
      setTimeout(startNewRound, 1500);
    } else {
      setFeedback('incorrect');
      setWrongId(item.id);
      speak('Try again');
      setLives(prev => {
        const newLives = prev - 1;
        if (newLives <= 0) {
          endGame();
        }
        return newLives;
      });
      setTimeout(() => setWrongId(null), 500);
    }
  };

  const renderImage = (item) => {
    if (item.visualId) {
      return getVisual(item.visualId);
    }
    return item.image;
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (gameOver) {
    return (
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2rem'
      }}>
        <h2 style={{ fontSize: '4rem', color: '#FF5722' }}>Game Over!</h2>
        <div style={{ fontSize: '3rem', color: '#FFD700' }}>Score: {score}</div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button
            onClick={onBack}
            style={{
              fontSize: '2rem',
              padding: '1rem 2rem',
              borderRadius: '50px',
              border: 'none',
              backgroundColor: '#2196F3',
              color: 'white',
              cursor: 'pointer'
            }}
          >
            Home 🏠
          </button>
        </div>
      </div>
    );
  }

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
      {/* Header: Score, Timer, Lives, Exit */}
      <div style={{ 
        position: 'absolute', 
        top: '10px', 
        left: '10px',
        right: '10px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 100
      }}>
        <button
          onClick={endGame}
          style={{
            fontSize: '1.5rem',
            background: '#ff4444',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            padding: '0.5rem 1rem',
            cursor: 'pointer'
          }}
        >
          Exit ❌
        </button>

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div style={{ fontSize: '2rem' }}>
            {Array(lives).fill('❤️').join('')}
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#333' }}>
            ⏱️ {formatTime(timeLeft)}
          </div>
          <div style={{ 
            fontSize: '2rem', 
            fontWeight: 'bold',
            color: '#FFD700',
            textShadow: '2px 2px 0 #000'
          }}>
            ⭐ {score}
          </div>
        </div>
      </div>

      <h2 style={{ marginBottom: '1rem', fontSize: '2rem', marginTop: '60px' }}>Find the {currentItem.english}</h2>
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
