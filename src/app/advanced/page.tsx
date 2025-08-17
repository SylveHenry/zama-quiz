'use client';

import React, { useState } from 'react';
import PageWithModal from '../../components/PageWithModal';
import CourseSlideshow from '../../components/CourseSlideshow';
import DifficultyQuiz from '../../components/DifficultyQuiz';
import { QuizProvider } from '../../contexts/QuizContext';
import { CourseProvider, useCourse } from '../../contexts/CourseContext';
import courseContent from '../../data/courseContent.json';
import { BookOpen, Award, CheckCircle } from 'lucide-react';

const AdvancedContent: React.FC = () => {
  const [currentView, setCurrentView] = useState<'overview' | 'course' | 'quiz'>('overview');
  const { completeCourse, isCourseCompleted, isQuizAvailable, progress } = useCourse();

  const advancedCourse = courseContent.advanced;
  const courseCompleted = isCourseCompleted('advanced');
  const quizAvailable = isQuizAvailable('advanced');
  const quizTaken = progress.advanced.quizTaken;

  const handleCourseComplete = () => {
    completeCourse('advanced');
    setCurrentView('overview');
  };

  const handleQuizComplete = () => {
    setTimeout(() => {
      setCurrentView('overview');
    }, 3000);
  };

  const generateCertificate = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (ctx) {
      canvas.width = 800;
      canvas.height = 600;
      
      // Certificate background
      ctx.fillStyle = '#f8f9fa';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Border
      ctx.strokeStyle = '#8b5cf6';
      ctx.lineWidth = 8;
      ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);
      
      // Title
      ctx.fillStyle = '#1f2937';
      ctx.font = 'bold 48px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Certificate of Completion', canvas.width / 2, 120);
      
      // Subtitle
      ctx.font = '24px Arial';
      ctx.fillText('Zama Protocol - Advanced Level', canvas.width / 2, 180);
      
      // Score
      ctx.font = 'bold 32px Arial';
      ctx.fillStyle = '#8b5cf6';
      ctx.fillText(`Score: ${progress.advanced.quizScore}%`, canvas.width / 2, 280);
      
      // Date
      ctx.font = '18px Arial';
      ctx.fillStyle = '#6b7280';
      const date = new Date().toLocaleDateString();
      ctx.fillText(`Completed on ${date}`, canvas.width / 2, 350);
      
      // Download
      const link = document.createElement('a');
      link.download = 'zama-advanced-certificate.png';
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  return (
    <PageWithModal title="Advanced Course">
      {currentView === 'overview' && (
        <div className="space-y-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-violet-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Welcome to Advanced Course</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Master the most complex aspects of Zama Protocol, including advanced cryptographic concepts and enterprise implementations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Course Card */}
            <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-6 border border-purple-200">
              <div className="flex items-center mb-4">
                <BookOpen className="w-8 h-8 text-purple-600 mr-3" />
                {courseCompleted && <CheckCircle className="w-5 h-5 text-green-600" />}
              </div>
              <h3 className="text-xl font-semibold text-purple-800 mb-3">Interactive Course</h3>
              <p className="text-purple-700 mb-4">
                Dive deep into advanced cryptographic protocols, enterprise architecture, and cutting-edge implementations.
              </p>
              <div className="flex items-center justify-between">
                <span className={`text-sm font-medium ${
                  courseCompleted ? 'text-green-600' : 'text-gray-500'
                }`}>
                  {courseCompleted ? 'Completed ✓' : 'Not started'}
                </span>
                <button
                  onClick={() => setCurrentView('course')}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
                >
                  {courseCompleted ? 'Review' : 'Start Course'}
                </button>
              </div>
            </div>

            {/* Quiz Card */}
            <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-6 border border-red-200">
              <div className="flex items-center mb-4">
                <Award className="w-8 h-8 text-red-600 mr-3" />
                {quizTaken && <CheckCircle className="w-5 h-5 text-green-600" />}
              </div>
              <h3 className="text-xl font-semibold text-red-800 mb-3">Expert Quiz</h3>
              <p className="text-red-700 mb-4">
                Challenge yourself with 20 advanced questions and earn a certificate with 80% or higher.
              </p>
              <div className="flex items-center justify-between">
                <span className={`text-sm font-medium ${
                  quizTaken ? 'text-green-600' : 
                  quizAvailable ? 'text-red-600' : 'text-gray-500'
                }`}>
                  {quizTaken ? `Completed ✓ (${progress.advanced.quizScore}%)` : 
                   quizAvailable ? 'Available' : 'Complete course first'}
                </span>
                <button
                  onClick={() => setCurrentView('quiz')}
                  disabled={!quizAvailable}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    quizAvailable 
                      ? 'bg-red-600 text-white hover:bg-red-700' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {!quizAvailable ? 'Complete Course First' : quizTaken ? 'Retake Quiz' : 'Take Quiz'}
                </button>
              </div>
            </div>
          </div>

          {/* Certificate Section */}
           {quizTaken && progress.advanced.quizScore && progress.advanced.quizScore >= 80 && (
            <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl p-6 border border-yellow-200 text-center">
              <Award className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-yellow-800 mb-2">Congratulations!</h3>
              <p className="text-yellow-700 mb-4">
                You&apos;ve successfully completed the Advanced course with a score of {progress.advanced.quizScore}%.
              </p>
              <button
                onClick={generateCertificate}
                className="px-6 py-3 bg-yellow-600 text-white rounded-lg font-semibold hover:bg-yellow-700 transition-colors"
              >
                Download Certificate
              </button>
            </div>
          )}
        </div>
      )}

      {currentView === 'course' && (
        <div className="bg-white rounded-xl overflow-hidden">
          <CourseSlideshow
             course={advancedCourse}
             onCourseComplete={handleCourseComplete}
             difficulty="advanced"
           />
        </div>
      )}

      {currentView === 'quiz' && (
        <div className="bg-white rounded-xl p-8">
          <DifficultyQuiz
             difficulty="advanced"
             onQuizComplete={handleQuizComplete}
           />
        </div>
      )}
    </PageWithModal>
  );
};

const Advanced: React.FC = () => {
  return (
    <CourseProvider>
      <QuizProvider>
        <AdvancedContent />
      </QuizProvider>
    </CourseProvider>
  );
};

export default Advanced;