import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstname, lastname, email, password, confirmPassword, organisationName } = body;

    // Validate all fields are present
    if (!firstname || !lastname || !email || !password || !confirmPassword || !organisationName) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate passwords match
    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: 'Passwords do not match' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate password strength (at least 8 characters)
    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters long' },
        { status: 400 }
      );
    }

    // TODO: Add your database logic here
    // For now, we'll simulate a successful registration
    console.log('Sign up request:', { firstname, lastname, email, organisationName });

    // Simulate user creation
    const user = {
      id: Math.random().toString(36).substring(7),
      firstname,
      lastname,
      email,
      organisationName,
      createdAt: new Date().toISOString()
    };

    return NextResponse.json(
      { 
        success: true,
        message: 'Account created successfully',
        user 
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Sign up error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

