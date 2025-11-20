import { NextRequest, NextResponse } from 'next/server';

// Mock project data
const mockProjects = [
  {
    id: 1,
    name: 'E-commerce Platform',
    status: 'Active',
    progress: 85,
    team: 5,
    deadline: '2024-12-15',
    color: '#2ECC71',
    description: 'Full-stack e-commerce solution with React and Node.js',
    tags: ['React', 'Node.js', 'MongoDB'],
    createdAt: '2024-09-01'
  },
  {
    id: 2,
    name: 'Mobile App Redesign',
    status: 'Active',
    progress: 60,
    team: 3,
    deadline: '2024-11-30',
    color: '#FAD406',
    description: 'Complete UI/UX overhaul for mobile application',
    tags: ['React Native', 'Design', 'UX'],
    createdAt: '2024-10-01'
  },
  {
    id: 3,
    name: 'Data Analytics Dashboard',
    status: 'Completed',
    progress: 100,
    team: 4,
    deadline: '2024-10-20',
    color: '#3498DB',
    description: 'Real-time analytics dashboard with charts and reports',
    tags: ['Next.js', 'D3.js', 'Analytics'],
    createdAt: '2024-08-15'
  },
  {
    id: 4,
    name: 'Marketing Website',
    status: 'Active',
    progress: 40,
    team: 2,
    deadline: '2024-12-01',
    color: '#2ECC71',
    description: 'Corporate marketing website with CMS integration',
    tags: ['Next.js', 'Tailwind', 'CMS'],
    createdAt: '2024-10-15'
  },
  {
    id: 5,
    name: 'API Integration',
    status: 'On Hold',
    progress: 25,
    team: 3,
    deadline: '2025-01-15',
    color: '#E74C3C',
    description: 'Third-party API integrations and documentation',
    tags: ['API', 'Integration', 'Documentation'],
    createdAt: '2024-09-20'
  },
  {
    id: 6,
    name: 'User Authentication System',
    status: 'Active',
    progress: 90,
    team: 2,
    deadline: '2024-11-25',
    color: '#2ECC71',
    description: 'Secure authentication with JWT and OAuth',
    tags: ['Authentication', 'Security', 'JWT'],
    createdAt: '2024-10-05'
  }
];

export async function GET(request: NextRequest) {
  try {
    // In a real app, you'd verify the user's authentication here
    const url = new URL(request.url);
    const status = url.searchParams.get('status');
    const limit = url.searchParams.get('limit');
    
    let filteredProjects = mockProjects;
    
    // Filter by status if provided
    if (status && status !== 'all') {
      filteredProjects = mockProjects.filter(project => 
        project.status.toLowerCase() === status.toLowerCase()
      );
    }
    
    // Limit results if provided
    if (limit) {
      filteredProjects = filteredProjects.slice(0, parseInt(limit));
    }
    
    // Calculate stats
    const stats = {
      total: mockProjects.length,
      active: mockProjects.filter(p => p.status === 'Active').length,
      completed: mockProjects.filter(p => p.status === 'Completed').length,
      onHold: mockProjects.filter(p => p.status === 'On Hold').length
    };
    
    return NextResponse.json({
      projects: filteredProjects,
      stats,
      success: true
    });
  } catch (error) {
    console.error('Projects API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const image = formData.get('image') as File;
    
    // Basic validation
    if (!name) {
      return NextResponse.json(
        { error: 'Project name is required' },
        { status: 400 }
      );
    }

    if (!image) {
      return NextResponse.json(
        { error: 'Project image is required' },
        { status: 400 }
      );
    }

    // Validate image type
    if (!image.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'File must be an image' },
        { status: 400 }
      );
    }

    // Validate image size (10MB max)
    if (image.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'Image size must be less than 10MB' },
        { status: 400 }
      );
    }
    
    // In a real app, you would:
    // 1. Upload the image to cloud storage (S3, Cloudinary, etc.)
    // 2. Save project data to database with image URL
    // 3. Return the created project with the image URL
    
    // For now, we'll create a mock project
    const newProject = {
      id: mockProjects.length + 1,
      name,
      status: 'Active',
      progress: 0,
      team: 1,
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days from now
      color: '#FAD406',
      description: `AI Video project: ${name}`,
      tags: ['AI', 'Video'],
      createdAt: new Date().toISOString().split('T')[0],
      imageName: image.name,
      imageSize: image.size,
      imageType: image.type
    };
    
    // In a real app, you would save this to your database
    mockProjects.push(newProject);
    
    return NextResponse.json({
      project: newProject,
      success: true,
      message: 'Project created successfully'
    }, { status: 201 });
  } catch (error) {
    console.error('Create project error:', error);
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    );
  }
}
