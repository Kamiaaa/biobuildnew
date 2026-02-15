//app/api/projects/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectMongo from '@/lib/mongoose';
import { Project } from '@/models/Project'; // adjust the path if needed

// Get all projects
export async function GET() {
  try {
    await connectMongo();
    const projects = await Project.find().sort({ createdAt: -1 });
    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching projects', error }, { status: 500 });
  }
}

// Create new project
export async function POST(req: NextRequest) {
  try {
    await connectMongo();
    const body = await req.json();
    
    // Handle isActive field conversion if it's passed as a string
    if (body.isActive !== undefined) {
      if (typeof body.isActive === 'string') {
        body.isActive = body.isActive === 'true';
      }
    }
    
    const newProject = await Project.create(body);
    return NextResponse.json(newProject, { status: 201 });
  } catch (error: any) {
    console.error('POST error:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      return NextResponse.json(
        { 
          message: 'Validation error', 
          errors: error.errors 
        }, 
        { status: 400 }
      );
    }
    
    // Handle duplicate key errors
    if (error.code === 11000) {
      return NextResponse.json(
        { 
          message: 'Project with this title already exists' 
        }, 
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { 
        message: 'Error creating project', 
        error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error' 
      }, 
      { status: 500 }
    );
  }
}