import React, { useEffect, useState, useRef } from 'react';
import { extractWordsFromPage } from './utils';
import InpagePopup from '../components/content/InpagePopup';

const Content: React.FC = () => {
  const [words, setWords] = useState<{ word: string; memorized: boolean }[]>([]);
  const [selectedText, setSelectedText] = useState<string | null>(null);
  const [popupPosition, setPopupPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const popupRef = useRef<HTMLDivElement | null>(null); // Ref for the popup element

  useEffect(() => {
    const extractedWords = extractWordsFromPage();
    setWords(extractedWords);

    chrome.runtime.sendMessage({ words: extractedWords }, (response: { status: string }) => {
      console.log(response.status);
    });

    const handleMouseUp = (event: MouseEvent) => {

      if (popupRef.current && popupRef.current.contains(event.target as Node)) {
        return; // If clicking inside the popup, ignore handleMouseUp
      }
      
      const selection = window.getSelection()?.toString().trim();

      // If there is a selection and it's not empty, show the popup and set its position
      if (selection && selection.length > 0) {
        setSelectedText(selection);
        setPopupPosition({ x: event.pageX, y: event.pageY + 10 }); // Add 10px to y for the offset
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      // If clicking outside the popup, clear the selected text and hide the popup
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setSelectedText(null); // Hide the popup
        if (window.getSelection()) {
          window.getSelection()?.removeAllRanges(); // Clear text selection
        }
      }
    };

    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousedown', handleClickOutside); // Detect clicks outside the popup

    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  

  return (
    <div className="select-text">
      {selectedText && (
        <div
          ref={popupRef} // Assign the popup element to the ref
          style={{ position: 'absolute', zIndex: 50, top: popupPosition.y, left: popupPosition.x }} // Set the position based on the state
        >
          <InpagePopup selectedText={selectedText} />
        </div>
      )}
    </div>
  );
};

export default Content;
