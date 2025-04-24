import { useState, useEffect } from "react";
import { LoaderProps } from "@/types";

export default function FullPageLoader({
  message = "Loading...",
  showLogo = true
}: LoaderProps) {
  const [dots, setDots] = useState(".");
  
  useEffect(() => {

    const dotsInterval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? "." : prev + ".");
    }, 500);
    

    return () => {
      clearInterval(dotsInterval);
    };
  }, []);
  
  return (
    <div className="fixed inset-0 bg-white dark:bg-gray-900 flex flex-col items-center justify-center z-50">
      {/* Optional Logo */}
      {showLogo && (
        <div className="mb-8">
          <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center">
            <svg 
              className="w-10 h-10 text-white" 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
          </div>
        </div>
      )}
      
      {/* Spinner */}
      <div className="relative">
        <div className="w-16 h-16 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 bg-white dark:bg-gray-900"></div>
        </div>
      </div>
      
      {/* Message */}
      <div className="mt-6 text-lg font-medium text-gray-700 dark:text-gray-300">
        {message}{dots}
      </div>
      
      {/* Progress bar */}
      <div className="mt-6 w-64 h-1 bg-gray-200 rounded overflow-hidden">
        <div className="h-full bg-blue-600 animate-pulse"></div>
      </div>
    </div>
  );
}