import React, { useState, useEffect } from 'react';
import Flashcard from '../components/Flashcards/Flashcard';
import Controls from '../components/Flashcards/Controls';
import ProgressBar from '../components/Flashcards/ProgressBar';
import MemorizationButton from '../components/Flashcards/MemorizationButton';


const Flashcards = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [words, setWords] = useState<any[]>([]);
  const [memorizedWords, setMemorizedWords] = useState<any[]>([]);
  const [flipped, setFlipped] = useState(false); 

  useEffect(() => {
    loadWords();
  }, []);

  const loadWords = async () => {
    chrome.storage.local.get(['savedWords'], (result) => {
      const savedWords = result.savedWords || [];
      console.log(savedWords)
      setWords(savedWords);
      if (savedWords.length > 0) {
        showWord(0);
      }
    });
  };

  const showWord = (index: number) => {
    if (words.length > 0) {
      const currentWord = words[index];
      updateMemorizationStatus(currentWord.memorized);
    }
  };

  const updateMemorizationStatus = (memorized: boolean) => {
    const currentWord = words[currentIndex];
    currentWord.memorized = memorized;
    const updatedMemorizedWords = memorized
      ? [...memorizedWords, currentWord]
      : memorizedWords.filter((word) => word.word !== currentWord.word);

    setMemorizedWords(updatedMemorizedWords);
    chrome.storage.local.set({ savedWords: words, memorized: updatedMemorizedWords });
  };

  const handleFlip = () => {
    setFlipped((prev) => !prev);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg text-center">
      <Flashcard
          word={words[currentIndex]?.word || 'Loading...'}
          definition={words[currentIndex]?.definition || 'No definition available'}
          memorized={words[currentIndex]?.memorized}
          flipped={flipped} 
          onFlip={handleFlip} 
        />

        <Controls
          currentIndex={currentIndex}
          total={words.length}
          setCurrentIndex={setCurrentIndex}
          words={words}
          setWords={setWords}
        />

        <div className="text-gray-700">Card {currentIndex + 1} of {words.length}</div>

        <ProgressBar currentIndex={currentIndex} total={words.length} />

        <div className="mt-6 flex justify-center">
          <MemorizationButton memorized={words[currentIndex]?.memorized} onToggle={() => updateMemorizationStatus(!words[currentIndex]?.memorized)} />
        </div>
      </div>
    </div>
  );
};

export default Flashcards;
