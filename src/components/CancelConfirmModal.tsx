'use client';

import React from 'react';
import { X, Home, ArrowLeft } from 'lucide-react';

interface CancelConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmCancel: () => void;
  onGoHome: () => void;
  onGoToDifficulty: () => void;
  type: 'quiz' | 'course';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

const CancelConfirmModal: React.FC<CancelConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirmCancel,
  onGoHome,
  onGoToDifficulty,
  type,
  difficulty
}) => {
  if (!isOpen) return null;

  const getDifficultyColor = () => {
    switch (difficulty) {
      case 'beginner': return 'from-green-500 to-emerald-600';
      case 'intermediate': return 'from-blue-500 to-indigo-600';
      case 'advanced': return 'from-purple-500 to-violet-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-auto overflow-hidden border border-gray-200">
        {/* Header */}
        <div className={`bg-gradient-to-r ${getDifficultyColor()} p-6 text-white relative`}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
          <h2 className="text-xl font-bold mb-2">
            Cancel {type === 'quiz' ? 'Quiz' : 'Course'}?
          </h2>
          <p className="text-white/90 text-sm">
            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Level
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-700 mb-6 leading-relaxed">
            Are you sure you want to cancel your current {type}? 
            {type === 'quiz' ? ' Your progress will be lost and you\'ll need to start over.' : ' You can resume from where you left off later.'}
          </p>

          {/* Action Buttons */}
          <div className="space-y-3">
            {/* Continue Button */}
            <button
              onClick={onClose}
              className={`w-full py-3 px-4 bg-gradient-to-r ${getDifficultyColor()} text-white rounded-lg font-semibold hover:opacity-90 transition-opacity shadow-md`}
            >
              Continue {type === 'quiz' ? 'Quiz' : 'Course'}
            </button>

            {/* Navigation Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={onGoToDifficulty}
                className="flex items-center justify-center gap-2 py-3 px-4 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Difficulty
              </button>
              <button
                onClick={onGoHome}
                className="flex items-center justify-center gap-2 py-3 px-4 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                <Home className="w-4 h-4" />
                Home
              </button>
            </div>

            {/* Cancel Button */}
            <button
              onClick={onConfirmCancel}
              className="w-full py-2 px-4 text-red-600 hover:text-red-700 transition-colors text-sm font-medium"
            >
              Yes, Cancel {type === 'quiz' ? 'Quiz' : 'Course'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancelConfirmModal;