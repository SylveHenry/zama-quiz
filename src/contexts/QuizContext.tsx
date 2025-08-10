'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface QuizContextType {
  score: number;
  totalQuestions: number;
  currentQuestion: number;
  setScore: (score: number) => void;
  setTotalQuestions: (total: number) => void;
  setCurrentQuestion: (current: number) => void;
  getScorePercentage: () => number;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};

interface QuizProviderProps {
  children: ReactNode;
}

export const QuizProvider: React.FC<QuizProviderProps> = ({ children }) => {
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(20);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const getScorePercentage = () => {
    if (totalQuestions === 0) return 0;
    return Math.round((score / totalQuestions) * 100);
  };

  const value: QuizContextType = {
    score,
    totalQuestions,
    currentQuestion,
    setScore,
    setTotalQuestions,
    setCurrentQuestion,
    getScorePercentage,
  };

  return (
    <QuizContext.Provider value={value}>
      {children}
    </QuizContext.Provider>
  );
};