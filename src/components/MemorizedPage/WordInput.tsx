import React, { useState } from "react";

interface WordInputProps {
  memorizedWords: { word: string; memorized: boolean }[];
  setMemorizedWords: any;
}

const WordInput: React.FC<WordInputProps> = ({ memorizedWords, setMemorizedWords }) => {
  const [newWord, setNewWord] = useState<string>("");

  const addWord = () => {
    if (newWord && !memorizedWords.find((w) => w.word === newWord)) {
      const newWordObj = { word: newWord, memorized: true };
      const updatedWords = [newWordObj, ...memorizedWords];
      setMemorizedWords(updatedWords);
      chrome.storage.local.set({ memorized: updatedWords });
      setNewWord("");
    }
  };
  
  return (
    <div className="flex mb-2 w-full">
      <input
        type="text"
        placeholder="Add new word..."
        value={newWord}
        onChange={(e) => setNewWord(e.target.value)}
        className="flex-grow p-2 border border-gray-300 rounded-l-full bg-white focus:outline-none focus:border-gray-500"
      />
      <button
        className="bg-gray-700 text-white p-2 rounded-r-full transition-all hover:bg-gray-800"
        onClick={addWord}
      >
        +
      </button>
    </div>
  );
};

export default WordInput;
