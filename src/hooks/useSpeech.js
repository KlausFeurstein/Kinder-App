```javascript
import { useCallback, useState, useEffect } from 'react';

export const useSpeech = () => {
  const [voices, setVoices] = useState([]);

  useEffect(() => {
    const loadVoices = () => {
      const available = window.speechSynthesis.getVoices();
      setVoices(available);
    };

    loadVoices();
    
    // Chrome loads voices asynchronously
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  const getVoice = useCallback((lang) => {
    if (voices.length === 0) return null;

    let preferredVoice = null;

    if (lang.startsWith('en')) {
      preferredVoice = voices.find(v => 
        v.name.includes('Google US English') || 
        v.name.includes('Google UK English Female') || 
        v.name.includes('Microsoft Zira') || 
        (v.name.toLowerCase().includes('female') && v.lang.startsWith('en'))
      );
    } else if (lang.startsWith('de')) {
      preferredVoice = voices.find(v => 
        v.name.includes('Google Deutsch') || 
        v.name.includes('Microsoft Katja') || 
        (v.name.toLowerCase().includes('female') && v.lang.startsWith('de'))
      );
    }

    // Fallback: Try to find ANY female voice for the language
    if (!preferredVoice) {
      preferredVoice = voices.find(v => v.lang.startsWith(lang.split('-')[0]) && v.name.toLowerCase().includes('female'));
    }

    // Last resort: First available voice for the language
    if (!preferredVoice) {
      preferredVoice = voices.find(v => v.lang.startsWith(lang.split('-')[0]));
    }
    
    return preferredVoice;
  }, [voices]);

  const speak = useCallback((text, lang = 'en-US') => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    
    const voice = getVoice(lang);
    if (voice) utterance.voice = voice;
    
    window.speechSynthesis.speak(utterance);
  }, [getVoice]);

  const speakDual = useCallback((text1, lang1, text2, lang2) => {
    window.speechSynthesis.cancel();
    
    const u1 = new SpeechSynthesisUtterance(text1);
    u1.lang = lang1;
    const v1 = getVoice(lang1);
    if (v1) u1.voice = v1;

    const u2 = new SpeechSynthesisUtterance(text2);
    u2.lang = lang2;
    const v2 = getVoice(lang2);
    if (v2) u2.voice = v2;

    // Queue them up
    window.speechSynthesis.speak(u1);
    window.speechSynthesis.speak(u2);
  }, [getVoice]);

  return { speak, speakDual };
};
```
