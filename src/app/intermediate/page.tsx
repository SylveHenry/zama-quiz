'use client';

import React, { useState } from 'react';
import PageWithModal from '../../components/PageWithModal';
import CourseSlideshow from '../../components/CourseSlideshow';
import DifficultyQuiz from '../../components/DifficultyQuiz';
import { QuizProvider } from '../../contexts/QuizContext';
import { CourseProvider, useCourse } from '../../contexts/CourseContext';
import courseContent from '../../data/courseContent.json';
import { BookOpen, Award } from 'lucide-react';
import { generateCertificate, downloadCertificate, CertificateData } from '../../utils/certificateGenerator';

const IntermediateContent: React.FC = () => {
  const [currentView, setCurrentView] = useState<'overview' | 'course' | 'quiz'>('overview');
  const { completeCourse, isCourseCompleted, isQuizAvailable, progress } = useCourse();

  const intermediateCourse = courseContent.intermediate;
  const courseCompleted = isCourseCompleted('intermediate');
  const quizAvailable = isQuizAvailable('intermediate');
  const quizTaken = progress.intermediate.quizTaken;

  const handleCourseComplete = () => {
    completeCourse('intermediate');
    setCurrentView('overview');
  };

  const handleQuizComplete = () => {
    setTimeout(() => {
      setCurrentView('overview');
    }, 3000);
  };

  const handleGenerateCertificate = async () => {
    if (progress.intermediate.quizScore) {
      const certificateData: CertificateData = {
        score: Math.round((progress.intermediate.quizScore / 100) * 20), // Convert percentage to score out of 20
        totalQuestions: 20,
        percentage: progress.intermediate.quizScore,
        completionDate: new Date().toLocaleDateString(),
        difficulty: 'intermediate'
      };
      
      const dataUrl = await generateCertificate(certificateData);
      downloadCertificate(dataUrl, 'zama-intermediate-certificate.png');
    }
  };

  return (
    <PageWithModal title="Intermediate Course">
      {currentView === 'overview' && (
        <div className="space-y-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Welcome to Intermediate Course</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Deepen your understanding of FHE operations, FHEVM library, and advanced Zama Protocol concepts.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
              <h3 className="text-xl font-semibold text-blue-800 mb-4 flex items-center">
                <BookOpen className="w-5 h-5 mr-2" />
                Course Content
              </h3>
              <p className="text-blue-700 mb-4">
                Explore advanced FHE operations, encrypted data types, and FHEVM library features.
              </p>
              <div className="flex items-center justify-between">
                <span className={`text-sm font-medium ${
                  courseCompleted ? 'text-green-600' : 'text-gray-500'
                }`}>
                  {courseCompleted ? 'Completed ✓' : 'Not started'}
                </span>
                <button
                  onClick={() => setCurrentView('course')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  {courseCompleted ? 'Review' : 'Start Course'}
                </button>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-6 border border-purple-200">
              <h3 className="text-xl font-semibold text-purple-800 mb-4 flex items-center">
                <Award className="w-5 h-5 mr-2" />
                Knowledge Quiz
              </h3>
              <p className="text-purple-700 mb-4">
                Test your intermediate knowledge with 20 questions and earn a certificate with 80% or higher.
              </p>
              <div className="flex items-center justify-between">
                <span className={`text-sm font-medium ${
                  quizTaken ? 'text-green-600' : 
                  quizAvailable ? 'text-purple-600' : 'text-gray-500'
                }`}>
                  {quizTaken ? `Completed ✓ (${progress.intermediate.quizScore}%)` : 
                   quizAvailable ? 'Available' : 'Complete course first'}
                </span>
                <button
                  onClick={() => setCurrentView('quiz')}
                  disabled={!quizAvailable}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    quizAvailable 
                      ? 'bg-purple-600 text-white hover:bg-purple-700' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {quizTaken ? 'Retake Quiz' : 'Take Quiz'}
                </button>
              </div>
            </div>
          </div>

         {/* Certificate Section */}
          {quizTaken && progress.intermediate.quizScore && progress.intermediate.quizScore >= 80 && (
            <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl p-6 border border-yellow-200 text-center">
              <Award className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-yellow-800 mb-2">Congratulations!</h3>
              <p className="text-yellow-700 mb-4">
                You&apos;ve successfully completed the Intermediate course with a score of {progress.intermediate.quizScore}%.
              </p>
              <button
                onClick={handleGenerateCertificate}
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
            course={intermediateCourse}
            onCourseComplete={handleCourseComplete}
            difficulty="intermediate"
          />
        </div>
      )}

      {currentView === 'quiz' && (
        <div className="bg-white rounded-xl p-8">
          <DifficultyQuiz
            difficulty="intermediate"
            onQuizComplete={handleQuizComplete}
          />
        </div>
      )}
    </PageWithModal>
  );
};

const Intermediate: React.FC = () => {
  return (
    <CourseProvider>
      <QuizProvider>
        <IntermediateContent />
      </QuizProvider>
    </CourseProvider>
  );
};

export default Intermediate;