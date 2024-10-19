import React, { useState, useEffect } from 'react';
import './TranslationPopup.css';  // Import the CSS file

const TranslationPopup = ({aiResultText, selectedLanguage, setSelectedLanguage, selectedText}) => {
  const [buttonText, setButtonText] = useState('Copy Result');

  const handleCopy = () => {
    navigator.clipboard.writeText(aiResultText).then(() => {
      setButtonText('Copied!');
      setTimeout(() => {
        setButtonText('Copy Result');
      }, 2000);
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  };

  return (
    <div className="tp-popup">
      <div className="tp-popup-header">Translate This!</div>
      <div className="tp-popup-content">
        <div className="tp-highlighted-text">
          {selectedText}
        </div>
        <select
          className="tp-language-select"
          value={selectedLanguage}
          onChange={e => setSelectedLanguage(e.target.value)}
        >
          <option value="English">English</option>
          <option value="Arabic">Arabic</option>
          <option value="Spanish">Spanish</option>
          <option value="French">French</option>
          <option value="German">German</option>
          <option value="Italian">Italian</option>
          <option value="Portuguese">Portuguese</option>
          <option value="Russian">Russian</option>
          <option value="Chinese">Chinese</option>
          <option value="Japanese">Japanese</option>
        </select>
        <div className="tp-ai-result">
          {aiResultText}
        </div>
        <button className="tp-button" onClick={handleCopy}>{buttonText}</button>
      </div>
    </div>
  );
};

export default TranslationPopup;
