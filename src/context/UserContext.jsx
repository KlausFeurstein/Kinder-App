import React, { createContext, useState, useEffect, useContext } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [highScores, setHighScores] = useState([]);

  useEffect(() => {
    // Load high scores from local storage
    const savedScores = localStorage.getItem('kinder-learn-highscores');
    if (savedScores) {
      setHighScores(JSON.parse(savedScores));
    }
    
    // Load last user
    const savedUser = localStorage.getItem('kinder-learn-user');
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch (e) {
        // Handle legacy string format
        setCurrentUser({ type: 'text', value: savedUser });
      }
    }
  }, []);

  const login = (profile) => {
    // profile = { type: 'text' | 'image', value: 'name' | 'filename' }
    setCurrentUser(profile);
    localStorage.setItem('kinder-learn-user', JSON.stringify(profile));
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('kinder-learn-user');
  };

  const addScore = (score) => {
    if (!currentUser) return;

    const newScore = { 
      profile: currentUser, 
      score, 
      date: new Date().toISOString() 
    };
    
    const newScores = [...highScores, newScore]
      .sort((a, b) => b.score - a.score)
      .slice(0, 6); // Keep top 6

    setHighScores(newScores);
    localStorage.setItem('kinder-learn-highscores', JSON.stringify(newScores));
  };

  return (
    <UserContext.Provider value={{ currentUser, login, logout, highScores, addScore }}>
      {children}
    </UserContext.Provider>
  );
};
