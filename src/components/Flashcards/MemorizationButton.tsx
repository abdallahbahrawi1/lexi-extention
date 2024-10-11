import React from 'react';

interface MemorizationButtonProps {
  memorized: boolean;
  onToggle: () => void;
}

const MemorizationButton: React.FC<MemorizationButtonProps> = ({ memorized, onToggle }) => {
  return (
    <button
      className={`py-2 px-4 rounded-full font-bold ${memorized ? 'bg-green-500' : 'bg-red-500'} text-white`}
      onClick={onToggle}
    >
      {memorized ? 'Memorized' : 'Not Memorized'}
    </button>
  );
};

export default MemorizationButton;
