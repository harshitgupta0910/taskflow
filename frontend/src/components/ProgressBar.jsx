import { useEffect, useState } from "react";

const ProgressBar = ({ total, completed }) => {
  const [progress, setProgress] = useState(0);
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  
  useEffect(() => {
    const timeout = setTimeout(() => setProgress(percentage), 300);
    return () => clearTimeout(timeout);
  }, [percentage]);

  
  const getProgressColor = () => {
    if (progress < 40) return "from-red-500 to-rose-600";
    if (progress < 80) return "from-yellow-400 to-orange-500";
    return "from-green-500 to-emerald-600";
  };

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 mb-6 transition hover:shadow-xl w-full max-w-lg mx-auto">
     
     
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
          Progress Overview
        </h2>
        <span className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
          {progress}%
        </span>
      </div>
      
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden shadow-inner">
        <div
          className={`h-3 rounded-full bg-gradient-to-r ${getProgressColor()} transition-all duration-700 ease-out`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>


      <div className="flex justify-between text-sm text-gray-700 dark:text-gray-300 mt-3">
        <span className="font-medium">{completed} completed</span>
        <span className="font-medium">{total} total tasks</span>
      </div>
    </div>
  );
};

export default ProgressBar;
