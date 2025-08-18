'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Clock, CheckCircle, XCircle, Award, RotateCcw, Twitter } from 'lucide-react';
import Image from 'next/image';
import { useCourse } from '../contexts/CourseContext';
import CancelConfirmModal from './CancelConfirmModal';
import quizQuestions from '../data/quizQuestions.json';
import { shareToTwitter, generateCertificate, downloadCertificate, CertificateData } from '../utils/certificateGenerator';

interface Question {
  id: number;
  question: string;
  options: {
    text: string;
    isCorrect: boolean;
  }[];
  explanation: string;
}

interface DifficultyQuizProps {
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  onQuizComplete: () => void;
}

const DifficultyQuiz: React.FC<DifficultyQuizProps> = ({ difficulty, onQuizComplete }) => {
  const { completeQuiz } = useCourse();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(1200); // 20 minutes
  const [quizStarted, setQuizStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [certificateDataUrl, setCertificateDataUrl] = useState<string | null>(null);

  // Shuffle questions and their answer options
  const shuffleQuestionsAndOptions = useCallback((questionsArray: Question[]) => {
    return questionsArray.map(question => ({
      ...question,
      options: [...question.options].sort(() => Math.random() - 0.5)
    }));
  }, []);

  // Shuffle and select 20 random questions
  useEffect(() => {
    const allQuestions = quizQuestions[difficulty].questions;
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 20);
    const shuffledWithOptions = shuffleQuestionsAndOptions(selected);
    setQuestions(shuffledWithOptions);
  }, [difficulty, shuffleQuestionsAndOptions]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: answerIndex
    }));
  };

  const handleSubmitQuiz = useCallback(async () => {
    let correctAnswers = 0;
    questions.forEach((question, index) => {
      const selectedAnswer = selectedAnswers[index];
      if (selectedAnswer !== undefined && question.options[selectedAnswer]?.isCorrect) {
        correctAnswers++;
      }
    });

    const finalScore = correctAnswers;
    const finalPercentage = Math.round((correctAnswers / questions.length) * 100);
    
    setScore(finalScore);
    setPercentage(finalPercentage);
    setShowResults(true);
    
    // Generate certificate if score is 80% or higher
    if (finalPercentage >= 80) {
      try {
        const certificateData: CertificateData = {
          score: finalScore,
          totalQuestions: questions.length,
          percentage: finalPercentage,
          completionDate: new Date().toLocaleDateString(),
          difficulty: difficulty
        };
        
        const dataUrl = await generateCertificate(certificateData);
        setCertificateDataUrl(dataUrl);
      } catch (error) {
        console.error('Failed to generate certificate:', error);
      }
    }
    
    // Update course context
    completeQuiz(difficulty, finalPercentage);
  }, [questions, selectedAnswers, completeQuiz, difficulty]);

  // Timer effect
  useEffect(() => {
    if (quizStarted && timeLeft > 0 && !showResults) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResults) {
      handleSubmitQuiz();
    }
  }, [quizStarted, timeLeft, showResults, handleSubmitQuiz]);

  const startQuiz = () => {
    setQuizStarted(true);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResults(false);
    setTimeLeft(1200);
    setQuizStarted(false);
    setScore(0);
    setPercentage(0);
    setCertificateDataUrl(null);
    
    // Reshuffle questions and options
    const allQuestions = quizQuestions[difficulty].questions;
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 20);
    const shuffledWithOptions = shuffleQuestionsAndOptions(selected);
    setQuestions(shuffledWithOptions);
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

  const getScoreColor = () => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreMessage = () => {
    if (percentage >= 80) return 'Excellent work! You have mastered this level.';
    if (percentage >= 60) return 'Good job! You have a solid understanding.';
    return 'Keep studying! Review the course materials and try again.';
  };

  if (questions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!quizStarted) {
    return (
      <div className="max-w-4xl mx-auto p-6 relative">
        {/* Decorative background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-pink-50/30 rounded-3xl -z-10"></div>
        <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-2xl -z-10"></div>
        <div className="absolute bottom-10 left-10 w-24 h-24 bg-gradient-to-br from-pink-200/20 to-orange-200/20 rounded-full blur-xl -z-10"></div>
        
        <div className={`bg-gradient-to-r ${getDifficultyColor()} rounded-2xl p-8 text-white text-center mb-8 shadow-2xl border border-white/20 backdrop-blur-sm relative overflow-hidden`}>
          {/* Header decorative pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10 pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
          
          <div className="relative z-10">
            <div className="bg-white/20 backdrop-blur-sm rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 border border-white/30">
              <Award className="w-10 h-10" />
            </div>
            <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white to-white/90 bg-clip-text">
              {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Level Quiz
            </h1>
            <p className="text-lg opacity-90 mb-6">
              Test your knowledge with 20 carefully selected questions from the {difficulty} course.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg py-2 px-3 border border-white/20">
                <CheckCircle className="w-4 h-4" />
                20 Questions
              </div>
              <div className="flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg py-2 px-3 border border-white/20">
                <Clock className="w-4 h-4" />
                20 Minutes
              </div>
              <div className="flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg py-2 px-3 border border-white/20">
                <Award className="w-4 h-4" />
                Certificate Available
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-6 mb-6 shadow-xl relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-purple-50/30 rounded-2xl"></div>
          <div className="relative z-10">
            <h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">Quiz Instructions:</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3 p-2 rounded-lg bg-white/50 border border-blue-100/50">
                <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mt-2.5 flex-shrink-0 shadow-sm"></span>
                <span>You have 20 minutes to complete 20 questions</span>
              </li>
              <li className="flex items-start gap-3 p-2 rounded-lg bg-white/50 border border-blue-100/50">
                <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mt-2.5 flex-shrink-0 shadow-sm"></span>
                <span>Each question has multiple choice answers</span>
              </li>
              <li className="flex items-start gap-3 p-2 rounded-lg bg-white/50 border border-blue-100/50">
                <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mt-2.5 flex-shrink-0 shadow-sm"></span>
                <span>You can navigate between questions before submitting</span>
              </li>
              <li className="flex items-start gap-3 p-2 rounded-lg bg-white/50 border border-blue-100/50">
                <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mt-2.5 flex-shrink-0 shadow-sm"></span>
                <span>Score 80% or higher to earn a certificate</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={startQuiz}
            className={`inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r ${getDifficultyColor()} text-white rounded-xl font-semibold text-lg hover:opacity-90 hover:scale-105 transition-all duration-200 shadow-2xl border border-white/20 backdrop-blur-sm relative overflow-hidden group`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            <Award className="w-6 h-6 relative z-10" />
            <span className="relative z-10">Start Quiz</span>
          </button>
        </div>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="max-w-4xl mx-auto p-6 relative" style={{ userSelect: 'none', WebkitUserSelect: 'none', MozUserSelect: 'none', msUserSelect: 'none' }}>
        {/* Decorative background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-pink-50/30 rounded-3xl -z-10"></div>
        <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-2xl -z-10"></div>
        <div className="absolute bottom-10 left-10 w-24 h-24 bg-gradient-to-br from-pink-200/20 to-orange-200/20 rounded-full blur-xl -z-10"></div>
        
        <div className={`bg-gradient-to-r ${getDifficultyColor()} rounded-2xl p-8 text-white text-center mb-8 shadow-2xl border border-white/20 backdrop-blur-sm relative overflow-hidden`}>
          {/* Header decorative pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10 pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
          
          <div className="relative z-10">
            <div className="bg-white/20 backdrop-blur-sm rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 border border-white/30">
              <Award className="w-10 h-10" />
            </div>
            <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white to-white/90 bg-clip-text">Quiz Complete!</h1>
            <div className="text-6xl font-bold mb-4 bg-gradient-to-r from-white to-white/90 bg-clip-text drop-shadow-lg">{percentage}%</div>
            <p className="text-lg opacity-90">
              You scored {score} out of {questions.length} questions correctly
            </p>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-6 mb-6 shadow-xl relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-purple-50/30 rounded-2xl"></div>
          <div className="relative z-10">
            <div className={`text-center ${getScoreColor()}`}>
              <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-current to-current/80 bg-clip-text">{getScoreMessage()}</h3>
            </div>
            
            {percentage >= 80 && (
              <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200/50 rounded-xl text-center shadow-lg backdrop-blur-sm relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-100/20 to-emerald-100/20 rounded-xl"></div>
                <div className="relative z-10">
                  <div className="bg-green-100/50 backdrop-blur-sm rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2 border border-green-200/50">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <p className="text-green-800 font-semibold bg-gradient-to-r from-green-800 to-green-700 bg-clip-text text-transparent">Congratulations! You&apos;ve earned a certificate!</p>
                  <p className="text-green-700 text-sm mt-1">Your certificate has been generated below.</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-6 mb-6 shadow-xl relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-purple-50/30 rounded-2xl"></div>
          <div className="relative z-10">
            <h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">Review Your Answers:</h3>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {questions.map((question, index) => {
                const selectedAnswer = selectedAnswers[index];
                const isCorrect = selectedAnswer !== undefined && question.options[selectedAnswer]?.isCorrect;
                const correctAnswerIndex = question.options.findIndex(option => option.isCorrect);
                
                return (
                  <div key={question.id} className="border-b border-gray-200 pb-4">
                    <div className="flex items-start gap-3 mb-2">
                      {isCorrect ? (
                        <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                      )}
                      <div className="flex-1">
                        <p className="font-medium text-gray-800 mb-2">
                          {index + 1}. {question.question}
                        </p>
                        <p className="text-sm text-gray-600 mb-1">
                          <span className="font-medium">Your answer:</span> {selectedAnswer !== undefined ? question.options[selectedAnswer].text : 'Not answered'}
                        </p>
                        {!isCorrect && (
                          <p className="text-sm text-green-600 mb-1">
                            <span className="font-medium">Correct answer:</span> {question.options[correctAnswerIndex].text}
                          </p>
                        )}
                        <p className="text-sm text-gray-600 italic">{question.explanation}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Certificate Display Section */}
        {percentage >= 80 && certificateDataUrl && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-6 mb-6 shadow-xl relative">
            <div className="absolute inset-0 bg-gradient-to-br from-green-50/30 to-emerald-50/30 rounded-2xl"></div>
            <div className="relative z-10 text-center">
              <h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-green-800 to-green-600 bg-clip-text text-transparent">Your Certificate</h3>
              <div className="mb-4 p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-green-200/50">
                <Image 
                  src={certificateDataUrl} 
                  alt="Certificate of Completion" 
                  className="max-w-full h-auto rounded-lg shadow-lg mx-auto"
                  style={{ maxHeight: '400px' }}
                  width={800}
                  height={600}
                />
              </div>
              <button
                onClick={() => certificateDataUrl && downloadCertificate(certificateDataUrl, `zama-${difficulty}-certificate.png`)}
                className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-semibold hover:from-green-600 hover:to-green-700 hover:scale-105 transition-all duration-200 shadow-xl border border-white/20 backdrop-blur-sm relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                <Award className="w-5 h-5 relative z-10" />
                <span className="relative z-10">Download Certificate</span>
              </button>
            </div>
          </div>
        )}

        {/* Twitter Share Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-6 mb-6 shadow-xl relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-purple-50/30 rounded-2xl"></div>
          <div className="relative z-10 text-center">
            <h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">Share Your Achievement!</h3>
            <p className="text-gray-600 mb-4">Let others know about your quiz performance and invite them to test their knowledge!</p>
            <button
               onClick={() => shareToTwitter(score, questions.length, percentage, difficulty)}
               className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 hover:scale-105 transition-all duration-200 shadow-xl border border-white/20 backdrop-blur-sm relative overflow-hidden group"
             >
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
              <Twitter className="w-5 h-5 relative z-10" />
              <span className="relative z-10">Share on Twitter</span>
            </button>
          </div>
        </div>

        <div className="text-center flex gap-4 justify-center">
          <button
            onClick={restartQuiz}
            className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl font-semibold hover:from-gray-700 hover:to-gray-800 hover:scale-105 transition-all duration-200 shadow-xl border border-white/20 backdrop-blur-sm relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            <RotateCcw className="w-5 h-5 relative z-10" />
            <span className="relative z-10">Retake Quiz</span>
          </button>
          <button
            onClick={onQuizComplete}
            className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 hover:scale-105 transition-all duration-200 shadow-xl border border-white/20 backdrop-blur-sm relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            <span className="relative z-10">Back to Overview</span>
          </button>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="max-w-4xl mx-auto p-6 relative">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-pink-50/30 rounded-3xl -z-10"></div>
      <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-2xl -z-10"></div>
      <div className="absolute bottom-10 left-10 w-24 h-24 bg-gradient-to-br from-pink-200/20 to-orange-200/20 rounded-full blur-xl -z-10"></div>
      
      {/* Header with timer and progress */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-4 mb-6 shadow-xl relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-purple-50/30 rounded-2xl"></div>
        <div className="relative z-10">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-semibold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Quiz
              </h2>
              <span className="text-sm text-gray-600 bg-white/50 backdrop-blur-sm px-3 py-1 rounded-full border border-gray-200/50">
                Question {currentQuestion + 1} of {questions.length}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-red-600 bg-red-50/50 backdrop-blur-sm px-3 py-2 rounded-xl border border-red-200/50">
                <Clock className="w-5 h-5" />
                <span className="font-mono text-lg font-semibold">{formatTime(timeLeft)}</span>
              </div>
              <button
                onClick={() => setShowCancelModal(true)}
                className="px-3 py-2 bg-gray-100/70 backdrop-blur-sm text-gray-600 rounded-xl hover:bg-gray-200/70 hover:text-gray-800 transition-all duration-200 border border-gray-200/50"
              >
                Cancel
              </button>
            </div>
          </div>
          <div className="w-full bg-gray-200/50 backdrop-blur-sm rounded-full h-3 border border-gray-300/30">
            <div
              className={`bg-gradient-to-r ${getDifficultyColor()} h-3 rounded-full transition-all duration-300 shadow-sm`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Question */}
      <div className={`bg-white/80 backdrop-blur-sm rounded-2xl border-2 ${getDifficultyBorder()}/50 p-6 mb-6 shadow-xl relative`}>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-purple-50/30 rounded-2xl"></div>
        <div className="relative z-10">
          <h3 className="text-xl font-semibold mb-6 text-gray-800 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            {currentQ.question}
          </h3>
          
          <div className="space-y-3">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(currentQuestion, index)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 backdrop-blur-sm relative overflow-hidden group ${
                  selectedAnswers[currentQuestion] === index
                    ? `border-blue-500/70 bg-blue-50/70 shadow-lg scale-[1.02]`
                    : 'border-gray-200/50 hover:border-gray-300/70 hover:bg-gray-50/70 hover:shadow-md hover:scale-[1.01]'
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                <div className="flex items-center gap-3 relative z-10">
                  <div className={`w-5 h-5 rounded-full border-2 transition-all duration-200 ${
                    selectedAnswers[currentQuestion] === index
                      ? 'border-blue-500 bg-blue-500 shadow-md'
                      : 'border-gray-300 group-hover:border-blue-300'
                  }`}>
                    {selectedAnswers[currentQuestion] === index && (
                      <div className="w-2.5 h-2.5 bg-white rounded-full mx-auto mt-0.5 shadow-sm"></div>
                    )}
                  </div>
                  <span className="text-gray-700 font-medium">{option.text}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-4 shadow-xl relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-purple-50/30 rounded-2xl"></div>
        <div className="relative z-10">
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
              disabled={currentQuestion === 0}
              className="px-4 py-2 bg-white/70 backdrop-blur-sm text-gray-700 rounded-xl hover:bg-white/90 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 border border-gray-200/50"
            >
              Previous
            </button>

            <div className="flex gap-2 flex-wrap justify-center max-w-md">
              {questions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentQuestion(index)}
                  className={`w-9 h-9 rounded-full text-sm font-medium transition-all duration-200 border backdrop-blur-sm ${
                    index === currentQuestion
                      ? `bg-gradient-to-r ${getDifficultyColor()} text-white shadow-lg scale-110 border-white/30`
                      : selectedAnswers[index] !== undefined
                      ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border-green-300/50 hover:shadow-md hover:scale-105'
                      : 'bg-white/70 text-gray-600 hover:bg-white/90 hover:shadow-md hover:scale-105 border-gray-200/50'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            {currentQuestion === questions.length - 1 ? (
              <button
                onClick={handleSubmitQuiz}
                className={`px-6 py-2 bg-gradient-to-r ${getDifficultyColor()} text-white rounded-xl font-semibold hover:opacity-90 hover:scale-105 transition-all duration-200 shadow-xl border border-white/20 backdrop-blur-sm relative overflow-hidden group`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                <span className="relative z-10">Submit Quiz</span>
              </button>
            ) : (
              <button
                onClick={() => setCurrentQuestion(Math.min(questions.length - 1, currentQuestion + 1))}
                className="px-4 py-2 bg-white/70 backdrop-blur-sm text-gray-700 rounded-xl hover:bg-white/90 hover:shadow-md transition-all duration-200 border border-gray-200/50"
              >
                Next
              </button>
            )}
          </div>

          {/* Answer status */}
          <div className="text-center text-sm text-gray-600">
            <div className="bg-white/50 backdrop-blur-sm rounded-lg px-4 py-2 border border-gray-200/50 inline-block">
              <p className="font-medium">
                Answered: <span className="text-blue-600 font-semibold">{Object.keys(selectedAnswers).length}</span> of <span className="font-semibold">{questions.length}</span> questions
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Cancel Confirmation Modal */}
       <CancelConfirmModal
         isOpen={showCancelModal}
         onClose={() => setShowCancelModal(false)}
         onConfirmCancel={() => {
           setShowCancelModal(false);
           onQuizComplete();
         }}
         onGoHome={() => {
           setShowCancelModal(false);
           window.location.href = '/';
         }}
         onGoToDifficulty={() => {
           setShowCancelModal(false);
           window.location.href = '/';
         }}
         type="quiz"
         difficulty={difficulty}
       />
    </div>
  );
};

export default DifficultyQuiz;