import { NextRequest, NextResponse } from 'next/server';
import connectMongo from '@/lib/mongoose';
import { Project } from '@/models/Project';

export async function GET(
  _: NextRequest, 
  context: { params: Promise<{ id: string }> } // Note: params is a Promise in App Router
) {
  try {
    const params = await context.params; // Await the params
    const { id } = params;
    
    await connectMongo();
    const project = await Project.findById(id);
    
    if (!project) {
      return NextResponse.json({ message: 'Project not found' }, { status: 404 });
    }
    
    return NextResponse.json(project);
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ message: 'Error fetching project' }, { status: 500 });
  }
}

// Similarly update PATCH and DELETE methods
export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const { id } = params;
    
    await connectMongo();
    const updates = await req.json();
    
    if (updates.isActive !== undefined) {
      if (typeof updates.isActive === 'string') {
        updates.isActive = updates.isActive === 'true';
      }
    }
    
    const updatedProject = await Project.findByIdAndUpdate(
      id, 
      updates, 
      { new: true, runValidators: true }
    );
    
    if (!updatedProject) {
      return NextResponse.json({ message: 'Project not found' }, { status: 404 });
    }
    
    return NextResponse.json(updatedProject);
  } catch (error) {
    console.error('PATCH error:', error);
    return NextResponse.json({ message: 'Error updating project' }, { status: 500 });
  }
}

export async function DELETE(
  _: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const { id } = params;
    
    await connectMongo();
    const deleted = await Project.findByIdAndDelete(id);
    
    if (!deleted) {
      return NextResponse.json({ message: 'Project not found' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json({ message: 'Error deleting project' }, { status: 500 });
  }
}