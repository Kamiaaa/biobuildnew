// app/api/apply/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectMongo from '@/lib/mongoose';
import JobApplication from '@/models/JobApplication';
import JobPosition from '@/models/JobPosition';

// GET a single application
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectMongo();
    const { id } = await context.params;

    const application = await JobApplication.findById(id).populate('jobId');
    if (!application) {
      return NextResponse.json(
        { success: false, error: 'Application not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: application });
  } catch (err) {
    console.error('API GET /api/apply/[id] error:', err);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch application' },
      { status: 500 }
    );
  }
}

// DELETE an application
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectMongo();
    const { id } = await context.params;

    const deleted = await JobApplication.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json(
        { success: false, error: 'Application not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: 'Application deleted successfully' });
  } catch (err) {
    console.error('API DELETE /api/apply/[id] error:', err);
    return NextResponse.json(
      { success: false, error: 'Failed to delete application' },
      { status: 500 }
    );
  }
}
