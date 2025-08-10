'use client';

import React from 'react';
import Image from 'next/image';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full bg-gradient-to-r from-yellow-400 to-yellow-300 border-t border-yellow-500/30 mt-auto shadow-lg relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:justify-between gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Image src="/logo.png" alt="Zama Logo" width={32} height={32} className="object-contain" />
              <span className="text-lg font-semibold text-gray-800">
                Zama Privacy Quiz
              </span>
            </div>
            <p className="text-sm text-gray-600 max-w-xs">
              Test your Zama privacy knowledge with our interactive quiz powered by advanced encryption technology.
            </p>
            <div className="flex items-center space-x-2 text-xs text-gray-700">
              <div className="w-2 h-2 bg-orange-600 rounded-full animate-pulse"></div>
              <a href="https://codedbro.xyz" target="_blank" rel="noopener noreferrer" className="hover:text-orange-600 transition-colors">Developed by CodedBro</a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4 md:ml-auto">
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Quick Links</h3>
            <div className="space-y-2">
              <a href="https://www.zama.ai/" target="_blank" rel="noopener noreferrer" className="block text-sm text-gray-600 hover:text-orange-600 transition-colors font-medium">
                Official page
              </a>
              <a href="/how-to-play" className="block text-sm text-gray-600 hover:text-orange-600 transition-colors font-medium">
                How to play
              </a>
              <a href="https://www.zama.ai/introduction-to-homomorphic-encryption" target="_blank" rel="noopener noreferrer" className="block text-sm text-gray-600 hover:text-orange-600 transition-colors font-medium">
                6-minute intro to FHE
              </a>
              <a href="https://docs.zama.ai/protocol/zama-protocol-litepaper" target="_blank" rel="noopener noreferrer" className="block text-sm text-gray-600 hover:text-orange-600 transition-colors font-medium">
                Litepaper
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-6 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6">
              <p className="text-xs text-gray-600">
                © {currentYear} Zama Privacy Quiz. Powered by Zama Protocol.
              </p>
              <div className="flex items-center space-x-2">
                <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-gray-600">Blockchain Secured</span>
              </div>
            </div>
            
            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <a href="https://x.com/Zeusfi_bit" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-orange-600 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="https://x.com/zama_fhe" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-orange-600 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;