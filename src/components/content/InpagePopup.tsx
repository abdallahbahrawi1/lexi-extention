import React from 'react';
import { FaBook, FaLanguage, FaVolumeUp, FaBookmark } from 'react-icons/fa'; // Importing the required icons


const InpagePopup = ({selectedText}) => {

  const handleClick = (action: string) => {
    const message = { action, text: selectedText }; // Include selectedText in the message
    chrome.runtime.sendMessage(message, (response) => {
      // Handle the response here
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError.message);
      } else {
        console.log('Response:', response);
      }
    });
  };
  
  return (
    <div className="flex justify-between items-center p-2 bg-gray-100 rounded-lg shadow-md w-48">
      <button
        className="icon-button"
        title="Define"
        onClick={() => handleClick('Define')}
      >
        <FaBook className="text-gray-500 text-lg transition-transform transform hover:scale-110 hover:text-black duration-200" />
      </button>
      <div className="w-px h-5 bg-gray-300 mx-1"></div>
      <button
        className="icon-button"
        title="Translate"
        onClick={() => handleClick('Translate')}
      >
        <FaLanguage className="text-gray-500 text-lg transition-transform transform hover:scale-110 hover:text-black duration-200" />
      </button>
      <div className="w-px h-5 bg-gray-300 mx-1"></div>
      <button
        className="icon-button"
        title="Pronounce"
        onClick={() => handleClick('Pronounce')}
      >
        <FaVolumeUp className="text-gray-500 text-lg transition-transform transform hover:scale-110 hover:text-black duration-200" />
      </button>
      <div className="w-px h-5 bg-gray-300 mx-1"></div>
      <button
        className="icon-button"
        title="Save"
        onClick={() => handleClick('Save')}
      >
        <FaBookmark className="text-gray-500 text-lg transition-transform transform hover:scale-110 hover:text-black duration-200" />
      </button>
    </div>
  );
};

export default InpagePopup;
