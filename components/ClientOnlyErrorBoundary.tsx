"use client";

import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ClientOnlyErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('Hydration error caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div 
          className="h-screen w-screen flex items-center justify-center"
          style={{
            background: '#0A0D0F',
            color: 'white',
            fontFamily: 'Inter'
          }}
        >
          <div className="text-center">
            <h2 className="text-xl mb-4">Something went wrong</h2>
            <p className="text-gray-400 mb-4">Please refresh the page</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-[#FAD406] text-black rounded-lg hover:bg-[#e8c406] transition-all"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
