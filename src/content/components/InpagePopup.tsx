import React, { useEffect, useRef, useState } from 'react';
import { FaBook, FaVolumeUp, FaBookmark, FaFileAlt, FaCopy, FaCommentAlt, FaEllipsisH } from 'react-icons/fa'; 
import { BsTranslate } from "react-icons/bs";
import FeaturesMenu from './FeaturesMenu/FeaturesMenu';
import { ActionType } from '../../types/types';
import AITaskPopup from './AITaskPopup/AITaskPopup';
import TranslationPopup from './TranslationPopup/TranslationPopup';

const InpagePopup = ({ selectedText }) => {
  const hasMounted = useRef(false);

  const [isPopupVisible, setPopupVisible] = useState(false);
  const [aiResult, setAiResult] = useState('');
  const [aiAction, setAIAction] = useState('');
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [showTranslatePopup, setShowTranslatePopup] = useState(false); 
  const [selectedLanguage, setSelectedLanguage] = useState('English'); 
  const [pinnedIcons, setPinnedIcons] = useState({
    Define: true,
    Translate: true,
    Summarize: true,
    Explain: true,
    Save: true,
    Copy: true,
  });

  useEffect(() => {
    if (hasMounted.current) {
      handleClick(ActionType.TRANSLATE);
    } else {
      hasMounted.current = true;
    }
  }, [selectedLanguage]);

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
    const message: { action: any; text: any; language?: string } = { action: action, text: selectedText };

    if (action === ActionType.TRANSLATE) {
      message.language = selectedLanguage;
      setShowTranslatePopup(true);
    }

    chrome.runtime.sendMessage(message, (response) => {
      if ( response.error) {
        console.error('Error:', response.error);
      } else {
        console.log('Response:', response.result);
        if (action === ActionType.TRANSLATE) {
          setShowTranslatePopup(true);
        }else{
          showTranslatePopup && setShowTranslatePopup(false);
        }
        setAIAction(action);
        setAiResult(response.result);
      }
    });
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(selectedText).then(() => {
      // Show the "Copied!" tooltip
      setTooltipVisible(true);

      // Hide the tooltip after 2 seconds
      setTimeout(() => {
        setTooltipVisible(false);
      }, 2000);
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  };

  return (
    <>
      <div className="popup-container">

        {pinnedIcons.Define && (
          <button
            className="icon-button"
            title="Define"
            onClick={() => handleClick(ActionType.DEFINE)}  
          >
            <FaBook className="icon" />
          </button>
        )}

        {pinnedIcons.Translate && (
          <button
            className="icon-button"
            title="Translate"
            onClick={() => handleClick(ActionType.TRANSLATE)}
          >
            <BsTranslate className="icon" />
          </button>
        )}

        {pinnedIcons.Summarize && (
          <button 
            className="icon-button"
            title="Summarize"
            onClick={() => handleClick(ActionType.SUMMARIZE)}
          >
            <FaFileAlt className="icon"/>
          </button>
        )}

        {pinnedIcons.Explain && (
          <button
            className="icon-button"
            title="Explain"
            onClick={() => handleClick(ActionType.EXPLAIN)}
          >
            <FaCommentAlt className="icon"/>
          </button>
        )}

        {pinnedIcons.Save && (
          <button
            className="icon-button"
            title="Save"
            onClick={() => handleClick(ActionType.SAVE)}
            >
            <FaBookmark className="icon" />
          </button>
        )}

        {pinnedIcons.Copy && (
          <div className="icon-button-container">
            <button
              className="icon-button"
              title="Copy"
              onClick={handleCopyClick}
            >
              <FaCopy className="icon" />
            </button>
      
            {tooltipVisible && (
              <div className="tooltip">Copied!</div>
            )}
          </div>
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
      {!showTranslatePopup && aiResult && <AITaskPopup aiResultText={aiResult} action={aiAction} selectedText={selectedText}/>}
      {showTranslatePopup && 
        <TranslationPopup 
        aiResultText={aiResult} 
        selectedLanguage={selectedLanguage} 
        setSelectedLanguage={setSelectedLanguage} 
        selectedText={selectedText}/>
      }
    </>
  );
};

export default InpagePopup;
