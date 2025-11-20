"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext'; // Import useAuth

export default function LoginForm() {
  const router = useRouter();
  const { login } = useAuth(); // Get login function from useAuth
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (error) {
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Call the login function from AuthContext
      const data = await login({
        email: formData.email,
        password: formData.password,
        rememberMe: rememberMe
      });

      console.log('Login successful:', data);

      if (isMounted) {
        const callbackUrl = localStorage.getItem('callbackUrl');
        if (callbackUrl) {
          localStorage.removeItem('callbackUrl');
          router.push(callbackUrl);
        } else {
          router.push('/projects');
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      // Extract error message from the error object
      const errorMessage = error.message || 'Login failed. Please try again.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Prevent hydration issues
  if (!isMounted) {
    return (
      <div
        className="h-screen w-screen flex items-center justify-center"
        style={{
          background: '#0A0D0F'
        }}
      >
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 rounded-full border-4 border-[#181C1F] border-t-[#FAD406] animate-spin" />
          <div
            className="text-white text-sm"
            style={{
              fontFamily: 'Inter',
              fontWeight: '400'
            }}
          >
            Loading...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="h-screen w-screen overflow-hidden flex"
      style={{
        background: '#0A0D0F'
      }}
    >
      {/* Left Side - Takes up ~50% of screen */}
      <div
        className="relative flex-1 h-full overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0A0D0F 0%, #181C1F 100%)',
          maxWidth: '50%'
        }}
      >
        {/* Scattered Yellow Circle Dots */}
        <div className="absolute" style={{ left: '8%', top: '15%', width: '16px', height: '16px', border: '2px solid #FAD406', borderRadius: '50%', background: 'transparent' }} />
        <div className="absolute" style={{ left: '28%', top: '20%', width: '12px', height: '12px', border: '2px solid #FAD406', borderRadius: '50%', background: 'transparent' }} />
        <div className="absolute" style={{ left: '18%', top: '28%', width: '10px', height: '10px', border: '2px solid #FAD406', borderRadius: '50%', background: 'transparent' }} />
        <div className="absolute" style={{ left: '38%', top: '22%', width: '10px', height: '10px', border: '2px solid #FAD406', borderRadius: '50%', background: 'transparent' }} />
        <div className="absolute" style={{ left: '48%', top: '32%', width: '14px', height: '14px', border: '2px solid #FAD406', borderRadius: '50%', background: 'transparent' }} />
        <div className="absolute" style={{ left: '60%', top: '38%', width: '12px', height: '12px', border: '2px solid #FAD406', borderRadius: '50%', background: 'transparent' }} />
        <div className="absolute" style={{ left: '50%', top: '55%', width: '12px', height: '12px', border: '2px solid #FAD406', borderRadius: '50%', background: 'transparent' }} />
        <div className="absolute" style={{ left: '15%', top: '72%', width: '10px', height: '10px', border: '2px solid #FAD406', borderRadius: '50%', background: 'transparent' }} />
        <div className="absolute" style={{ left: '78%', top: '68%', width: '14px', height: '14px', border: '2px solid #FAD406', borderRadius: '50%', background: 'transparent' }} />

        {/* Dashed Curve Line */}
        <svg
          className="absolute"
          style={{
            top: '22%',
            left: '28%',
            width: '45%',
            height: '35%',
            pointerEvents: 'none'
          }}
          viewBox="0 0 300 200"
          fill="none"
        >
          <path
            d="M 10 40 Q 80 10, 150 60 Q 220 110, 280 90"
            stroke="#FAD406"
            strokeWidth="2"
            strokeDasharray="8,8"
            fill="none"
          />
        </svg>

        {/* Large Play Button Icon in Center-Left */}
        <div className="absolute" style={{ left: '15%', top: '35%' }}>
          <div
            className="relative"
            style={{
              width: '320px',
              height: '320px',
              borderRadius: '24px',
              background: 'linear-gradient(135deg, #1A1D21 0%, #0F1113 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 30px 60px rgba(0, 0, 0, 0.5)',
              border: '1px solid rgba(255, 255, 255, 0.05)'
            }}
          >
            {/* Play Triangle */}
            <div
              style={{
                width: '0',
                height: '0',
                borderLeft: '70px solid #FFFFFF',
                borderTop: '45px solid transparent',
                borderBottom: '45px solid transparent',
                marginLeft: '20px'
              }}
            />
          </div>
        </div>

        {/* Green curved shape in bottom right */}
        <div
          className="absolute"
          style={{
            bottom: '-5%',
            right: '-10%',
            width: '55%',
            height: '45%',
            background: 'linear-gradient(135deg, #86efac 0%, #4ade80 40%, #22c55e 100%)',
            borderRadius: '60% 40% 50% 70%',
            transform: 'rotate(-15deg)',
            opacity: 0.85
          }}
        />

        {/* Main Text Content - Bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-12 z-10">
          <div className="mb-4">
            <h1
              style={{
                fontFamily: 'Inter',
                fontWeight: '400',
                fontSize: 'clamp(36px, 4vw, 52px)',
                color: '#FFFFFF',
                lineHeight: '1.2',
                letterSpacing: '-0.02em'
              }}
            >
              Let's just write
              <br />
              <span style={{ fontWeight: '400' }}>Create with </span>
              <span style={{ color: '#FAD406', fontWeight: '700' }}>Lemonpeel</span>
            </h1>
          </div>

          <div>
            <p
              style={{
                fontFamily: 'Inter',
                fontWeight: '400',
                fontSize: 'clamp(15px, 1.5vw, 17px)',
                color: '#9CA3AF',
                lineHeight: '1.6',
                letterSpacing: '0.01em'
              }}
            >
              prompt→ preview→tweaking→export
              <br />
              AI OS for Creative Professionals
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div
        className="relative flex-1 h-full flex items-center justify-center overflow-y-auto"
        style={{
          maxWidth: '50%',
          background: '#0A0D0F'
        }}
      >
        <div className="w-full max-w-sm px-8 py-8">
          {/* Title */}
          <div
            className="mb-8"
            style={{
              fontFamily: 'Inter',
              fontWeight: '600',
              fontSize: 'clamp(24px, 4vw, 32px)',
              color: '#FFFFFF',
              lineHeight: '1.2',
              zIndex: 10,
              position: 'relative'
            }}
          >
            Log in
          </div>

          {/* Error Message */}
          {error && (
            <div
              className="mb-4 p-3 rounded-md border border-red-500 bg-red-500/10"
            >
              <span
                className="text-red-400 text-sm"
                style={{
                  fontFamily: 'Inter',
                  fontWeight: '400'
                }}
              >
                {error}
              </span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Input */}
            <div className="space-y-2">
              <label
                className="block text-white text-xs tracking-wide"
                style={{
                  fontFamily: 'SF Pro Display',
                  fontWeight: '400'
                }}
              >
                Login
              </label>

              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email or phone number"
                  className="w-full h-12 px-4 bg-[#181C1F] border border-[rgba(229,229,229,0.1)] rounded-md text-[#808080] text-sm focus:outline-none focus:ring-1 focus:ring-[#FAD406]"
                  style={{
                    fontFamily: 'Roboto'
                  }}
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label
                className="block text-white text-xs tracking-wide"
                style={{
                  fontFamily: 'SF Pro Display',
                  fontWeight: '400'
                }}
              >
                Password
              </label>

              <div className="relative">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  className="w-full h-12 px-4 bg-[#181C1F] border border-[rgba(229,229,229,0.1)] rounded-md text-[#808080] text-sm focus:outline-none focus:ring-1 focus:ring-[#FAD406]"
                  style={{
                    fontFamily: 'Roboto'
                  }}
                  required
                />
              </div>
            </div>

            {/* Remember Me Row */}
            <div className="flex justify-between items-center py-2">
              <div className="flex items-center space-x-2">
                {/* Custom Switcher */}
                <div
                  className="relative cursor-pointer w-10 h-5"
                  onClick={() => setRememberMe(!rememberMe)}
                >
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: '#1C252A'
                    }}
                  />
                  <div
                    className="absolute transition-all duration-200 w-5 h-5 rounded-full shadow"
                    style={{
                      left: rememberMe ? '20px' : '0px',
                      background: '#FFFFFF'
                    }}
                  />
                </div>
                <span
                  className="text-white text-xs tracking-wide"
                  style={{
                    fontFamily: 'SF Pro Display'
                  }}
                >
                  Remember me
                </span>
              </div>

              <span
                className="text-[#FAD406] text-xs cursor-pointer tracking-wide"
                style={{
                  fontFamily: 'SF Pro Display'
                }}
              >
                Forgot password?
              </span>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-10 bg-[#FAD406] text-black font-bold text-sm rounded-full transition-all hover:bg-[#e8c406] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              style={{
                fontFamily: 'Roboto'
              }}
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin mr-2" />
                  Signing in...
                </>
              ) : (
                'Log in'
              )}
            </button>

            {/* Divider */}
            <div className="relative my-6">
              <div
                className="absolute inset-0 flex items-center"
              >
                <div
                  className="w-full border-t"
                  style={{
                    borderColor: 'rgba(229, 229, 229, 0.2)'
                  }}
                />
              </div>
            </div>

            {/* Google Button */}
            <button
              type="button"
              className="w-full h-10 bg-[#333333] text-white text-xs rounded-full flex items-center justify-center space-x-2 transition-all hover:bg-[#404040]"
              style={{
                fontFamily: 'SF Pro Display'
              }}
            >
              <div
                className="w-4 h-4 rounded-full"
                style={{
                  background: '#4285F4'
                }}
              />
              <span>Continue with Google</span>
            </button>

            {/* Sign Up Offer */}
            <div className="flex justify-center items-center space-x-2 pt-4">
              <span
                className="text-white text-xs tracking-wide"
                style={{
                  fontFamily: 'SF Pro Display'
                }}
              >
                Don't have an account?
              </span>
              <span
                onClick={() => router.push('/signup')}
                className="text-[#FAD406] text-xs cursor-pointer tracking-wide hover:underline"
                style={{
                  fontFamily: 'SF Pro Display'
                }}
              >
                Sign up
              </span>
            </div>
          </form>

          {/* Footer */}
          <div className="flex justify-between items-center mt-8 text-[#D1D1D1] text-xs">
            <span style={{ fontFamily: 'Roboto' }}>Privacy Policy</span>
            <span style={{ fontFamily: 'Roboto' }}>Terms of Service</span>
          </div>
        </div>
      </div>
    </div>
  );
}