'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface CourseProgress {
  beginner: {
    completed: boolean;
    completedAt?: Date;
    quizTaken: boolean;
    quizScore?: number;
  };
  intermediate: {
    completed: boolean;
    completedAt?: Date;
    quizTaken: boolean;
    quizScore?: number;
  };
  advanced: {
    completed: boolean;
    completedAt?: Date;
    quizTaken: boolean;
    quizScore?: number;
  };
}

interface CourseContextType {
  progress: CourseProgress;
  completeCourse: (difficulty: 'beginner' | 'intermediate' | 'advanced') => void;
  completeQuiz: (difficulty: 'beginner' | 'intermediate' | 'advanced', score: number) => void;
  resetProgress: () => void;
  isCourseCompleted: (difficulty: 'beginner' | 'intermediate' | 'advanced') => boolean;
  isQuizAvailable: (difficulty: 'beginner' | 'intermediate' | 'advanced') => boolean;
  getOverallProgress: () => {
    coursesCompleted: number;
    quizzesCompleted: number;
    totalCourses: number;
    overallPercentage: number;
  };
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

const initialProgress: CourseProgress = {
  beginner: {
    completed: false,
    quizTaken: false,
  },
  intermediate: {
    completed: false,
    quizTaken: false,
  },
  advanced: {
    completed: false,
    quizTaken: false,
  },
};

interface CourseProviderProps {
  children: ReactNode;
}

export const CourseProvider: React.FC<CourseProviderProps> = ({ children }) => {
  const [progress, setProgress] = useState<CourseProgress>(initialProgress);

  // Load progress from localStorage on mount
  useEffect(() => {
    const savedProgress = localStorage.getItem('zama-course-progress');
    if (savedProgress) {
      try {
        const parsed = JSON.parse(savedProgress);
        // Convert date strings back to Date objects
        Object.keys(parsed).forEach(key => {
          if (parsed[key].completedAt) {
            parsed[key].completedAt = new Date(parsed[key].completedAt);
          }
        });
        setProgress(parsed);
      } catch (error) {
        console.error('Error loading course progress:', error);
      }
    }
  }, []);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('zama-course-progress', JSON.stringify(progress));
  }, [progress]);

  const completeCourse = (difficulty: 'beginner' | 'intermediate' | 'advanced') => {
    setProgress(prev => ({
      ...prev,
      [difficulty]: {
        ...prev[difficulty],
        completed: true,
        completedAt: new Date(),
      },
    }));
  };

  const completeQuiz = (difficulty: 'beginner' | 'intermediate' | 'advanced', score: number) => {
    setProgress(prev => ({
      ...prev,
      [difficulty]: {
        ...prev[difficulty],
        quizTaken: true,
        quizScore: score,
      },
    }));
  };

  const resetProgress = () => {
    setProgress(initialProgress);
    localStorage.removeItem('zama-course-progress');
  };

  const isCourseCompleted = (difficulty: 'beginner' | 'intermediate' | 'advanced') => {
    return progress[difficulty].completed;
  };

  const isQuizAvailable = (difficulty: 'beginner' | 'intermediate' | 'advanced') => {
    return progress[difficulty].completed;
  };

  const getOverallProgress = () => {
    const difficulties: ('beginner' | 'intermediate' | 'advanced')[] = ['beginner', 'intermediate', 'advanced'];
    const coursesCompleted = difficulties.filter(d => progress[d].completed).length;
    const quizzesCompleted = difficulties.filter(d => progress[d].quizTaken).length;
    const totalCourses = difficulties.length;
    const overallPercentage = Math.round(((coursesCompleted + quizzesCompleted) / (totalCourses * 2)) * 100);

    return {
      coursesCompleted,
      quizzesCompleted,
      totalCourses,
      overallPercentage,
    };
  };

  const value: CourseContextType = {
    progress,
    completeCourse,
    completeQuiz,
    resetProgress,
    isCourseCompleted,
    isQuizAvailable,
    getOverallProgress,
  };

  return (
    <CourseContext.Provider value={value}>
      {children}
    </CourseContext.Provider>
  );
};

export const useCourse = (): CourseContextType => {
  const context = useContext(CourseContext);
  if (context === undefined) {
    throw new Error('useCourse must be used within a CourseProvider');
  }
  return context;
};

export default CourseContext;