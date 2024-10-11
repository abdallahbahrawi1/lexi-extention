import React from 'react';

interface FlashcardProps {
  word: string;
  definition: string; 
  memorized: boolean;
  flipped: boolean; 
  onFlip: () => void; 
}

const Flashcard: React.FC<FlashcardProps> = ({ word, definition, memorized, flipped, onFlip }) => {
  return (
    <div className="relative mb-6 perspective">
      {/* Adjusting the icon position */}
      <div className={`absolute top-2 right-2 w-8 h-8 z-10 flex items-center justify-center rounded-full text-white font-bold text-lg ${memorized ? 'bg-green-500' : 'bg-red-500'}`}>
        {memorized ? '✓' : '✗'}
      </div>

      <div
        className={`relative w-full h-64 bg-blue-500 text-white flex items-center justify-center rounded-lg shadow-md cursor-pointer transition-transform duration-700 ease-in-out group ${flipped ? 'rotate-y-180' : ''}`}
        onClick={onFlip}
        id="flashcard"
      >
          <div className="absolute w-full h-full backface-hidden flex items-center justify-center p-5">
          {/* Front side (word) */}
          <div className={`flex items-center justify-center w-full h-full ${flipped ? 'opacity-0' : 'opacity-100'}`}>
            <div className="font-bold text-3xl">{word || 'Loading...'}</div>
          </div>
          
          {/* Back side (definition) */}
          <div className={`absolute w-full h-full backface-hidden flex items-center justify-center rotate-y-180 ${flipped ? 'opacity-100' : 'opacity-0'}`}>
            <div className="text-lg p-4">{definition || 'Definition loading...'}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
