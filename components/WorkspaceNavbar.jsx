'use client';

import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { useState } from 'react';

export default function WorkspaceNavbar() {
  const [projectDropdownOpen, setProjectDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <nav 
      className="border-b border-gray-800 h-14 sticky top-0 z-50"
      style={{
        background: 'linear-gradient(135deg, #2C2C2C 0%, #1A1A1A 100%)'
      }}
    >
      <div className="max-w-full mx-auto px-6">
        <div className="flex justify-between items-center h-14">
          {/* Left Section - Logo and Project */}
          <div className="flex items-center space-x-6">
            {/* LemonPeel Logo */}
            <Link href="/" className="flex items-center space-x-2 text-white">
              <div className="w-7 h-7 bg-[#FAD406] rounded-full flex items-center justify-center">
                <span className="text-black text-sm font-bold">L</span>
              </div>
              <span 
                className="text-xl font-bold"
                style={{
                  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
                }}
              >
                LemonPeel
              </span>
            </Link>

            {/* Project Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setProjectDropdownOpen(!projectDropdownOpen)}
                className="flex items-center space-x-2 text-white hover:text-gray-300 transition-colors px-3 py-1.5 rounded-md hover:bg-gray-800/50"
              >
                <span className="text-sm font-medium">Untitled project</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {projectDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-56 bg-gray-900 border border-gray-700 rounded-lg shadow-xl z-50">
                  <div className="py-2">
                    <button className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-800 transition-colors">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Untitled project</span>
                      </div>
                    </button>
                    <div className="border-t border-gray-700 my-2"></div>
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 transition-colors">
                      <div className="flex items-center space-x-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        <span>New project</span>
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Section - Actions and User */}
          {isAuthenticated && (
            <div className="flex items-center space-x-4">
              {/* Notification Bell */}
              <button className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-gray-800/50">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM15 17H9a6 6 0 01-6-6V5a2 2 0 012-2h8a2 2 0 012 2v6a2 2 0 01-2 2z" />
                </svg>
            </button>

            {/* Add Credits Button */}
            <button 
              className="flex items-center space-x-2 px-4 py-2 bg-[#FAD406] text-black text-sm font-semibold rounded-lg hover:bg-[#e8c005] transition-colors"
              style={{
                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
              }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span>Add Credits</span>
            </button>

            {/* Credits Display */}
            <div className="flex items-center space-x-2 px-3 py-2 bg-gray-800/50 rounded-lg border border-gray-700">
              <div className="w-5 h-5 bg-[#FAD406] rounded-full flex items-center justify-center">
                <span className="text-black text-xs font-bold">25</span>
              </div>
              <span 
                className="text-white text-sm font-medium"
                style={{
                  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
                }}
              >
                25
              </span>
              <span className="text-gray-400 text-xs">credits</span>
            </div>

            {/* User Avatar with Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="w-9 h-9 rounded-full overflow-hidden border-2 border-gray-600 hover:border-gray-500 transition-all"
              >
                <img 
                  src="/api/placeholder/36/36" 
                  alt="User Avatar" 
                  className="w-full h-full object-cover"
                />
              </button>
              
              {userDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-72 bg-gray-900 border border-gray-700 rounded-lg shadow-xl z-50">
                  <div className="p-4 border-b border-gray-700">
                    <div className="flex items-center space-x-3">
                      <img 
                        src="/api/placeholder/40/40" 
                        alt="User Avatar" 
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <div 
                          className="text-white font-semibold"
                          style={{
                            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
                          }}
                        >
                          {user ? `${user.firstname} ${user.lastname}` : 'User'}
                        </div>
                        <div className="text-gray-400 text-sm">{user?.email || 'No email'}</div>
                      </div>
                    </div>
                  </div>
                  <div className="p-2">
                    <button className="w-full flex items-center space-x-3 px-3 py-2.5 text-gray-300 hover:bg-gray-800 rounded-md transition-all">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                        <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3" />
                        <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3" />
                      </svg>
                      <span>View Plan</span>
                    </button>
                    <button 
                      className="w-full flex items-center space-x-3 px-3 py-2.5 text-red-400 hover:bg-gray-800 rounded-md transition-all"
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                      }}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>)}
        </div>
      </div>
    </nav>
  );
}
