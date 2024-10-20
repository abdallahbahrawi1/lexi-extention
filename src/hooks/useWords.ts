import { useState, useEffect } from 'react';
import { Word } from '../types/types';

const useWords = () => {
  const [words, setWords] = useState<Word[]>([]);
  
  useEffect(() => {
    const loadWords = async () => {
      const result = await chrome.storage.local.get(['savedWords']);
      const savedWords = result.savedWords || [];
      setWords(savedWords);
    };
    loadWords();
  }, []);

  return { words, setWords };
};

export default useWords;
