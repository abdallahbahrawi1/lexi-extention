import React from 'react';

interface ProgressBarProps {
  currentIndex: number;
  total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentIndex, total }) => {
  const progressPercentage = ((currentIndex + 1) / total) * 100;

  return (
    <div className="w-full h-2 bg-gray-300 rounded mt-4">
      <div className="bg-blue-500 h-full" style={{ width: `${progressPercentage}%` }}></div>
    </div>
  );
};

export default ProgressBar;
