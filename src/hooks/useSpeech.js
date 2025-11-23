import { useCallback } from 'react';

export const useSpeech = () => {
  const speak = useCallback((text, lang = 'en-US') => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    
    // Try to select a better voice
    const voices = window.speechSynthesis.getVoices();
    let preferredVoice = null;

    if (lang.startsWith('en')) {
      preferredVoice = voices.find(v => v.name.includes('Google US English') || (v.name.includes('Female') && v.lang.startsWith('en')));
    } else if (lang.startsWith('de')) {
      preferredVoice = voices.find(v => v.name.includes('Google Deutsch') || (v.name.includes('Female') && v.lang.startsWith('de')));
    }

    // Fallback to any voice of the requested language
    if (!preferredVoice) {
      preferredVoice = voices.find(v => v.lang.startsWith(lang.split('-')[0]));
    }

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }
    
    window.speechSynthesis.speak(utterance);
  }, []);

  return { speak };
};
