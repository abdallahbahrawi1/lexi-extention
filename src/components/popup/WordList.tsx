import React from 'react';
import WordItem from './WordItem';
import { Word } from '../../types/types';

interface WordListProps {
  words: Word[];
  setWords?: any;
}

const WordList: React.FC<WordListProps> = ({ words, setWords }) => {
  const saveWord = (wordObj: Word) => {
    return new Promise<void>((resolve) => {
      chrome.storage.local.get(['savedWords'], (result) => {
        let savedWords = result.savedWords || [];
        if (!savedWords.some((w: Word) => w.word === wordObj.word)) {
          savedWords.push(wordObj);
          chrome.storage.local.set({ savedWords }, () => {
            resolve();
          });
        } else {
          resolve();
        }
      });
    });
  };

  const saveWordHandler = (index: number) => {
    const wordObj = words[index];
    saveWord(wordObj).then(() => {
      const newWords = [...words];
      newWords[index] = { ...newWords[index], saved: true };
      setWords(newWords);
    });
  };

  if (words.length === 0) {
    return (
      <p className="text-red-500 italic text-center text-base bg-gray-100 border border-gray-300 rounded-md p-2 mt-5">
        No words found.
      </p>
    );
  }

  return (
    <>
      {words.map((wordObj, index) => (
        <WordItem key={index} wordObj={wordObj} onSave={() => saveWordHandler(index)} />
      ))}
    </>
  );
};

export default WordList;
