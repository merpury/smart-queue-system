import { NextResponse } from 'next/server';
import connectDB from '../../../config/database';
import model from '../../../models/dataSchema';

interface QueueEntry {
  queue: number;
  createdAt: string;
}

export async function GET() {
  try {
    console.log('Fetching current queue');
    await connectDB();

    // Use aggregation to find the current queue value with status "Incomplete"
    const result = await model.aggregate([
      { $match: { status: "Incomplete" } },
      { $group: { _id: null, currentQueue: { $min: "$queue" } } },
      { $project: { _id: 0, currentQueue: 1 } }
    ]);

    console.log('Fetched result:', result);

    if (result.length === 0) {
      const response: QueueEntry = {
        queue: 0,
        createdAt: new Date().toISOString(),
      };
      return NextResponse.json(response, { status: 200 });
    }

    const currentQueue = result[0].currentQueue;

    const lastEntryQueue = await model.findOne({ queue: currentQueue }).exec();

    const response: QueueEntry = {
      queue: lastEntryQueue.queue,
      createdAt: lastEntryQueue.createdAt.toISOString(),
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('Error fetching the current queue:', error);

    // Additional timeout check to ensure connection handling
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json({ error: `Failed to fetch the minimum queue. ${errorMessage}` }, { status: 500 });
  }
}
