import React, { useRef, useEffect } from 'react';
import { vocabulary, categories } from '../data/vocabulary';
import { getVisual } from './Visuals';

const GalleryScreen = () => {
  const timeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const speak = (text, lang = 'en-US') => {
    // Removed window.speechSynthesis.cancel() from here to allow sequential playback
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    window.speechSynthesis.speak(utterance);
  };

  const handleItemClick = (item) => {
    // Cancel any existing speech and timeouts when a NEW item is clicked
    window.speechSynthesis.cancel();
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    speak(item.english);
    timeoutRef.current = setTimeout(() => speak(item.german, 'de-DE'), 1000);
  };

  const renderImage = (item) => {
    if (item.visualId) {
      return getVisual(item.visualId);
    }
    return item.image;
  };

  return (
    <div style={{
      flex: 1,
      padding: '1rem',
      paddingBottom: '80px',
      overflowY: 'auto',
      backgroundColor: '#f0f4f8'
    }}>
      <h2 style={{ 
        textAlign: 'center', 
        color: 'var(--primary-color)',
        marginBottom: '2rem',
        fontSize: '2.5rem'
      }}>
        Gallery 🖼️
      </h2>

      {categories.filter(c => c.id !== 'all').map(category => {
        const items = vocabulary.filter(v => v.category === category.id);
        if (items.length === 0) return null;

        return (
          <div key={category.id} style={{ marginBottom: '2rem' }}>
            <h3 style={{ 
              marginLeft: '1rem', 
              marginBottom: '1rem',
              color: 'var(--text-color)',
              fontSize: '1.8rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              {category.icon} {category.label}
            </h3>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
              gap: '1rem',
              padding: '0 0.5rem'
            }}>
              {items.map(item => (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '1rem',
                    backgroundColor: 'white',
                    border: 'none',
                    borderRadius: '15px',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
                    cursor: 'pointer',
                    transition: 'transform 0.1s'
                  }}
                >
                  <div style={{ 
                    fontSize: item.visualId ? '1rem' : '3rem', 
                    marginBottom: '0.5rem',
                    width: item.visualId ? '80px' : 'auto',
                    height: item.visualId ? '80px' : 'auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {renderImage(item)}
                  </div>
                  <span style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>{item.english}</span>
                  <span style={{ fontSize: '0.8rem', color: '#888' }}>{item.german}</span>
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default GalleryScreen;
