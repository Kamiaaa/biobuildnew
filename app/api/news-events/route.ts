// app/api/news-events/route.ts
import { NextResponse } from 'next/server';
import connectMongo from '@/lib/mongoose';
import NewsEvent from '@/models/NewsEvent';

export async function GET(request: Request) {
  try {
    await connectMongo();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '6');

    const skip = (page - 1) * limit;

    // Fetch news and events with pagination
    const items = await NewsEvent.find()
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await NewsEvent.countDocuments();

    return NextResponse.json({
      data: items,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error: any) {
    console.error('Error fetching news and events:', error);
    return NextResponse.json(
      { message: error.message || 'Error fetching news and events' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectMongo();
    const body = await request.json();

    const { type, title, date, location, summary, image } = body;

    if (!type || !title || !date || !summary || !image) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    const newItem = await NewsEvent.create({
      type,
      title,
      date,
      location: type === 'event' ? location : undefined,
      summary,
      image,
    });

    return NextResponse.json(
      { message: 'News/Event created successfully', data: newItem },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating news/event:', error);
    return NextResponse.json(
      { message: error.message || 'Error creating news/event' },
      { status: 500 }
    );
  }
}
