import React, { useEffect, useState } from 'react';
import WordList from '../components/popup/WordList';
import ActionButtons from '../components/popup/ActionButtons';

import { Word } from '../types/types';

const Popup: React.FC = () => {
  const [words, setWords] = useState<Word[]>([]);

  useEffect(() => {
    chrome.storage.local.get(['words'], (result) => {
      const wordsList = result.words || [];
      setWords(wordsList);
    });
  }, []);

  return (
    <div className="font-inter bg-blue-50 text-gray-800 w-[300px] h-[400px] p-5 flex flex-col">
      <h1 className="text-xl font-bold text-blue-500 text-center mb-2 flex items-center justify-center gap-2">
        <i className="fas fa-lightbulb"></i> New Words Detected
      </h1>
      <p className="text-center text-gray-500 text-xs mb-4">
        Discover new vocabulary from your browsing. Click 'Save' to store words for later!
      </p>
      <div className="flex-grow overflow-y-auto mb-4">
        <WordList words={words} setWords={setWords} />
      </div>
      <ActionButtons setWords={setWords}/>
    </div>
  );
};

export default Popup;
