'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useQuiz } from '../contexts/QuizContext';
import { useCourse } from '../contexts/CourseContext';
import { usePathname } from 'next/navigation';
import { BookOpen, Award, Clock } from 'lucide-react';

const Header: React.FC = () => {
  const { score, totalQuestions, getScorePercentage } = useQuiz();
  const { progress } = useCourse();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentSession, setCurrentSession] = useState<{
    type: 'course' | 'quiz' | null;
    difficulty: 'beginner' | 'intermediate' | 'advanced' | null;
    progress?: number;
  }>({ type: null, difficulty: null });

  // Detect current session based on pathname and quiz state
  useEffect(() => {
    if (pathname === '/beginner' || pathname === '/intermediate' || pathname === '/advanced') {
      const difficulty = pathname.slice(1) as 'beginner' | 'intermediate' | 'advanced';
      
      // Check if quiz is active (has questions loaded)
      if (totalQuestions > 0) {
        setCurrentSession({
          type: 'quiz',
          difficulty,
          progress: Math.round((score / totalQuestions) * 100)
        });
      } else {
        // Assume course is active
        setCurrentSession({
          type: 'course',
          difficulty,
          progress: 0 // Course progress would need to be tracked separately
        });
      }
    } else {
      setCurrentSession({ type: null, difficulty: null });
    }
  }, [pathname, totalQuestions, score]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-600';
      case 'intermediate': return 'text-blue-600';
      case 'advanced': return 'text-purple-600';
      default: return 'text-gray-600';
    }
  };
  
  return (
    <header className="w-full bg-gradient-to-r from-yellow-400 to-yellow-300 border-b border-yellow-500/30 sticky top-0 z-50 shadow-lg relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
          <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div className="relative">
              <Image 
                src="/logo.png" 
                alt="Zama Logo" 
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">
                Zama
              </h1>
              <p className="text-xs text-gray-600">Introduction to Zama</p>
            </div>
          </Link>

          {/* Right side content */}
          <div className="flex items-center space-x-4">
            {/* Session Progress - visible when in course or quiz */}
            {currentSession.type && currentSession.difficulty && (
              <div className="flex items-center space-x-2">
                {currentSession.type === 'course' ? (
                  <BookOpen className="w-4 h-4 text-blue-600" />
                ) : (
                  <Award className="w-4 h-4 text-orange-600" />
                )}
                <span className={`text-sm font-medium ${getDifficultyColor(currentSession.difficulty)}`}>
                  {currentSession.difficulty.charAt(0).toUpperCase() + currentSession.difficulty.slice(1)} {currentSession.type === 'course' ? 'Course' : 'Quiz'}
                </span>
              </div>
            )}

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