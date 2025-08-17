'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, BookOpen, CheckCircle, Play, X } from 'lucide-react';
import CancelConfirmModal from './CancelConfirmModal';

interface Slide {
  id: number;
  title: string;
  content: string;
  keyPoints: string[];
}

interface Course {
  title: string;
  description: string;
  slides: Slide[];
}

interface CourseSlideshowProps {
  course: Course;
  onCourseComplete: () => void;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

const CourseSlideshow: React.FC<CourseSlideshowProps> = ({ course, onCourseComplete, difficulty }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [completedSlides, setCompletedSlides] = useState<Set<number>>(new Set());
  const [isCompleted, setIsCompleted] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  const totalSlides = course.slides.length;
  const progress = ((currentSlide + 1) / totalSlides) * 100;

  useEffect(() => {
    // Mark current slide as completed when user stays on it for at least 3 seconds
    if (isStarted && !completedSlides.has(currentSlide)) {
      const timer = setTimeout(() => {
        setCompletedSlides(prev => new Set([...prev, currentSlide]));
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [currentSlide, isStarted, completedSlides]);

  useEffect(() => {
    // Check if course is completed
    if (completedSlides.size === totalSlides && !isCompleted) {
      setIsCompleted(true);
      setTimeout(() => {
        onCourseComplete();
      }, 1000);
    }
  }, [completedSlides, totalSlides, isCompleted, onCourseComplete]);

  const nextSlide = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const startCourse = () => {
    setIsStarted(true);
  };

  const getDifficultyColor = () => {
    switch (difficulty) {
      case 'beginner': return 'from-green-500 to-emerald-600';
      case 'intermediate': return 'from-blue-500 to-indigo-600';
      case 'advanced': return 'from-purple-500 to-violet-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getDifficultyBorder = () => {
    switch (difficulty) {
      case 'beginner': return 'border-green-500';
      case 'intermediate': return 'border-blue-500';
      case 'advanced': return 'border-purple-500';
      default: return 'border-gray-500';
    }
  };

  if (!isStarted) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className={`bg-gradient-to-r ${getDifficultyColor()} rounded-lg p-8 text-white text-center mb-8`}>
          <BookOpen className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
          <p className="text-lg opacity-90 mb-6">{course.description}</p>
          <div className="flex items-center justify-center gap-4 text-sm opacity-80">
            <span className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              {totalSlides} Slides
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Level
            </span>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={startCourse}
            className={`inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r ${getDifficultyColor()} text-white rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity shadow-lg`}
          >
            <Play className="w-6 h-6" />
            Start Course
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold text-gray-800">{course.title}</h2>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">
              Slide {currentSlide + 1} of {totalSlides}
            </span>
            <button
              onClick={() => setShowCancelModal(true)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-gray-700"
              aria-label="Cancel course"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`bg-gradient-to-r ${getDifficultyColor()} h-2 rounded-full transition-all duration-300`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Slide Content */}
      <div className={`bg-gradient-to-br from-white/95 via-blue-50/20 to-purple-50/20 backdrop-blur-sm rounded-2xl border-2 ${getDifficultyBorder()} shadow-xl p-8 mb-6 min-h-[400px] relative overflow-hidden`}>
        {/* Decorative background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full blur-xl"></div>
          <div className="absolute bottom-8 left-8 w-12 h-12 bg-gradient-to-br from-indigo-400 to-pink-400 rounded-full blur-lg"></div>
        </div>
        <div className="relative flex items-center gap-3 mb-6">
          <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${getDifficultyColor()} flex items-center justify-center text-white font-bold shadow-lg`}>
            {currentSlide + 1}
          </div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-800 via-blue-800 to-purple-800 bg-clip-text text-transparent">{course.slides[currentSlide].title}</h3>
          {completedSlides.has(currentSlide) && (
            <CheckCircle className="w-6 h-6 text-green-500 drop-shadow-sm" />
          )}
        </div>

        <div className="relative space-y-6">
          <p className="text-gray-700 leading-relaxed text-lg font-medium bg-white/60 backdrop-blur-sm rounded-lg p-4 shadow-sm border border-white/50">{course.slides[currentSlide].content}</p>
          
          <div className="space-y-4">
            <h4 className="font-bold text-gray-800 text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Key Points:</h4>
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 shadow-sm border border-white/50 space-y-3">
              {course.slides[currentSlide].keyPoints.map((point, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${getDifficultyColor()} mt-2 flex-shrink-0 shadow-sm`}></div>
                  <p className="text-gray-700 leading-relaxed font-medium">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {isCompleted && (
          <div className="relative mt-8 p-6 bg-gradient-to-br from-green-50/90 via-emerald-50/90 to-teal-50/90 backdrop-blur-sm border-2 border-green-200/50 rounded-2xl shadow-lg overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5"></div>
            <div className="relative flex items-center gap-3 text-green-800">
              <CheckCircle className="w-8 h-8 drop-shadow-sm" />
              <span className="font-bold text-lg bg-gradient-to-r from-green-700 to-emerald-700 bg-clip-text text-transparent">Course Completed!</span>
            </div>
            <p className="relative text-green-700 mt-3 font-medium">Great job! You can now take the quiz to test your knowledge.</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          Previous
        </button>

        {/* Slide Indicators */}
        <div className="flex gap-2">
          {course.slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide
                  ? `bg-gradient-to-r ${getDifficultyColor()}`
                  : completedSlides.has(index)
                  ? 'bg-green-400'
                  : 'bg-gray-300'
              }`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          disabled={currentSlide === totalSlides - 1}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Next
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Completion Status */}
      <div className="mt-6 text-center text-sm text-gray-600">
        <p>
          Progress: {completedSlides.size} of {totalSlides} slides completed
          {completedSlides.size === totalSlides && " ✅"}
        </p>
      </div>

      {/* Cancel Confirmation Modal */}
      <CancelConfirmModal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        onConfirmCancel={() => {
          setShowCancelModal(false);
          onCourseComplete();
        }}
        onGoHome={() => {
          setShowCancelModal(false);
          window.location.href = '/';
        }}
        onGoToDifficulty={() => {
          setShowCancelModal(false);
          window.location.href = '/';
        }}
        type="course"
        difficulty={difficulty}
      />
    </div>
  );
};

export default CourseSlideshow;