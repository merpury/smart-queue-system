import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../../config/database';
import Order from '@/models/dataSchema';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    console.log('Received body:', body);

    const { name, items, totalPrice, note, queue } = body;

    // Validate the incoming data
    if (!name || !Array.isArray(items) || items.length === 0 || typeof totalPrice !== 'number') {
      return NextResponse.json({ success: false, error: 'Invalid data format' }, { status: 400 });
    }

    // Ensure all items have the required fields
    const validItems = items.every(item => 
      item.menu && typeof item.img === 'string' && typeof item.quantities === 'number' && typeof item.price === 'number'
    );

    if (!validItems) {
      return NextResponse.json({ success: false, error: 'Invalid item data' }, { status: 400 });
    }

    const order = new Order({
      name,
      items,
      totalPrice,
      note,
      queue,
    });

    await order.save();

    console.log('Order saved successfully');

    return NextResponse.json({ success: true, data: order }, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/dataSchema:', error);

    // Check if error is an instance of Error
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json({ success: false, error: errorMessage }, { status: 400 });
  }
}