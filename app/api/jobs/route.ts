import { NextRequest, NextResponse } from 'next/server';
import connectMongo from '@/lib/mongoose';
import JobPosition from '@/models/JobPosition';

export async function GET() {
  await connectMongo();
  const jobs = await JobPosition.find();
  return NextResponse.json(jobs);
}

export async function POST(req: NextRequest) {
  await connectMongo();
  const { title, location, description } = await req.json();

  if (!title || !location || !description) {
    return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
  }

  const job = await JobPosition.create({ title, location, description });
  return NextResponse.json(job, { status: 201 });
}
