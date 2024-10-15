import React, { useState, useEffect } from 'react';
import {
  FaBook,
  FaVolumeUp,
  FaBookmark,
  FaFileAlt,
  FaCopy,
  FaCommentAlt,
  FaThumbtack,
} from 'react-icons/fa';
import './FeaturesMenu.css';
import { BsTranslate } from 'react-icons/bs';

const FeaturesMenu = ({ pinnedIcons, setPinnedIcons }) => {


  useEffect(() => {
    const savedPinnedItems = JSON.parse(localStorage.getItem('pinnedItems'));
    if (savedPinnedItems) {
      setPinnedIcons(savedPinnedItems);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('pinnedItems', JSON.stringify(pinnedIcons));
  }, [pinnedIcons]);

  const togglePin = (label) => {
    setPinnedIcons((prevPinnedItems) => ({
      ...prevPinnedItems,
      [label]: !prevPinnedItems[label],
    }));
  };

  return (
    <div className="unique-popup">
      <ul className="unique-icon-list">
        {['Define', 'Translate', 'Summarize', 'Explain', 'Save', 'Pronounce', 'Copy'].map((label, index) => (
          <li
            key={index}
            className={`unique-icon-item ${pinnedIcons[label] ? 'pinned' : ''}`}
          >
            {index === 0 && <FaBook className="unique-icon" />}
            {index === 1 && <BsTranslate className="unique-icon" />}
            {index === 2 && <FaFileAlt className="unique-icon" />}
            {index === 3 && <FaCommentAlt className="unique-icon" />}
            {index === 4 && <FaBookmark className="unique-icon" />}
            {index === 5 && <FaVolumeUp className="unique-icon" />}
            {index === 6 && <FaCopy className="unique-icon" />}

            <span className="unique-icon-label">{label}</span>
            <FaThumbtack
              className="unique-pin-icon"
              onClick={() => togglePin(label)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeaturesMenu;
