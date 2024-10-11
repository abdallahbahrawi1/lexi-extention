import React, { useState, useEffect } from "react";
import WordList from "../components/MemorizedPage/WordList";
import WordInput from "../components/MemorizedPage/WordInput";
import ActionButtons from "../components/MemorizedPage/ActionButtons";

const MemorizedPage = () => {
  const [memorizedWords, setMemorizedWords] = useState<{ word: string; memorized: boolean }[]>([]);

  useEffect(() => {
    loadMemorizedWords();
  }, []);

  const loadMemorizedWords = async () => {
    chrome.storage.local.get(["memorized"], function (result) {
      const allWords = result.memorized || [];
      const filteredWords = allWords.filter((word: { memorized: boolean }) => word.memorized);
      setMemorizedWords(filteredWords);
    });
  };

  return (
    <div className="flex flex-col items-center w-[300px] h-[400px] p-5 bg-white text-gray-800">
      <h1 className="text-2xl font-bold mb-4">My Words:</h1>
      <WordList memorizedWords={memorizedWords} setMemorizedWords={setMemorizedWords} />
      <WordInput memorizedWords={memorizedWords} setMemorizedWords={setMemorizedWords} />
      <ActionButtons setMemorizedWords={setMemorizedWords} />
    </div>
  );
};

export default MemorizedPage;
