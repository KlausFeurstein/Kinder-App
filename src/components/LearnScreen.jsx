import React, { useState, useEffect, useMemo } from 'react';
import { vocabulary, categories } from '../data/vocabulary';
import { useStats } from '../context/StatsContext';
import Flashcard from './Flashcard';

const LearnScreen = ({ onBack }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [queue, setQueue] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { getWeakestWords, recordResult } = useStats();

  // Initialize Queue based on category
  // We only want this to run when the category CHANGES, not when stats update.
  useEffect(() => {
    if (!selectedCategory) return;

    let pool = [];
    if (selectedCategory === 'all') {
      pool = [...vocabulary];
    } else {
      pool = vocabulary.filter(item => item.category === selectedCategory);
    }

    // Adaptive Sorting: Get weakest words first
    // Note: We use the current state of stats at the moment of category selection
    const weakest = getWeakestWords(100).map(w => w.id);
    
    const sortedPool = pool.sort((a, b) => {
      const aIsWeak = weakest.includes(a.id);
      const bIsWeak = weakest.includes(b.id);
      if (aIsWeak && !bIsWeak) return -1;
      if (!aIsWeak && bIsWeak) return 1;
      return 0; 
    });

    setQueue(sortedPool);
    setCurrentIndex(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory]);

  const handleResult = (result) => {
    const currentItem = queue[currentIndex];
    
    // Record result: 'easy' = correct, 'hard' = incorrect (for tracking purposes)
    recordResult(currentItem.id, result === 'easy');

    // Move to next
    if (currentIndex < queue.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // End of session
      alert("Great job! You've finished this set! 🎉");
      setSelectedCategory(null);
    }
  };

  if (!selectedCategory) {
    return (
      <div style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '2rem',
        overflowY: 'auto'
      }}>
        <div style={{ width: '100%', maxWidth: '800px', display: 'flex', alignItems: 'center', marginBottom: '2rem' }}>
          <button 
            onClick={onBack}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '2rem',
              cursor: 'pointer',
              marginRight: '1rem'
            }}
          >
            ⬅️
          </button>
          <h1 style={{ fontSize: '2.5rem', color: '#333', margin: 0 }}>What to learn? 🧠</h1>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
          gap: '1.5rem',
          width: '100%',
          maxWidth: '800px'
        }}>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1.5rem',
                backgroundColor: 'white',
                border: 'none',
                borderRadius: '20px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                cursor: 'pointer',
                transition: 'transform 0.2s'
              }}
            >
              <span style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>{cat.icon}</span>
              <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#555' }}>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (queue.length === 0) return <div>Loading...</div>;

  const currentItem = queue[currentIndex];

  return (
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)'
    }}>
      <div style={{ 
        position: 'absolute', 
        top: '1rem', 
        left: '1rem', 
        zIndex: 10 
      }}>
        <button 
          onClick={() => setSelectedCategory(null)}
          style={{
            background: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            fontSize: '1.5rem',
            cursor: 'pointer',
            boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
          }}
        >
          ❌
        </button>
      </div>

      <div style={{ marginBottom: '2rem', color: 'white', fontSize: '1.2rem', fontWeight: 'bold' }}>
        Card {currentIndex + 1} of {queue.length}
      </div>

      <Flashcard 
        key={currentItem.id} // Force re-mount on change to reset flip state
        item={currentItem} 
        onResult={handleResult} 
      />
    </div>
  );
};

export default LearnScreen;
