import React, { useEffect, useState } from 'react';
import { FaBook, FaLanguage, FaVolumeUp, FaBookmark, FaFileAlt, FaCopy, FaCommentAlt, FaEllipsisH } from 'react-icons/fa'; 
import { BsTranslate } from "react-icons/bs";

import FeaturesMenu from './FeaturesMenu';

const InpagePopup = ({ selectedText }) => {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [pinnedIcons, setPinnedIcons] = useState({
    Define: false,
    Translate: true,
    Summarize: false,
    Explain: false,
    Save: true,
    Pronounce: false,
    Copy: true,
  });

  // Load pinnedIcons from localStorage if available
  useEffect(() => {
    const savedPinnedIcons = JSON.parse(localStorage.getItem('pinnedItems'));
    if (savedPinnedIcons) {
      setPinnedIcons(savedPinnedIcons);
    }
  }, []);

  // Toggle popup visibility
  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
  };

  // Handle action click and send message to background script
  const handleClick = (action) => {
    const message = { action: action, text: selectedText };
    chrome.runtime.sendMessage(message, (response) => {
      if (response.error) {
        console.error('Error:', response.error);
      } else {
        console.log('Action result:', response.result);
      }
    });
  };

  return (
    <>
      <div className="popup-container">

        {pinnedIcons.Define && (
          <button
            className="icon-button"
            title="Define"
            onClick={() => handleClick('Define')}
          >
            <FaBook className="icon" />
          </button>
        )}

        {pinnedIcons.Translate && (
          <button
            className="icon-button"
            title="Translate"
            onClick={() => handleClick('Translate')}
          >
            <BsTranslate className="icon" />
          </button>
        )}

        {pinnedIcons.Summarize && (
          <button 
            className="icon-button"
            title="Summarize"
          >
            <FaFileAlt className="icon"/>
          </button>
        )}

        {pinnedIcons.Explain && (
          <button
            className="icon-button"
            title="Explain"
          >
            <FaCommentAlt className="icon"/>
          </button>
        )}

        {pinnedIcons.Save && (
          <button
            className="icon-button"
            title="Save"
            onClick={() => handleClick('Save')}
          >
            <FaBookmark className="icon" />
          </button>
        )}

        {pinnedIcons.Pronounce && (
          <button
            className="icon-button"
            title="Pronounce"
            onClick={() => handleClick('Pronounce')}
          >
            <FaVolumeUp className="icon" />
          </button>
        )}

        {pinnedIcons.Copy && (
          <button
            className="icon-button"
            title="Copy"
          >
            <FaCopy className="icon"/>
          </button>
        )}

        <div className="divider"></div>

        <button
          className="icon-button"
          title="Customize"
          onClick={togglePopup}
        >
          <FaEllipsisH className="icon"/>
        </button>

      </div>
      {isPopupVisible && <FeaturesMenu pinnedIcons={pinnedIcons} setPinnedIcons={setPinnedIcons} />}
    </>
  );
};

export default InpagePopup;
