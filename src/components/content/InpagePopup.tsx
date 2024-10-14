import React from 'react';
import { FaBook, FaLanguage, FaVolumeUp, FaBookmark } from 'react-icons/fa'; // Importing the required icons
// import './InpagePopup.css'; // Import the CSS file for styling

const InpagePopup = ({ selectedText }) => {

  const handleClick = (action) => {
    const message = { action, text: selectedText }; // Include selectedText in the message
    chrome.runtime.sendMessage(message, (response) => {
      console.log('Response:', response);
    });
  };

  // Function to update the UI dynamically with the streamed content
  const updateUI = (text) => {
    const resultElement = document.getElementById('result'); // Ensure there's an element with id='result'
    if (resultElement) {
      resultElement.textContent = text; // Update the result area with new content
    }
  };

  return (
    <div className="popup-container">
      <button
        className="icon-button"
        title="Define"
        onClick={() => handleClick('Define')}
      >
        <FaBook className="icon" />
      </button>
      <div className="divider"></div>
      <button
        className="icon-button"
        title="Translate"
        onClick={() => handleClick('Translate')}
      >
        <FaLanguage className="icon" />
      </button>
      <div className="divider"></div>
      <button
        className="icon-button"
        title="Pronounce"
        onClick={() => handleClick('Pronounce')}
      >
        <FaVolumeUp className="icon" />
      </button>
      <div className="divider"></div>
      <button
        className="icon-button"
        title="Save"
        onClick={() => handleClick('Save')}
      >
        <FaBookmark className="icon" />
      </button>
    </div>
  );
};

export default InpagePopup;
