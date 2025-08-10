'use client';

import React, { useState } from 'react';
import { useQuiz } from '../contexts/QuizContext';

const Header: React.FC = () => {
  const { score, totalQuestions, getScorePercentage } = useQuiz();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  return (
    <header className="w-full bg-gradient-to-r from-yellow-400 to-yellow-300 border-b border-yellow-500/30 sticky top-0 z-50 shadow-lg relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img 
                src="/logo.png" 
                alt="Zama Logo" 
                className="w-10 h-10 object-contain"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">
                Zama
              </h1>
              <p className="text-xs text-gray-600">Privacy Quiz</p>
            </div>
          </div>

          {/* Right side content */}
          <div className="flex items-center space-x-4">
            {/* Score - visible on all screen sizes */}
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <span className="text-sm text-gray-700">Score: {score}/{totalQuestions} ({getScorePercentage()}%)</span>
            </div>

            {/* Navigation - hidden on mobile */}
            <nav className="hidden md:flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-sm text-gray-700">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Live Quiz</span>
              </div>
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-700 hover:text-orange-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-sm border-t border-yellow-500/30">
            <div className="px-4 py-4 space-y-3">
              <a 
                href="https://www.zama.ai/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="block text-sm text-gray-600 hover:text-orange-600 transition-colors font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Official page
              </a>
              <a 
                href="/how-to-play" 
                className="block text-sm text-gray-600 hover:text-orange-600 transition-colors font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                How to play
              </a>
              <a 
                href="https://www.zama.ai/introduction-to-homomorphic-encryption" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="block text-sm text-gray-600 hover:text-orange-600 transition-colors font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                6-minute intro to FHE
              </a>
              <a 
                href="https://docs.zama.ai/protocol/zama-protocol-litepaper" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="block text-sm text-gray-600 hover:text-orange-600 transition-colors font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Litepaper
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;