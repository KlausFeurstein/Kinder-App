import { useCallback } from 'react';

export const useSpeech = () => {
  const speak = useCallback((text, lang = 'en-US') => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    
    // Try to select a better voice (consistent with GameScreen logic)
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => v.name.includes('Google US English') || v.name.includes('Female')) || voices.find(v => v.lang === lang);
    
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }
    
    window.speechSynthesis.speak(utterance);
  }, []);

  return { speak };
};
