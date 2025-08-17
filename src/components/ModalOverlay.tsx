'use client';

import React from 'react';
import { X } from 'lucide-react';

interface ModalOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  maxWidth?: string;
}

const ModalOverlay: React.FC<ModalOverlayProps> = ({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = 'max-w-6xl'
}) => {
  if (!isOpen) return null;

  return (
    <div className="relative z-50 p-4 min-h-screen">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-indigo-200/30 to-pink-200/30 rounded-full blur-xl"></div>
        <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-gradient-to-br from-emerald-200/30 to-blue-200/30 rounded-full blur-xl"></div>
      </div>
      
      {/* Modal Content */}
      <div className={`relative ${maxWidth} w-full mx-auto bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden mt-4 mb-8 border border-white/50`}>
        {/* Header */}
        <div className="relative flex items-center justify-between p-6 border-b border-gray-200/50 bg-gradient-to-r from-blue-50/80 via-purple-50/80 to-indigo-50/80 backdrop-blur-sm">
          {/* Decorative header elements */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-indigo-500/5"></div>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500"></div>
          
          <h2 className="relative text-2xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">{title}</h2>
          <button
            onClick={onClose}
            className="relative p-2 hover:bg-white/70 rounded-full transition-all duration-200 hover:shadow-md group"
            aria-label="Close modal"
          >
            <X className="w-6 h-6 text-gray-600 group-hover:text-gray-800 transition-colors" />
          </button>
        </div>
        
        {/* Content */}
        <div className="relative overflow-y-auto bg-gradient-to-br from-white/90 via-blue-50/30 to-purple-50/30">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ModalOverlay;