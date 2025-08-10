'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import quizData from './zama_quiz_structured.json';
import { useQuiz } from '../contexts/QuizContext';
import { generateCertificate, downloadCertificate, shareToTwitter, CertificateData } from '../utils/certificateGenerator';





interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

// Utility function to shuffle array
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Function to transform and randomize quiz data
const prepareQuizQuestions = (): Question[] => {
  // Shuffle questions and take only 20
  const shuffledQuestions = shuffleArray(quizData.questions).slice(0, 20);
  
  return shuffledQuestions.map((q, index) => {
    // Shuffle options for each question
    const shuffledOptions = shuffleArray(q.options);
    
    // Find the new index of the correct answer after shuffling
    const correctAnswerIndex = shuffledOptions.findIndex(option => option.is_correct);
    
    return {
      id: index + 1,
      question: q.question_text,
      options: shuffledOptions.map(option => option.text),
      correctAnswer: correctAnswerIndex,
      explanation: q.explanation
    };
  });
};

const Quiz: React.FC = () => {
  const { score, setScore, setTotalQuestions, setCurrentQuestion: setContextCurrentQuestion } = useQuiz();
  const [showWelcome, setShowWelcome] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>([]);
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [certificateUrl, setCertificateUrl] = useState<string | null>(null);
  const [isGeneratingCertificate, setIsGeneratingCertificate] = useState(false);

  // Initialize questions on component mount
  useEffect(() => {
    const newQuestions = prepareQuizQuestions();
    setQuizQuestions(newQuestions);
    setAnsweredQuestions(new Array(newQuestions.length).fill(false));
    setTotalQuestions(newQuestions.length);
  }, [setTotalQuestions]);

  // Update context when current question changes
  useEffect(() => {
    setContextCurrentQuestion(currentQuestion);
  }, [currentQuestion, setContextCurrentQuestion]);

  useEffect(() => {
    if (timeLeft > 0 && !showResult && !quizCompleted && !showWelcome && quizQuestions.length > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResult && !showWelcome && quizQuestions.length > 0) {
      handleTimeUp();
    }
  }, [timeLeft, showResult, quizCompleted, showWelcome, quizQuestions.length]);

  const handleTimeUp = () => {
    setShowResult(true);
    setShowExplanation(true);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null || quizQuestions.length === 0) return;
    
    setShowResult(true);
    setShowExplanation(true);
    
    const newAnsweredQuestions = [...answeredQuestions];
    newAnsweredQuestions[currentQuestion] = true;
    setAnsweredQuestions(newAnsweredQuestions);
    
    if (selectedAnswer === quizQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setShowExplanation(false);
      setTimeLeft(30);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleBeginQuiz = () => {
    setShowWelcome(false);
    setScore(0);
    setContextCurrentQuestion(0);
  };

  const handleRestart = () => {
    // Generate new randomized questions
    const newQuestions = prepareQuizQuestions();
    setQuizQuestions(newQuestions);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
    setShowExplanation(false);
    setAnsweredQuestions(new Array(newQuestions.length).fill(false));
    setTimeLeft(30);
    setQuizCompleted(false);
    setShowWelcome(true);
    setTotalQuestions(newQuestions.length);
    setContextCurrentQuestion(0);
    setCertificateUrl(null);
    setIsGeneratingCertificate(false);
  };



  const getScoreMessage = () => {
    const percentage = (score / quizQuestions.length) * 100;
    if (percentage >= 90) return '🚀 Zama Privacy Master! Outstanding!';
    if (percentage >= 80) return '💎 Excellent! You are privacy grounded!';
    if (percentage >= 70) return '⭐ Great job! You are privacy oriented!';
    if (percentage >= 60) return '📈 Good effort! Room for improvement!';
    return '🎉 Congratulations! You are privacy centered!';
  };

  const handleGenerateCertificate = useCallback(async () => {
    if (isGeneratingCertificate) return;
    
    setIsGeneratingCertificate(true);
    try {
      const percentage = Math.round((score / quizQuestions.length) * 100);
      const certificateData: CertificateData = {
        score,
        totalQuestions: quizQuestions.length,
        percentage,
        completionDate: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      };
      
      const dataUrl = await generateCertificate(certificateData);
      setCertificateUrl(dataUrl);
    } catch (error) {
      console.error('Error generating certificate:', error);
      alert('Error generating certificate. Please try again.');
    } finally {
      setIsGeneratingCertificate(false);
    }
  }, [isGeneratingCertificate, score, quizQuestions.length]);

  const handleDownloadCertificate = () => {
    if (certificateUrl) {
      downloadCertificate(certificateUrl);
    }
  };

  const handleShareToTwitter = () => {
    const percentage = Math.round((score / quizQuestions.length) * 100);
    shareToTwitter(score, quizQuestions.length, percentage, certificateUrl || undefined);
  };

  // Generate certificate when quiz is completed
  useEffect(() => {
    if (quizCompleted && !certificateUrl && !isGeneratingCertificate) {
      handleGenerateCertificate();
    }
  }, [quizCompleted, certificateUrl, isGeneratingCertificate, handleGenerateCertificate]);

  // Show welcome screen
  if (showWelcome) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-200 via-yellow-300 to-yellow-400 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white/80 backdrop-blur-sm rounded-2xl border border-yellow-400/30 p-8 animate-fade-in">
          <div className="text-center space-y-6">
            <div className="flex justify-center animate-float">
              <svg 
                width="120" 
                height="120" 
                viewBox="0 0 24 24" 
                className="mx-auto"
              >
                <path 
                  d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,11.5V15.5C14.8,16.4 14.4,17 13.5,17H10.5C9.6,17 9.2,16.4 9.2,15.5V11.5C9.2,8.6 10.6,7 12,7Z" 
                  fill="black" 
                  stroke="#f97316" 
                  strokeWidth="1.5"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-4">Zama Privacy Quiz</h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Test your Zama Confidential knowledge. Can you decrypt the unknown?
              </p>
            </div>
            <div className="bg-yellow-100/80 rounded-xl p-6 space-y-2">
              <div className="flex items-center justify-center space-x-2 text-gray-700">
                <span className="text-2xl">⏱️</span>
                <span className="font-semibold">20 questions</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-gray-700">
                <span className="text-2xl">🎯</span>
                <span className="font-semibold">30 seconds per question</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-gray-700">
                <span className="text-2xl">🎓</span>
                <span className="font-semibold">Test your knowledge</span>
              </div>
            </div>
            <button
              onClick={handleBeginQuiz}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 animate-pulse-glow text-lg"
            >
              🚀 Begin Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (quizCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-200 via-yellow-300 to-yellow-400 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white/80 backdrop-blur-sm rounded-2xl border border-yellow-400/30 p-8 animate-fade-in">
          <div className="text-center space-y-6">
            <div className="relative">
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center animate-pulse-glow">
                <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-float">
                <span className="text-sm font-bold text-black">{score}</span>
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Quiz Completed!
              </h2>
              <p className="text-xl text-gray-600 mb-4">{getScoreMessage()}</p>
            </div>
            
            <div className="bg-yellow-100/80 rounded-xl p-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Final Score:</span>
                <span className="text-2xl font-bold text-gray-800">
                  {score}/{quizQuestions.length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Percentage:</span>
                <span className="text-xl font-bold text-gray-800">
                  {Math.round((score / quizQuestions.length) * 100)}%
                </span>
              </div>
              <div className="w-full bg-yellow-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-orange-400 to-red-500 h-3 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${(score / quizQuestions.length) * 100}%` }}
                ></div>
              </div>
            </div>
            
            {/* Certificate Preview */}
            {certificateUrl && (
              <div className="bg-white/90 rounded-xl p-4 border border-yellow-400/30">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 text-center">Your Certificate</h3>
                <div className="flex justify-center mb-4">
                  <Image 
                    src={certificateUrl} 
                    alt="Certificate" 
                    width={400}
                    height={200}
                    className="max-w-full h-auto rounded-lg border border-gray-300 shadow-lg"
                    style={{ maxHeight: '200px' }}
                  />
                </div>
              </div>
            )}
            
            {/* Action Buttons */}
            <div className="space-y-3">
              {certificateUrl ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <button
                    onClick={handleShareToTwitter}
                    className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                    <span>Share to X</span>
                  </button>
                  <button
                    onClick={handleDownloadCertificate}
                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 16l-6-6h4V4h4v6h4l-6 6zm6 4H6v2h12v-2z"/>
                    </svg>
                    <span>Download Certificate</span>
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-center py-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
                  <span className="ml-3 text-gray-600">Generating certificate...</span>
                </div>
              )}
              
              <button
                onClick={handleRestart}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 animate-pulse-glow"
              >
                🔄 Take Quiz Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show loading state if questions aren't ready
  if (quizQuestions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-200 via-yellow-300 to-yellow-400 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white/80 backdrop-blur-sm rounded-2xl border border-yellow-400/30 p-8 animate-fade-in">
          <div className="text-center space-y-6">
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center animate-spin">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Preparing Your Quiz...</h2>
            <p className="text-gray-600">Randomizing questions and options for a unique experience!</p>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = quizQuestions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-200 via-yellow-300 to-yellow-400 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full space-y-6">
        {/* Progress Bar */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-yellow-400/30 p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">
              Question {currentQuestion + 1} of {quizQuestions.length}
            </span>
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${timeLeft > 10 ? 'bg-green-400' : timeLeft > 5 ? 'bg-yellow-400' : 'bg-red-400'} animate-pulse`}></div>
              <span className={`text-sm font-mono ${timeLeft > 10 ? 'text-green-400' : timeLeft > 5 ? 'text-yellow-400' : 'text-red-400'}`}>
                {timeLeft}s
              </span>
            </div>
          </div>
          <div className="w-full bg-yellow-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-orange-400 to-red-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-yellow-400/30 p-8 animate-slide-in">
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center flex-shrink-0 animate-float">
                <span className="text-white font-bold">{currentQuestion + 1}</span>
              </div>
              <div className="flex-1">
                <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6 leading-relaxed">
                  {currentQ.question}
                </h2>
              </div>
            </div>

            {/* Options */}
            <div className="grid gap-4">
              {currentQ.options.map((option, index) => {
                let buttonClass = "w-full p-4 text-left rounded-xl border transition-all duration-300 transform hover:scale-[1.02] ";
                
                if (showResult) {
                  if (index === currentQ.correctAnswer) {
                    buttonClass += "bg-green-500/20 border-green-400 text-green-300 animate-pulse-glow";
                  } else if (index === selectedAnswer && index !== currentQ.correctAnswer) {
                    buttonClass += "bg-red-500/20 border-red-400 text-red-300";
                  } else {
                    buttonClass += "bg-white/70 border-yellow-300 text-gray-600";
                  }
                } else {
                  if (selectedAnswer === index) {
                    buttonClass += "bg-orange-500/20 border-orange-400 text-orange-300 animate-pulse-glow";
                  } else {
                    buttonClass += "bg-white/70 border-yellow-300 text-gray-800 hover:bg-orange-50 hover:border-orange-400";
                  }
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={showResult}
                    className={buttonClass}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        selectedAnswer === index ? 'border-orange-400 bg-orange-500' : 'border-gray-500'
                      }`}>
                        {selectedAnswer === index && (
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        )}
                      </div>
                      <span className="font-medium text-gray-800">{option}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Explanation */}
            {showExplanation && (
              <div className="bg-slate-800/95 border border-slate-600 rounded-xl p-4 animate-fade-in backdrop-blur-sm">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-blue-300 font-semibold mb-1">Explanation</h4>
                    <p className="text-gray-100 text-sm leading-relaxed">{currentQ.explanation}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-between items-center pt-4">
              <div className="text-sm text-gray-600">
                Score: <span className="text-orange-600 font-mono font-bold">{score}/{currentQuestion + (showResult ? 1 : 0)}</span>
              </div>
              
              <div className="space-x-4">
                {!showResult ? (
                  <button
                    onClick={handleSubmit}
                    disabled={selectedAnswer === null}
                    className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                      selectedAnswer !== null
                        ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white animate-pulse-glow'
                        : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    Submit Answer
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 animate-pulse-glow"
                  >
                    {currentQuestion < quizQuestions.length - 1 ? 'Next Question →' : 'Finish Quiz 🎉'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;