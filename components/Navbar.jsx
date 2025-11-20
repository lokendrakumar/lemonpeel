'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [projectDropdownOpen, setProjectDropdownOpen] = useState(false);

  return (
    <nav className="bg-black border-b border-gray-800 h-14">
      <div className="max-w-full mx-auto px-4">
        <div className="flex justify-between items-center h-14">
          {/* Left Section - Logo and Project */}
          <div className="flex items-center space-x-6">
            {/* LemonPeel Logo */}
            <Link href="/" className="flex items-center space-x-2 text-white">
              <div className="w-6 h-6 bg-[#FAD406] rounded-full flex items-center justify-center">
                <span className="text-black text-xs font-bold">L</span>
              </div>
              <span className="text-lg font-semibold">LemonPeel</span>
            </Link>

            {/* Project Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setProjectDropdownOpen(!projectDropdownOpen)}
                className="flex items-center space-x-2 text-white hover:text-gray-300 transition-colors"
              >
                <span className="text-sm">Untitled project</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {projectDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-gray-900 border border-gray-700 rounded-md shadow-lg z-50">
                  <div className="py-1">
                    <button className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-800">
                      Untitled project
                    </button>
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-800">
                      New project
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Center Section - Navigation Icons */}
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-400 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </button>
            <button className="p-2 text-gray-400 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            </button>
            <button className="p-2 text-gray-400 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
              </svg>
            </button>
            <button className="p-2 text-gray-400 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 10h-10a8 8 0 00-8 8v2M21 10l-6 6m6-6l-6-6" />
              </svg>
            </button>
          </div>

          {/* Right Section - Actions and User */}
          <div className="flex items-center space-x-3">
            {/* Add User Button */}
            <button className="flex items-center space-x-2 px-3 py-1.5 text-sm text-[#FAD406] hover:bg-gray-900 rounded-md transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span>Add User</span>
            </button>

            {/* Export Button */}
            <button className="flex items-center space-x-2 px-4 py-1.5 bg-[#FAD406] text-black text-sm font-medium rounded-md hover:bg-[#e8c005] transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Export</span>
            </button>

            {/* Help Icon */}
            <button className="p-2 text-gray-400 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>

            {/* Share Icon */}
            <button className="p-2 text-gray-400 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
            </button>

            {/* User Avatar */}
            <div className="w-8 h-8 bg-[#FAD406] rounded-full flex items-center justify-center">
              <span className="text-black text-sm font-semibold">G</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
