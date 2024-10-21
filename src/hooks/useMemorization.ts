import { useState, useCallback } from 'react';
import { Word } from '../types/types';

const useMemorization = (words: Word[], currentIndex: number, setWords: (words: Word[]) => void) => {
  const [memorizedWords, setMemorizedWords] = useState<Word[]>([]);

  const updateMemorizationStatus = useCallback(
    (memorized: boolean) => {
      const updatedWords = words.map((word, index) =>
        index === currentIndex ? { ...word, memorized } : word
      );

      // Update words in the parent state to trigger a re-render
      setWords(updatedWords);

      setMemorizedWords((prevMemorizedWords) => {
        const updatedMemorizedWords = memorized
          ? [...prevMemorizedWords, updatedWords[currentIndex]]
          : prevMemorizedWords.filter((word) => word.word !== updatedWords[currentIndex].word);

        // Update storage with the new states
        chrome.storage.local.set({ savedWords: updatedWords, memorized: updatedMemorizedWords });

        return updatedMemorizedWords;
      });
    },
    [currentIndex, words, setWords] // Ensure `setWords` is part of the dependencies
  );

  return { memorizedWords, updateMemorizationStatus };
};


export default useMemorization;
