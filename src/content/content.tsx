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
      // Check if the click is inside the popup
      if (popupRef.current && popupRef.current.contains(event.target as Node)) {
        return; // If clicking inside the popup, ignore handleMouseUp
      }

      const selection = window.getSelection()?.toString().trim();
      if (selection && selection.length > 0) {
        setSelectedText(selection);
        // Adjust popup position (e.g., moving it 10px down)
        setPopupPosition({ x: event.pageX, y: event.pageY + 10 }); // Add 10px to y for the offset
      } else {
        setSelectedText(null);
      }
    };

    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);


  return (
    <div className="select-text">
      {selectedText && (
        <div
          ref={popupRef} // Assign the popup element to the ref
          className="absolute z-50"
          style={{
            top: `${popupPosition.y}px`, // The modified position
            left: `${popupPosition.x}px`,
          }}
          // Stop event propagation to prevent handleMouseUp from triggering
          onClick={(event) => event.stopPropagation()}
        >
          <InpagePopup selectedText={selectedText} />
        </div>
      )}
    </div>
  );
};

export default Content;
