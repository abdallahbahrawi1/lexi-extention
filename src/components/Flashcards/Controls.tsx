import React from 'react';
import { Link } from 'react-router-dom';
import { Word } from '../../types/types';

interface ControlsProps {
  currentIndex: number;
  total: number;
  setCurrentIndex: (index: number) => void; 
  words: Word[]; 
  setWords: (newWords: Word[]) => void; 
}

const Controls: React.FC<ControlsProps> = ({ currentIndex, total, setCurrentIndex, words, setWords }) => {
  const handlePrevious = () => {
    setCurrentIndex(Math.max(currentIndex - 1, 0));
  };

  const handleNext = () => {
    setCurrentIndex(Math.min(currentIndex + 1, total - 1));
  };

  const handleDelete = () => {
    const newWords = [...words];
    newWords.splice(currentIndex, 1);
    setWords(newWords);
    chrome.storage.local.set({ savedWords: newWords });
    // Update currentIndex to ensure it stays within bounds after deletion
    setCurrentIndex(Math.max(0, newWords.length - 1));
  };
  return (
    <div className="flex justify-between mb-4 gap-4">
      <Link to='/' className="bg-gray-400 text-white py-2 px-4 rounded-full shadow hover:bg-gray-600 transition" >
        Back
      </Link>
      <button className="bg-blue-500 text-white py-2 px-4 rounded-full shadow hover:bg-blue-700 transition" onClick={handlePrevious} disabled={currentIndex <= 0}>
        Previous
      </button>
      <button className="bg-blue-500 text-white py-2 px-4 rounded-full shadow hover:bg-blue-700 transition" onClick={handleNext} disabled={currentIndex >= total - 1}>
        Next
      </button>
      <button className="bg-red-500 text-white py-2 px-4 rounded-full shadow hover:bg-red-700 transition" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};

export default Controls;
