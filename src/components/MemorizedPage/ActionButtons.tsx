import React from "react";
import { Link } from 'react-router-dom'


interface ActionButtonsProps {
  setMemorizedWords: any
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ setMemorizedWords }) => {
  
  const clearAllWords = async () => {
    try {
      setMemorizedWords([]);
      await chrome.storage.local.set({ memorized: [] });
      console.log("All memorized words cleared successfully");
    } catch (error) {
      console.error("Error clearing memorized words:", error);
    }
  };
  
  return (
    <div className="flex justify-between w-full">
      <button
        className="bg-red-500 text-white py-2 px-4 rounded-full w-1/2 transition-all hover:bg-red-600"
        onClick={clearAllWords}
      >
        Clear All
      </button>
      <Link to={'/'}
        className="bg-purple-500 text-white py-2 px-4 flex justify-center rounded-full w-1/2 transition-all hover:bg-purple-600 ml-2"
      >
        Back
      </Link>
    </div>
  );
};

export default ActionButtons;
