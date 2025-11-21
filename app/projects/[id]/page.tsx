"use client";

import { notFound } from 'next/navigation';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';

// Mock project data (updated for AI video projects)
const mockProjects = [
  {
    id: 1,
    name: '3 INVESTING IDEAS 2021',
    type: 'Finance Video',
    status: 'Published',
    duration: '5:42',
    views: 12500,
    likes: 456,
    color: '#2ECC71',
    thumbnail: 'from-green-400 to-green-600',
    description: 'Comprehensive analysis of the top 3 investment opportunities for 2021, featuring detailed market research and expert predictions.',
    tags: ['Finance', 'Investment', 'Market Analysis', '2021'],
    createdAt: '2024-10-01',
    updatedAt: '10 min ago',
    script: {
      scenes: [
        { id: 1, title: 'Introduction', duration: '0:30', status: 'completed' },
        { id: 2, title: 'Investment Idea #1: Tech Stocks', duration: '1:45', status: 'completed' },
        { id: 3, title: 'Investment Idea #2: Green Energy', duration: '1:30', status: 'completed' },
        { id: 4, title: 'Investment Idea #3: Real Estate', duration: '1:20', status: 'completed' },
        { id: 5, title: 'Conclusion & Call to Action', duration: '0:37', status: 'completed' }
      ]
    },
    analytics: {
      watchTime: '4:21',
      engagement: 85,
      clickThrough: 12.5,
      shares: 89
    },
    export: {
      lastExport: '2024-10-28',
      formats: ['MP4', 'MOV', 'AVI'],
      quality: '4K'
    }
  },
  {
    id: 2,
    name: 'PROFITABLE TRADING STRATEGY',
    type: 'Finance Video',
    status: 'In Progress',
    duration: '8:15',
    views: 0,
    likes: 0,
    color: '#E74C3C',
    thumbnail: 'from-red-500 to-red-700',
    description: 'Advanced trading strategies for maximizing profits in volatile markets with risk management techniques.',
    tags: ['Trading', 'Strategy', 'Risk Management', 'Profit'],
    createdAt: '2024-10-15',
    updatedAt: '2 hours ago',
    script: {
      scenes: [
        { id: 1, title: 'Market Analysis', duration: '1:20', status: 'completed' },
        { id: 2, title: 'Strategy Overview', duration: '2:10', status: 'completed' },
        { id: 3, title: 'Risk Management', duration: '2:30', status: 'in-progress' },
        { id: 4, title: 'Implementation Guide', duration: '1:45', status: 'pending' },
        { id: 5, title: 'Results & Examples', duration: '0:30', status: 'pending' }
      ]
    },
    analytics: {
      watchTime: '0:00',
      engagement: 0,
      clickThrough: 0,
      shares: 0
    },
    export: {
      lastExport: null,
      formats: [],
      quality: null
    }
  }
];

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const project = mockProjects.find(p => p.id === parseInt("1"));
  const [activeTab, setActiveTab] = useState('Overview');
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  // if (!project) {
  //   notFound();
  // }

  return (
    <div 
      className="min-h-screen"
      style={{
        background: 'linear-gradient(135deg, #0A0D0F 0%, #181C1F 100%)'
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-800">
        <div className="flex items-center space-x-3">
          <div 
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{
              background: 'linear-gradient(45deg, #FAD406 0%, #2ECC71 100%)'
            }}
          >
            <span 
              style={{
                fontFamily: 'Inter',
                fontWeight: '700',
                fontSize: '14px',
                color: '#000000'
              }}
            >
              L
            </span>
          </div>
          <span 
            className="text-white text-xl font-bold"
            style={{
              fontFamily: 'Inter'
            }}
          >
            LemonPeel
          </span>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-lg hover:bg-gray-800 transition-all">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400">
              <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
          </button>
          
          <button 
            className="flex items-center space-x-2 px-4 py-2 bg-[#FAD406] text-black rounded-lg font-medium hover:bg-[#e8c406] transition-all text-sm"
            style={{
              fontFamily: 'Inter'
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Add Credits</span>
          </button>

          <div className="flex items-center space-x-2 px-3 py-2 bg-gray-800 rounded-lg">
            <div className="w-5 h-5 bg-[#FAD406] rounded-full flex items-center justify-center">
              <span className="text-black text-xs font-bold">25</span>
            </div>
            <span className="text-white text-sm font-medium">25</span>
          </div>

          <div className="relative">
            <button 
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-600 hover:border-gray-500 transition-all"
            >
              <img 
                src="/api/placeholder/40/40" 
                alt="User Avatar" 
                className="w-full h-full object-cover"
              />
            </button>
            
            {userDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 w-64 bg-gray-900 border border-gray-700 rounded-lg shadow-xl z-50">
                <div className="p-4 border-b border-gray-700">
                  <div className="flex items-center space-x-3">
                    <img 
                      src="/api/placeholder/40/40" 
                      alt="User Avatar" 
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <div className="text-white font-medium">Harmeet Cour</div>
                      <div className="text-gray-400 text-sm">harmeet002@gmail.com</div>
                    </div>
                  </div>
                </div>
                <div className="p-2">
                  <button className="w-full flex items-center space-x-3 px-3 py-2 text-gray-300 hover:bg-gray-800 rounded-md transition-all">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 12l2 2 4-4" />
                      <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3" />
                      <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3" />
                    </svg>
                    <span>View Plan</span>
                  </button>
                  <Link href="/login">
                    <button className="w-full flex items-center space-x-3 px-3 py-2 text-red-400 hover:bg-gray-800 rounded-md transition-all">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <polyline points="16,17 21,12 16,7" />
                        <line x1="21" y1="12" x2="9" y2="12" />
                      </svg>
                      <span>Logout</span>
                    </button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-gray-900/50 p-6 border-r border-gray-800">
          <Link href="/projects">
            <button className="flex items-center space-x-2 text-gray-400 hover:text-white transition-all mb-8">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5m7-7l-7 7 7 7"/>
              </svg>
              <span style={{ fontFamily: 'Inter', fontSize: '14px' }}>Back to Projects</span>
            </button>
          </Link>

          {/* Project Actions */}
          <div className="space-y-4 mb-8">
            <button 
              className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-[#FAD406] text-black rounded-lg font-medium hover:bg-[#e8c406] transition-all"
              style={{ fontFamily: 'Inter' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="23 7 16 12 23 17 23 7"></polygon>
                <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
              </svg>
              <span>Preview Video</span>
            </button>

            <button 
              className="w-full flex items-center justify-center space-x-2 py-2 px-4 border border-gray-600 text-white rounded-lg hover:border-gray-500 transition-all"
              style={{ fontFamily: 'Inter' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Export Video</span>
            </button>
          </div>

          {/* Navigation Menu */}
          <div className="space-y-2">
            {['Overview', 'Script', 'Analytics', 'Settings'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`w-full text-left px-3 py-2 rounded-lg transition-all ${
                  activeTab === tab
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                }`}
                style={{ fontFamily: 'Inter', fontSize: '14px' }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {/* Project Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 
                  className="text-white text-3xl font-bold mb-2"
                  style={{ fontFamily: 'Inter' }}
                >
                  {project.name}
                </h1>
                <div className="flex items-center space-x-4">
                  <div 
                    className="px-3 py-1 rounded-full text-xs font-medium"
                    style={{
                      background: `${project.color}20`,
                      color: project.color
                    }}
                  >
                    {project.status}
                  </div>
                  <span className="text-gray-400 text-sm">
                    {project.type} • Duration: {project.duration}
                  </span>
                  <span className="text-gray-400 text-sm">
                    Updated {project.updatedAt}
                  </span>
                </div>
              </div>
            </div>

            {/* Video Preview */}
            <div className="mb-8">
              <div className={`relative h-64 rounded-xl bg-gradient-to-br ${project.thumbnail} flex items-center justify-center overflow-hidden`}>
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative z-10 text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 mx-auto backdrop-blur-sm">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white ml-1">
                      <polygon points="5 3 19 12 5 21 5 3"></polygon>
                    </svg>
                  </div>
                  <h2 className="text-white text-2xl font-bold mb-2">{project.name}</h2>
                  <p className="text-white/80">Click to preview video</p>
                </div>
              </div>
            </div>
          </div>

          {/* Content based on active tab */}
          {activeTab === 'Overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Project Details */}
              <div className="lg:col-span-2 space-y-6">
                {/* Project Overview */}
                <div 
                  className="p-6 rounded-lg border border-gray-700"
                  style={{ background: 'rgba(24, 28, 31, 0.5)' }}
                >
                  <h3 
                    className="text-white text-xl font-semibold mb-4"
                    style={{ fontFamily: 'Inter' }}
                  >
                    Project Description
                  </h3>
                  <p 
                    className="text-gray-300 leading-relaxed mb-6"
                    style={{ fontFamily: 'Inter' }}
                  >
                    {project.description}
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-full"
                        style={{ fontFamily: 'Inter' }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Script Scenes */}
                <div 
                  className="p-6 rounded-lg border border-gray-700"
                  style={{ background: 'rgba(24, 28, 31, 0.5)' }}
                >
                  <h3 
                    className="text-white text-xl font-semibold mb-6"
                    style={{ fontFamily: 'Inter' }}
                  >
                    Video Scenes
                  </h3>
                  
                  <div className="space-y-4">
                    {project.script.scenes.map((scene) => (
                      <div key={scene.id} className="flex items-center space-x-4 p-4 bg-gray-800/50 rounded-lg">
                        <div 
                          className={`w-4 h-4 rounded-full flex items-center justify-center ${
                            scene.status === 'completed' 
                              ? 'bg-[#2ECC71]' 
                              : scene.status === 'in-progress'
                              ? 'bg-[#FAD406]'
                              : 'border-2 border-gray-600'
                          }`}
                        >
                          {scene.status === 'completed' && (
                            <span className="text-white text-xs">✓</span>
                          )}
                        </div>
                        <div className="flex-1">
                          <div 
                            className="text-white font-medium mb-1"
                            style={{ fontFamily: 'Inter' }}
                          >
                            {scene.title}
                          </div>
                          <div className="flex items-center space-x-4">
                            <span className="text-gray-400 text-sm">Duration: {scene.duration}</span>
                            <span className={`text-sm px-2 py-1 rounded-full ${
                              scene.status === 'completed' 
                                ? 'bg-green-900/50 text-green-300'
                                : scene.status === 'in-progress'
                                ? 'bg-yellow-900/50 text-yellow-300'
                                : 'bg-gray-700 text-gray-400'
                            }`}>
                              {scene.status === 'completed' ? 'Completed' : 
                               scene.status === 'in-progress' ? 'In Progress' : 'Pending'}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - Stats & Analytics */}
              <div className="space-y-6">
                {/* Video Stats */}
                <div 
                  className="p-6 rounded-lg border border-gray-700"
                  style={{ background: 'rgba(24, 28, 31, 0.5)' }}
                >
                  <h3 
                    className="text-white text-lg font-semibold mb-4"
                    style={{ fontFamily: 'Inter' }}
                  >
                    Video Stats
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Views</span>
                      <span className="text-white font-semibold">{project.views.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Likes</span>
                      <span className="text-white font-semibold">{project.likes}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Duration</span>
                      <span className="text-white font-semibold">{project.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Status</span>
                      <span 
                        className="font-semibold"
                        style={{ color: project.color }}
                      >
                        {project.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Analytics Preview */}
                <div 
                  className="p-6 rounded-lg border border-gray-700"
                  style={{ background: 'rgba(24, 28, 31, 0.5)' }}
                >
                  <h3 
                    className="text-white text-lg font-semibold mb-4"
                    style={{ fontFamily: 'Inter' }}
                  >
                    Analytics
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Avg. Watch Time</span>
                      <span className="text-white font-semibold">{project.analytics.watchTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Engagement</span>
                      <span className="text-white font-semibold">{project.analytics.engagement}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Click-through</span>
                      <span className="text-white font-semibold">{project.analytics.clickThrough}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Shares</span>
                      <span className="text-white font-semibold">{project.analytics.shares}</span>
                    </div>
                  </div>
                </div>

                {/* Export Info */}
                <div 
                  className="p-6 rounded-lg border border-gray-700"
                  style={{ background: 'rgba(24, 28, 31, 0.5)' }}
                >
                  <h3 
                    className="text-white text-lg font-semibold mb-4"
                    style={{ fontFamily: 'Inter' }}
                  >
                    Export Details
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Last Export</span>
                      <span className="text-white font-semibold">
                        {project.export.lastExport ? new Date(project.export.lastExport).toLocaleDateString() : 'Never'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Quality</span>
                      <span className="text-white font-semibold">{project.export.quality || 'Not set'}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block mb-2">Formats</span>
                      <div className="flex flex-wrap gap-2">
                        {project.export.formats.length > 0 ? (
                          project.export.formats.map((format, index) => (
                            <span key={index} className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded">
                              {format}
                            </span>
                          ))
                        ) : (
                          <span className="text-gray-500 text-sm">No exports yet</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Script' && (
            <div className="max-w-4xl">
              <h2 className="text-white text-2xl font-bold mb-6" style={{ fontFamily: 'Inter' }}>
                Video Script
              </h2>
              <div className="space-y-6">
                {project.script.scenes.map((scene) => (
                  <div key={scene.id} className="p-6 rounded-lg border border-gray-700" style={{ background: 'rgba(24, 28, 31, 0.5)' }}>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-white text-lg font-semibold" style={{ fontFamily: 'Inter' }}>
                        Scene {scene.id}: {scene.title}
                      </h3>
                      <span className="text-gray-400">{scene.duration}</span>
                    </div>
                    <div className="text-gray-300 leading-relaxed" style={{ fontFamily: 'Inter' }}>
                      <p>This scene covers the main content for "{scene.title}". The script would contain the actual narration and visual cues for the AI video generation.</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'Analytics' && (
            <div className="max-w-4xl">
              <h2 className="text-white text-2xl font-bold mb-6" style={{ fontFamily: 'Inter' }}>
                Video Analytics
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-lg border border-gray-700" style={{ background: 'rgba(24, 28, 31, 0.5)' }}>
                  <h3 className="text-white text-lg font-semibold mb-4">Performance Metrics</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-400">Watch Time</span>
                        <span className="text-white">{project.analytics.watchTime} / {project.duration}</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className="bg-[#2ECC71] h-2 rounded-full" style={{ width: `${project.analytics.engagement}%` }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-400">Engagement Rate</span>
                        <span className="text-white">{project.analytics.engagement}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className="bg-[#FAD406] h-2 rounded-full" style={{ width: `${project.analytics.engagement}%` }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-6 rounded-lg border border-gray-700" style={{ background: 'rgba(24, 28, 31, 0.5)' }}>
                  <h3 className="text-white text-lg font-semibold mb-4">Audience Data</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Total Views</span>
                      <span className="text-white font-semibold">{project.views.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Unique Viewers</span>
                      <span className="text-white font-semibold">{Math.floor(project.views * 0.8).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Return Viewers</span>
                      <span className="text-white font-semibold">{Math.floor(project.views * 0.2).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Settings' && (
            <div className="max-w-4xl">
              <h2 className="text-white text-2xl font-bold mb-6" style={{ fontFamily: 'Inter' }}>
                Project Settings
              </h2>
              <div className="space-y-6">
                <div className="p-6 rounded-lg border border-gray-700" style={{ background: 'rgba(24, 28, 31, 0.5)' }}>
                  <h3 className="text-white text-lg font-semibold mb-4">General Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-400 mb-2">Project Name</label>
                      <input 
                        type="text" 
                        value={project.name}
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 mb-2">Description</label>
                      <textarea 
                        value={project.description}
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white h-24"
                        readOnly
                      />
                    </div>
                  </div>
                </div>
                
                <div className="p-6 rounded-lg border border-gray-700" style={{ background: 'rgba(24, 28, 31, 0.5)' }}>
                  <h3 className="text-white text-lg font-semibold mb-4">Export Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-400 mb-2">Video Quality</label>
                      <select className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white">
                        <option>4K (3840x2160)</option>
                        <option>1080p (1920x1080)</option>
                        <option>720p (1280x720)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-400 mb-2">Format</label>
                      <select className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white">
                        <option>MP4</option>
                        <option>MOV</option>
                        <option>AVI</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
