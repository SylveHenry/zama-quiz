'use client';

import React, { useState } from 'react';
import Header from './Navbar';
import Footer from './Footer';
import FlowingText from './FlowingText';
import ModalOverlay from './ModalOverlay';
import { ArrowLeft } from 'lucide-react';

interface PageWithModalProps {
  title: string;
  children: React.ReactNode;
  showBackButton?: boolean;
  backHref?: string;
}

const PageWithModal: React.FC<PageWithModalProps> = ({
  title,
  children,
  showBackButton = true,
  backHref = '/'
}) => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      {/* Flowing Background Text */}
      <FlowingText />
      
      {/* Header */}
      <Header />
      
      {/* Main Content Area */}
      <main className="relative z-10 pt-16">
        {/* Modal Overlay */}
        <ModalOverlay
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={title}
        >
          <div className="p-6">
            {showBackButton && (
              <div className="mb-6">
                <a 
                  href={backHref}
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </a>
              </div>
            )}
            {children}
          </div>
        </ModalOverlay>
        
        {/* Content when modal is closed */}
        {!isModalOpen && (
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center p-8 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{title}</h2>
              <p className="text-gray-600 mb-6">Content is displayed in modal overlay</p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Open {title}
              </button>
            </div>
          </div>
        )}
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PageWithModal;