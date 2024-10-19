import React, { useState, useEffect } from 'react';
import {
  FaBook,
  FaBookmark,
  FaFileAlt,
  FaCopy,
  FaCommentAlt,
  FaThumbtack,
} from 'react-icons/fa';
import './FeaturesMenu.css';
import { BsTranslate } from 'react-icons/bs';
import { ActionType } from '../../../types/types';

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
        {[ActionType.DEFINE, ActionType.TRANSLATE, ActionType.SUMMARIZE, ActionType.EXPLAIN, ActionType.SAVE, ActionType.COPY].map((label, index) => (
          <li
            key={index}
            className={`unique-icon-item ${pinnedIcons[label] ? 'pinned' : ''}`}
          >
            {index === 0 && <FaBook className="unique-icon" />}
            {index === 1 && <BsTranslate className="unique-icon" />}
            {index === 2 && <FaFileAlt className="unique-icon" />}
            {index === 3 && <FaCommentAlt className="unique-icon" />}
            {index === 4 && <FaBookmark className="unique-icon" />}
            {index === 5 && <FaCopy className="unique-icon" />}

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
