import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, rememberMe } = body;

    // Basic validation
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // TODO: Implement your authentication logic here
    // This is a placeholder - replace with your actual authentication
    console.log('Login attempt:', { email, rememberMe });
    // Mock authentication (replace with real authentication)
    if (email === 'demo@lemonpeel.com' && password === 'demo123') {
      // Successful login
      const response = NextResponse.json(
        { 
          success: true, 
          message: 'Login successful',
          user: {
            email,
            name: 'Demo User'
          }
        },
        { status: 200 }
      );

      // Set authentication cookie (optional)
      if (rememberMe) {
        response.cookies.set('auth-token', 'demo-token', {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 30 * 24 * 60 * 60 // 30 days
        });
      } else {
        response.cookies.set('auth-token', 'demo-token', {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict'
          // Session cookie (no maxAge)
        });
      }

      return response;
    } else {
      // Failed login
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'Login endpoint - use POST method' },
    { status: 405 }
  );
}
