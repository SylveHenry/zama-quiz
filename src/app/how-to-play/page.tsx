'use client';

import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import FlowingText from '../../components/FlowingText';
import { QuizProvider } from '../../contexts/QuizContext';

const HowToPlay: React.FC = () => {
  return (
    <QuizProvider>
      <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-600 flex flex-col relative">
        <FlowingText />
        <Header />
        <main className="flex-1 p-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 mt-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                How to Play the Privacy Quiz
              </h1>
              
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-xl border border-orange-200">
                  <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                    <span className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">1</span>
                    Getting Started
                  </h2>
                  <p className="text-gray-700">
                    Click the "Begin Quiz" button to start your privacy and cryptography knowledge test. The quiz consists of 20 carefully curated questions about privacy, encryption, and the Zama Protocol.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
                  <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                    <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">2</span>
                    Answering Questions
                  </h2>
                  <ul className="text-gray-700 space-y-2">
                    <li>• Each question has multiple choice answers</li>
                    <li>• You have 30 seconds to answer each question</li>
                    <li>• Select your answer by clicking on one of the options</li>
                    <li>• Click "Submit Answer" to confirm your choice</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
                  <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                    <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">3</span>
                    Learning & Feedback
                  </h2>
                  <p className="text-gray-700">
                    After each answer, you'll see if you were correct and get a detailed explanation. This helps you learn about privacy technologies and cryptographic concepts as you play.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
                  <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                    <span className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">4</span>
                    Scoring & Results
                  </h2>
                  <ul className="text-gray-700 space-y-2">
                    <li>• Your score is tracked in real-time in the navbar</li>
                    <li>• Each correct answer adds 1 point to your score</li>
                    <li>• At the end, you'll see your final score and percentage</li>
                    <li>• You can restart the quiz anytime to improve your score</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-xl border border-yellow-200">
                  <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                    <span className="bg-yellow-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">💡</span>
                    Tips for Success
                  </h2>
                  <ul className="text-gray-700 space-y-2">
                    <li>• Read each question carefully</li>
                    <li>• Don't rush - you have 30 seconds per question</li>
                    <li>• Pay attention to the explanations to learn more</li>
                    <li>• The quiz covers privacy, encryption, and Zama Protocol topics</li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 text-center">
                <a 
                  href="/" 
                  className="inline-block bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105"
                >
                  Start Playing Now!
                </a>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </QuizProvider>
  );
};

export default HowToPlay;