import React from 'react';
import { categories } from '../data/vocabulary';

const CategorySelect = ({ onSelectCategory }) => {
  return (
    <div style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '2rem',
      paddingBottom: '80px',
      overflowY: 'auto'
    }}>
      <h2 style={{ 
        fontSize: '2.5rem', 
        color: 'var(--primary-color)',
        marginBottom: '2rem',
        textAlign: 'center'
      }}>
        Choose a Topic
      </h2>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
        gap: '1.5rem',
        width: '100%',
        maxWidth: '600px'
      }}>
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
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
              fontSize: '1.2rem',
              cursor: 'pointer',
              transition: 'transform 0.2s'
            }}
          >
            <span style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>{cat.icon}</span>
            <span style={{ fontWeight: 'bold', color: 'var(--text-color)' }}>{cat.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategorySelect;
