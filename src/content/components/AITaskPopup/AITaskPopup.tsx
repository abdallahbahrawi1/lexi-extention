import React, { useState } from 'react';
import './AITaskPopup.css';

const AITaskPopup = ({ aiResultText, action, selectedText }) => {
  const [buttonText, setButtonText] = useState('Copy Result');

  const handleCopyClick = () => {
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
    <div className="aitask-popup">
      <div className="aitask-popup__header">Ask AI To {action} This!</div>
      <div className="aitask-popup__content">
        <div className="aitask-popup__highlighted-text">
          {selectedText}
        </div>
        <div className="aitask-popup__ai-result">
          {aiResultText}
        </div>
        <button className="aitask-popup__copy-button" onClick={handleCopyClick}>{buttonText}</button>
      </div>
    </div>
  );
};

export default AITaskPopup;
