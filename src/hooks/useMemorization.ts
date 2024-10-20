import { useState, useCallback } from 'react';
import { Word } from '../types/types';

const useMemorization = (words: Word[], currentIndex: number) => {
  const [memorizedWords, setMemorizedWords] = useState<Word[]>([]);

  const updateMemorizationStatus = useCallback(
    (memorized: boolean) => {
      const updatedWords = words.map((word, index) =>
        index === currentIndex ? { ...word, memorized } : word
      );
      const updatedMemorizedWords = memorized
        ? [...memorizedWords, updatedWords[currentIndex]]
        : memorizedWords.filter((word) => word.word !== updatedWords[currentIndex].word);

      setMemorizedWords(updatedMemorizedWords);
      chrome.storage.local.set({ savedWords: updatedWords, memorized: updatedMemorizedWords });
    },
    [currentIndex, memorizedWords, words]
  );

  return { memorizedWords, updateMemorizationStatus };
};

export default useMemorization;
