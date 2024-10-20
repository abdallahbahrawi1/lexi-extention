import React, { useState } from 'react';
import Flashcard from '../components/Flashcards/Flashcard';
import Controls from '../components/Flashcards/Controls';
import ProgressBar from '../components/Flashcards/ProgressBar';
import MemorizationButton from '../components/Flashcards/MemorizationButton';
import useWords from '../hooks/useWords'; 
import useMemorization from '../hooks/useMemorization'; 

const Flashcards = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const { words, setWords } = useWords();
  const { updateMemorizationStatus } = useMemorization(words, currentIndex);

  const handleFlip = () => {
    setFlipped((prev) => !prev);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg text-center">
        <Flashcard
          word={words[currentIndex]?.word || 'No words available, please add some.'}
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
