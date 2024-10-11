import React from 'react';
import { Word } from '../../types/types';

interface WordItemProps {
  wordObj: Word;
  onSave: () => void;
}

const WordItem: React.FC<WordItemProps> = ({ wordObj, onSave }) => {
  return (
    <div className="bg-white p-3 mb-2 rounded-lg shadow-sm flex justify-between items-center hover:shadow-md transition-shadow">
      <span className="font-semibold text-blue-600">{wordObj.word}</span>
      <button
        className={`${
          wordObj.saved
            ? 'bg-green-500 text-white border-none'
            : 'bg-transparent text-blue-600 border-2 border-blue-600'
        } rounded-full px-4 py-1 flex items-center gap-2 transition-all`}
        disabled={wordObj.saved}
        onClick={onSave}
      >
        <i className="fas fa-bookmark"></i>
        {wordObj.saved ? 'Saved' : 'Save'}
      </button>
    </div>
  );
};

export default WordItem;
