"use client";

import { useRouter } from 'next/navigation';

export default function ProjectNotFound() {
  const router = useRouter();
  return (
    <div 
      className="min-h-screen flex items-center justify-center"
      style={{
        background: 'linear-gradient(135deg, #0A0D0F 0%, #181C1F 100%)'
      }}
    >
      <div className="text-center">
        <div className="text-6xl mb-4">🔍</div>
        <h1 
          className="text-white text-3xl font-bold mb-4"
          style={{
            fontFamily: 'Inter'
          }}
        >
          Project Not Found
        </h1>
        <p 
          className="text-gray-400 mb-8 max-w-md"
          style={{
            fontFamily: 'Inter'
          }}
        >
          The project you're looking for doesn't exist or has been moved.
        </p>
        <div className="space-x-4">
          <button
            onClick={() => router.back()}
            className="px-6 py-3 border border-gray-600 text-white rounded-lg hover:border-gray-500 transition-all"
            style={{
              fontFamily: 'Inter'
            }}
          >
            Go Back
          </button>
          <button
            onClick={() => router.push('/projects')}
            className="px-6 py-3 bg-[#FAD406] text-black rounded-lg font-medium hover:bg-[#e8c406] transition-all"
            style={{
              fontFamily: 'Inter'
            }}
          >
            View All Projects
          </button>
        </div>
      </div>
    </div>
  );
}
