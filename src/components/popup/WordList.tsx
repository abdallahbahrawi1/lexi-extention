import React from 'react';
import WordItem from './WordItem';
import { ActionType, Word } from '../../types/types';

interface WordListProps {
  words: Word[];
  setWords?: any;
}

const WordList: React.FC<WordListProps> = ({ words, setWords }) => {


  const saveWord = (action: ActionType, wordObj: string) => {
    const message: { action: any; text: any; language?: string } = { action: action, text: wordObj };
    chrome.runtime.sendMessage(message, (response) => {
      if (response.error) {
        console.error('Error:', response.error);
      } else {
        console.log('Response:', response.result);
      }
    });
  };

  const saveWordHandler = async (index: number) => {
    const wordObj = words[index].word;
    saveWord(ActionType.SAVE, wordObj);
    const newWords = [...words];
    newWords[index] = { ...newWords[index], saved: true };
    setWords(newWords);
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
