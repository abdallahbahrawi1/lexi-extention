import React from "react";

interface WordListProps {
  memorizedWords: { word: string; memorized: boolean }[];
  setMemorizedWords: any;
}

const WordList: React.FC<WordListProps> = ({ memorizedWords, setMemorizedWords }) => {
  const deleteWord = (wordToDelete: { word: string }) => {
    const updatedWords = memorizedWords.filter((word) => word.word !== wordToDelete.word);
    setMemorizedWords(updatedWords);
    chrome.storage.local.set({ memorized: updatedWords });
  };
  
  return (
    <div className="flex-grow overflow-y-auto mb-4 p-4 bg-gray-100 rounded-lg shadow-inner w-full">
      {memorizedWords.map((wordObj, index) => (
        <div
          key={index}
          className="flex justify-between items-center p-2 bg-white rounded-lg shadow mb-2 transition-transform transform hover:translate-x-1"
        >
          <span>{wordObj.word}</span>
          <button
            className="bg-red-400 text-white p-1 rounded-full w-6 h-6 flex items-center justify-center transition-transform transform hover:rotate-90"
            onClick={() => deleteWord(wordObj)}
          >
            &times;
          </button>
        </div>
      ))}
    </div>
  );
};

export default WordList;
