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
      setCurrentUser(savedUser);
    }
  }, []);

  const login = (name) => {
    setCurrentUser(name);
    localStorage.setItem('kinder-learn-user', name);
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('kinder-learn-user');
  };

  const addScore = (score) => {
    if (!currentUser) return;

    const newScore = { name: currentUser, score, date: new Date().toISOString() };
    const newScores = [...highScores, newScore]
      .sort((a, b) => b.score - a.score)
      .slice(0, 5); // Keep top 5

    setHighScores(newScores);
    localStorage.setItem('kinder-learn-highscores', JSON.stringify(newScores));
  };

  return (
    <UserContext.Provider value={{ currentUser, login, logout, highScores, addScore }}>
      {children}
    </UserContext.Provider>
  );
};
