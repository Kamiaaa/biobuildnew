'use client';

import React from 'react';
import { FaYoutube } from 'react-icons/fa';

interface YouTubeSectionProps {
  youtubeLinks: string[];
  title?: string;
}

const YouTubeSection: React.FC<YouTubeSectionProps> = ({ 
  youtubeLinks, 
  title = "YouTube Videos" 
}) => {
  if (!youtubeLinks || youtubeLinks.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mt-8">
      <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
        <FaYoutube className="text-red-600 mr-3 text-3xl" />
        {title}
      </h3>
      <div className="space-y-4">
        {youtubeLinks.map((link, index) => (
          <a
            key={index}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-4 bg-gray-50 hover:bg-red-50 border border-gray-200 hover:border-red-300 rounded-lg transition-all duration-200 group"
          >
            <div className="flex items-center">
              <div className="bg-red-600 group-hover:bg-red-700 rounded-full p-3 mr-4 transition-colors duration-200">
                <FaYoutube className="text-white text-xl" />
              </div>
              <div>
                {/* <p className="text-gray-900 font-medium group-hover:text-red-600 transition-colors duration-200">
                  Video {index + 1}
                </p> */}
                {/* <p className="text-sm text-gray-500 truncate max-w-md">
                  {link}
                </p> */}
              </div>
            </div>
            <div className="flex items-center text-red-600 group-hover:text-red-700 font-medium">
              <span className="mr-2">Watch on YouTube</span>
              <svg 
                className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M13 7l5 5m0 0l-5 5m5-5H6" 
                />
              </svg>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default YouTubeSection;
