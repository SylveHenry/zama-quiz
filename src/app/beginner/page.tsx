'use client';

import React, { useState } from 'react';
import PageWithModal from '../../components/PageWithModal';
import CourseSlideshow from '../../components/CourseSlideshow';
import DifficultyQuiz from '../../components/DifficultyQuiz';
import { QuizProvider } from '../../contexts/QuizContext';
import { CourseProvider, useCourse } from '../../contexts/CourseContext';
import courseContent from '../../data/courseContent.json';
import { BookOpen, Award } from 'lucide-react';

const BeginnerContent: React.FC = () => {
  const [currentView, setCurrentView] = useState<'overview' | 'course' | 'quiz'>('overview');
  const { completeCourse, isCourseCompleted, isQuizAvailable, progress } = useCourse();

  const beginnerCourse = courseContent.beginner;
  const courseCompleted = isCourseCompleted('beginner');
  const quizAvailable = isQuizAvailable('beginner');
  const quizTaken = progress.beginner.quizTaken;

  const handleCourseComplete = () => {
    completeCourse('beginner');
    setCurrentView('overview');
  };

  const handleQuizComplete = () => {
    setTimeout(() => {
      setCurrentView('overview');
    }, 3000);
  };

  const generateCertificate = () => {
    // This would integrate with the existing certificate generation logic
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (ctx) {
      canvas.width = 800;
      canvas.height = 600;
      
      // Certificate background
      ctx.fillStyle = '#f8f9fa';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Border
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 8;
      ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);
      
      // Title
      ctx.fillStyle = '#1f2937';
      ctx.font = 'bold 48px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Certificate of Completion', canvas.width / 2, 120);
      
      // Subtitle
      ctx.font = '24px Arial';
      ctx.fillText('Zama Protocol - Beginner Level', canvas.width / 2, 180);
      
      // Score
      ctx.font = 'bold 32px Arial';
      ctx.fillStyle = '#10b981';
      ctx.fillText(`Score: ${progress.beginner.quizScore}%`, canvas.width / 2, 280);
      
      // Date
      ctx.font = '18px Arial';
      ctx.fillStyle = '#6b7280';
      const date = new Date().toLocaleDateString();
      ctx.fillText(`Completed on ${date}`, canvas.width / 2, 350);
      
      // Download
      const link = document.createElement('a');
      link.download = 'zama-beginner-certificate.png';
      link.href = canvas.toDataURL();
      link.click();
    }
  };



  return (
    <PageWithModal title="Beginner Course">
      {currentView === 'overview' && (
        <div className="space-y-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Welcome to Beginner Course</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Start your journey into Fully Homomorphic Encryption and confidential computing. 
              Learn the fundamentals of privacy-preserving computation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
              <h3 className="text-xl font-semibold text-green-800 mb-4 flex items-center">
                <BookOpen className="w-5 h-5 mr-2" />
                Course Content
              </h3>
              <p className="text-green-700 mb-4">
                Interactive slides covering FHE basics, Zama introduction, and privacy concepts.
              </p>
              <div className="flex items-center justify-between">
                <span className={`text-sm font-medium ${
                  courseCompleted ? 'text-green-600' : 'text-gray-500'
                }`}>
                  {courseCompleted ? 'Completed ✓' : 'Not started'}
                </span>
                <button
                  onClick={() => setCurrentView('course')}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
                >
                  {courseCompleted ? 'Review' : 'Start Course'}
                </button>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
              <h3 className="text-xl font-semibold text-blue-800 mb-4 flex items-center">
                <Award className="w-5 h-5 mr-2" />
                Knowledge Quiz
              </h3>
              <p className="text-blue-700 mb-4">
                Test your understanding with 20 questions. Score 80% or higher to earn your certificate.
              </p>
              <div className="flex items-center justify-between">
                <span className={`text-sm font-medium ${
                  quizTaken ? 'text-green-600' : 
                  quizAvailable ? 'text-blue-600' : 'text-gray-500'
                }`}>
                  {quizTaken ? `Completed ✓ (${progress.beginner.quizScore}%)` : 
                   quizAvailable ? 'Available' : 'Complete course first'}
                </span>
                <button
                  onClick={() => setCurrentView('quiz')}
                  disabled={!quizAvailable}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    quizAvailable 
                      ? 'bg-blue-600 text-white hover:bg-blue-700' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {quizTaken ? 'Retake Quiz' : 'Take Quiz'}
                </button>
              </div>
            </div>
          </div>

          {/* Certificate Section */}
          {quizTaken && progress.beginner.quizScore && progress.beginner.quizScore >= 80 && (
            <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl p-6 border border-yellow-200 text-center">
              <Award className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-yellow-800 mb-2">Congratulations!</h3>
              <p className="text-yellow-700 mb-4">
                You&apos;ve successfully completed the Beginner course with a score of {progress.beginner.quizScore}%.
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
            course={beginnerCourse}
            onCourseComplete={handleCourseComplete}
            difficulty="beginner"
          />
        </div>
      )}

      {currentView === 'quiz' && (
        <div className="bg-white rounded-xl p-8">
          <DifficultyQuiz 
            difficulty="beginner"
            onQuizComplete={handleQuizComplete}
          />
        </div>
      )}
    </PageWithModal>
  );
};

const Beginner: React.FC = () => {
  return (
    <CourseProvider>
      <QuizProvider>
        <BeginnerContent />
      </QuizProvider>
    </CourseProvider>
  );
};

export default Beginner;