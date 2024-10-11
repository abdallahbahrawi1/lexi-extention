import React from 'react';
import { Link } from 'react-router-dom'


interface ActionButtonsProps {
  setWords: any;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ setWords }) => {

  const clearAllWords = () => {
    setWords([]);
    console.log('Cleared all words');
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 mb-2">
        <button
          className="bg-red-500 hover:bg-red-600 text-white rounded-full w-full p-3 flex justify-center items-center gap-2"
          onClick={clearAllWords}
        >
          <i className="fas fa-trash-alt"></i> Clear All
        </button>
        <Link to={'/flashcards'}
          className="bg-green-500 hover:bg-green-600 text-white rounded-full w-full p-3 flex justify-center items-center gap-2"
        >
          <i className="fas fa-clone"></i> View Flashcards
        </Link>
      </div>
      <Link to={'/memorized'}
        className="bg-purple-500 hover:bg-purple-600 text-white rounded-full w-full p-3 flex justify-center items-center gap-2"
      >
        <i className="fas fa-brain"></i> Show Memorized
      </Link>
    </div>
  );
};

export default ActionButtons;
