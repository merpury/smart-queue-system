import { NextResponse } from 'next/server';
import connectDB from '../../../config/database';
import model from '../../../models/dataSchema';

interface QueueEntry {
  queue: number;
  createdAt: string;
}

export async function GET() {
  try {
    console.log('Fetching last queue entry...');
    await connectDB();
    // Fetch the last queue entry sorted by createdAt descending
    const lastEntryQueue = await model.findOne().sort({ createdAt: -1 }).exec();
    console.log('Fetched last entry:', lastEntryQueue);

    if (!lastEntryQueue) {
      const response: QueueEntry = {
        queue: 0, 
        createdAt: new Date().toISOString(),
      };
      return NextResponse.json(response, { status: 200 });
    }

    const response: QueueEntry = {
      queue: lastEntryQueue.queue,
      createdAt: lastEntryQueue.createdAt.toISOString(),
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('Error fetching the last queue:', error);

    // Additional timeout check to ensure connection handling
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json({ error: `Failed to fetch the last queue. ${errorMessage}` }, { status: 500 });
  }
}
