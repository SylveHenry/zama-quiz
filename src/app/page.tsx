'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FlowingText from '../components/FlowingText';
import { QuizProvider } from '../contexts/QuizContext';
import { CourseProvider, useCourse } from '../contexts/CourseContext';
import { BookOpen, Award, Users, Zap, Shield, Brain, ArrowRight, CheckCircle, Play, Info, Trophy } from 'lucide-react';

const HomeContent: React.FC = () => {
  const { progress } = useCourse();

  const difficultyLevels = [
    {
      id: 'beginner',
      title: 'Beginner',
      description: 'Start your journey into Fully Homomorphic Encryption and confidential computing',
      color: 'from-green-400 via-green-500 to-emerald-600',
      textColor: 'text-green-600',
      borderColor: 'border-green-200',
      hoverColor: 'hover:border-green-300',
      icon: BookOpen,
      topics: ['FHE Basics', 'Zama Introduction', 'Privacy Concepts', 'Getting Started'],
      href: '/beginner'
    },
    {
      id: 'intermediate',
      title: 'Intermediate',
      description: 'Deepen your understanding of FHE operations and FHEVM library features',
      color: 'from-blue-400 via-blue-500 to-indigo-600',
      textColor: 'text-blue-600',
      borderColor: 'border-blue-200',
      hoverColor: 'hover:border-blue-300',
      icon: Zap,
      topics: ['FHEVM Library', 'Encrypted Operations', 'Smart Contracts', 'Advanced Features'],
      href: '/intermediate'
    },
    {
      id: 'advanced',
      title: 'Advanced',
      description: 'Master complex cryptographic protocols and enterprise implementations',
      color: 'from-purple-400 via-purple-500 to-violet-600',
      textColor: 'text-purple-600',
      borderColor: 'border-purple-200',
      hoverColor: 'hover:border-purple-300',
      icon: Brain,
      topics: ['Enterprise Architecture', 'Advanced Cryptography', 'Performance Optimization', 'Production Deployment'],
      href: '/advanced'
    }
  ];

  const getProgressStats = (level: string) => {
    const levelProgress = progress[level as keyof typeof progress];
    return {
      courseCompleted: levelProgress?.completed || false,
      quizTaken: levelProgress?.quizTaken || false,
      quizScore: levelProgress?.quizScore || 0
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex flex-col relative">
      <FlowingText />
      <Navbar />
      <main className="flex-1 relative z-10">
        {/* Hero Section */}
        <section className="relative py-24 px-4">
          <div className="max-w-6xl mx-auto text-center">
            {/* Decorative elements */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute top-20 left-1/4 w-32 h-32 bg-gradient-to-br from-blue-200 to-indigo-300 rounded-full opacity-20 animate-float"></div>
              <div className="absolute top-32 right-1/4 w-24 h-24 bg-gradient-to-br from-indigo-200 to-purple-300 rounded-full opacity-15 animate-float" style={{animationDelay: '1s'}}></div>
              <div className="absolute bottom-20 left-1/3 w-20 h-20 bg-gradient-to-br from-purple-200 to-blue-300 rounded-full opacity-10 animate-float" style={{animationDelay: '2s'}}></div>
            </div>
            
            <div className="mb-8">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full text-blue-800 text-sm font-medium mb-6 border border-blue-200">
                <Shield className="w-4 h-4 mr-2" />
                Privacy-First Learning Platform
              </div>
              <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Zama Protocol
                </span>
                <span className="block text-4xl md:text-5xl text-blue-600 mt-2">Learning Platform</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
                Master Fully Homomorphic Encryption and confidential computing with our comprehensive 
                <span className="font-medium text-blue-700"> interactive courses</span> and 
                <span className="font-medium text-blue-700"> certification program</span>. Learn at your own pace and earn certificates 
                to validate your expertise.
              </p>
            </div>
            
            {/* Key Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="group text-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/50 hover:-translate-y-2">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mx-auto flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Interactive Courses</h3>
                <p className="text-gray-600 leading-relaxed">Comprehensive slideshow courses with hands-on examples and real-world applications designed for immersive learning.</p>
              </div>
              <div className="group text-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/50 hover:-translate-y-2">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mx-auto flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Certification Program</h3>
                <p className="text-gray-600 leading-relaxed">Earn industry-recognized certificates by completing courses and passing quizzes with 80% or higher scores.</p>
              </div>
              <div className="group text-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/50 hover:-translate-y-2">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl mx-auto flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Progressive Learning</h3>
                <p className="text-gray-600 leading-relaxed">Three difficulty levels designed to take you from beginner to expert in FHE technology with structured progression.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Learning Paths */}
        <section className="py-8 px-4 bg-white/50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">Choose Your Learning Path</h2>
            <p className="text-xl text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              Select the difficulty level that matches your current knowledge and start your journey into the world of confidential computing.
            </p>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {difficultyLevels.map((level, index) => {
                const Icon = level.icon;
                const stats = getProgressStats(level.id);
                
                return (
                  <div key={level.id} className={`group relative bg-white rounded-2xl border-2 ${level.borderColor} ${level.hoverColor} transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 overflow-hidden shadow-lg`} style={{animationDelay: `${index * 0.2}s`}}>
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Header with enhanced gradient */}
                    <div className={`bg-gradient-to-br ${level.color} p-6 text-white relative overflow-hidden`}>
                      {/* Decorative background pattern */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
                      
                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-4">
                          <div className="p-3 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30">
                            <Icon className="w-8 h-8" />
                          </div>
                          <div className="flex space-x-2">
                            {stats.courseCompleted && <CheckCircle className="w-6 h-6 text-green-300 drop-shadow-lg" />}
                            {stats.quizTaken && <Award className="w-6 h-6 text-yellow-300 drop-shadow-lg" />}
                          </div>
                        </div>
                        <h3 className="text-2xl font-bold mb-2 drop-shadow-sm">{level.title}</h3>
                        <p className="text-white/90 text-sm leading-relaxed">{level.description}</p>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-6 relative z-10">
                      <h4 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wide">What you&apos;ll learn:</h4>
                      <ul className="space-y-3 mb-6">
                        {level.topics.map((topic, topicIndex) => (
                          <li key={topicIndex} className="flex items-center text-sm text-gray-600 group-hover:text-gray-700 transition-colors">
                            <div className={`w-3 h-3 rounded-full ${level.textColor.replace('text-', 'bg-')} mr-3 shadow-sm`}></div>
                            <span className="font-medium">{topic}</span>
                          </li>
                        ))}
                      </ul>
                      
                      {/* Enhanced Progress */}
                      {(stats.courseCompleted || stats.quizTaken) && (
                        <div className="mb-6 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200 shadow-inner">
                          <div className="text-xs font-semibold text-gray-700 mb-3 uppercase tracking-wide">Your Progress:</div>
                          <div className="grid grid-cols-2 gap-3">
                            <div className="flex items-center space-x-2">
                              <div className={`w-3 h-3 rounded-full ${stats.courseCompleted ? 'bg-green-500' : 'bg-gray-300'} shadow-sm`}></div>
                              <span className={`text-xs font-medium ${stats.courseCompleted ? 'text-green-700' : 'text-gray-500'}`}>
                                Course {stats.courseCompleted ? 'Done' : 'Pending'}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className={`w-3 h-3 rounded-full ${stats.quizTaken ? 'bg-green-500' : 'bg-gray-300'} shadow-sm`}></div>
                              <span className={`text-xs font-medium ${stats.quizTaken ? 'text-green-700' : 'text-gray-500'}`}>
                                Quiz {stats.quizTaken ? `${stats.quizScore}%` : 'Pending'}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <Link href={level.href}>
                        <button className={`w-full px-8 py-4 ${level.textColor} bg-gradient-to-r from-white to-gray-50 border-2 ${level.borderColor} rounded-xl font-semibold hover:from-gray-50 hover:to-gray-100 hover:shadow-lg transition-all duration-300 flex items-center justify-center group shadow-md`}>
                          <Play className="w-4 h-4 mr-2" />
                          Start Learning
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 px-4 bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/20 to-purple-800/20"></div>
            <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-float"></div>
            <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
            <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white/10 rounded-full blur-xl animate-float" style={{animationDelay: '1s'}}></div>
          </div>
          
          <div className="max-w-5xl mx-auto text-center relative z-10">
            <div className="mb-8">
              <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-6 border border-white/30">
                <Trophy className="w-4 h-4 mr-2" />
                Start Your Journey Today
              </div>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Ready to Master{' '}
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Confidential Computing?
              </span>
            </h2>
            
            <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
              Join thousands of developers learning about confidential computing and FHE technology. 
              Start with the beginner course or jump to your preferred difficulty level and begin your 
              <span className="font-medium text-yellow-200"> privacy-preserving journey</span>.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link href="/beginner">
                <button className="group px-10 py-5 bg-gradient-to-r from-white to-gray-100 text-blue-700 rounded-xl font-bold hover:from-yellow-100 hover:to-orange-100 hover:text-blue-800 transition-all duration-300 flex items-center justify-center shadow-2xl hover:shadow-3xl transform hover:-translate-y-1">
                  <Play className="w-5 h-5 mr-3" />
                  Start with Beginner
                  <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <Link href="/how-to-play">
                <button className="px-10 py-5 border-2 border-white/50 text-white rounded-xl font-semibold hover:bg-white/10 hover:border-white/70 backdrop-blur-sm transition-all duration-300 shadow-lg hover:shadow-xl">
                  <Info className="w-5 h-5 mr-2 inline" />
                  How It Works
                </button>
              </Link>
            </div>
            
            {/* Stats section */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">1000+</div>
                <div className="text-blue-200 font-medium">Active Learners</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">95%</div>
                <div className="text-blue-200 font-medium">Completion Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">24/7</div>
                <div className="text-blue-200 font-medium">Learning Access</div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default function Home() {
  return (
    <CourseProvider>
      <QuizProvider>
        <HomeContent />
      </QuizProvider>
    </CourseProvider>
  );
}
