// app/api/apply/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectMongo from '@/lib/mongoose';
import JobApplication from '@/models/JobApplication';
import JobPosition from '@/models/JobPosition'; // required for populate

// GET all applications
export async function GET() {
  try {
    await connectMongo();
    const applications = await JobApplication.find().populate('jobId');

    return NextResponse.json({ success: true, data: applications });
  } catch (err) {
    console.error('API GET /api/apply error:', err);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch applications' },
      { status: 500 }
    );
  }
}

// POST new application
export async function POST(req: NextRequest) {
  try {
    await connectMongo();

    const body = await req.json();
    const { name, email, jobId, cvUrl } = body;

    if (!name || !email || !jobId || !cvUrl) {
      return NextResponse.json(
        { success: false, error: 'All fields are required' },
        { status: 400 }
      );
    }

    // optional duplicate check
    const existing = await JobApplication.findOne({ email, jobId });
    if (existing) {
      return NextResponse.json(
        { success: false, error: 'You already applied for this job' },
        { status: 400 }
      );
    }

    const application = await JobApplication.create({ name, email, jobId, cvUrl });
    return NextResponse.json({ success: true, data: application }, { status: 201 });
  } catch (err) {
    console.error('API POST /api/apply error:', err);
    return NextResponse.json(
      { success: false, error: 'Failed to submit application' },
      { status: 500 }
    );
  }
}
