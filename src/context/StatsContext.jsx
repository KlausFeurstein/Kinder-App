import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useUser } from './UserContext';

const StatsContext = createContext();

export const useStats = () => {
  const context = useContext(StatsContext);
  if (!context) {
    throw new Error('useStats must be used within a StatsProvider');
  }
  return context;
};

export const StatsProvider = ({ children }) => {
  const { currentUser } = useUser();
  const [stats, setStats] = useState({});

  // Load stats for current user
  useEffect(() => {
    if (currentUser) {
      const savedStats = localStorage.getItem(`kinder_app_stats_${currentUser.name || currentUser.value}`);
      if (savedStats) {
        setStats(JSON.parse(savedStats));
      } else {
        setStats({});
      }
    }
  }, [currentUser]);

  // Save stats whenever they change
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(`kinder_app_stats_${currentUser.name || currentUser.value}`, JSON.stringify(stats));
    }
  }, [stats, currentUser]);

  const recordResult = useCallback((wordId, isCorrect) => {
    setStats(prev => {
      const current = prev[wordId] || { correct: 0, attempts: 0, streak: 0, lastPlayed: 0 };
      
      const newStats = {
        ...current,
        attempts: current.attempts + 1,
        lastPlayed: Date.now()
      };

      if (isCorrect) {
        newStats.correct = current.correct + 1;
        newStats.streak = current.streak + 1;
      } else {
        newStats.streak = 0; // Reset streak on wrong answer
      }

      return {
        ...prev,
        [wordId]: newStats
      };
    });
  }, []);

  const getWordStats = useCallback((wordId) => {
    return stats[wordId] || { correct: 0, attempts: 0, streak: 0 };
  }, [stats]);

  const getWeakestWords = useCallback((limit = 10) => {
    return Object.entries(stats)
      .map(([id, stat]) => ({
        id,
        accuracy: stat.attempts > 0 ? stat.correct / stat.attempts : 0,
        ...stat
      }))
      .sort((a, b) => a.accuracy - b.accuracy) // Sort by lowest accuracy first
      .slice(0, limit);
  }, [stats]);

  return (
    <StatsContext.Provider value={{ stats, recordResult, getWordStats, getWeakestWords }}>
      {children}
    </StatsContext.Provider>
  );
};
