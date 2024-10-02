import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/utils/connectToDB';
import Order from '@/models/ConfirmOrder';

export async function POST(request: NextRequest) {
  try {
    await connectToDB();

    const body = await request.json();
    console.log('Received body:', body);

    const { name, items, totalPrice, note } = body;

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
    });

    console.log('Order before save:', order);

    await order.save();

    console.log('Order saved successfully');

    return NextResponse.json({ success: true, data: order }, { status: 201 });
  } catch (error: any) {
    console.error('Error in POST /api/setorders:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}



// import { NextResponse } from 'next/server';
// import { connectToDB } from '@/utils/connectToDB';
// import Order from '@/models/ConfirmOrder';

// export async function POST(request: Request) {
//   await connectToDB();

//   try {
//     const body = await request.json();
//     console.log('Received body:', body); // Debugging log
//     const { orders } = body;

//     // Validate that orders is an array
//     if (!Array.isArray(orders) || orders.length === 0) {
//       return NextResponse.json({ success: false, message: 'Invalid order data' }, { status: 400 });
//     }

//     // Validate each order in the array
//     for (const order of orders) {
//       if (
//         !order.name ||          // Ensure name exists
//         !Array.isArray(order.items) || order.items.length === 0 ||   // Ensure items is an array
//         typeof order.totalPrice !== 'number' || isNaN(order.totalPrice) || order.totalPrice <= 0    // Ensure totalPrice is valid
//       ) {
//         return NextResponse.json({ success: false, message: 'Missing or invalid fields in order' }, { status: 400 });
//       }
//     }

//     // Create new orders
//     const newOrders = await Order.create(orders);

//     return NextResponse.json({ success: true, message: 'Orders created successfully', orders: newOrders }, { status: 201 });
//   } catch (error) {
//     console.error('Error creating orders:', error);
//     return NextResponse.json({ success: false, message: 'Error creating orders' }, { status: 500 });
//   }
// }



// import { NextResponse } from 'next/server';
// import { connectToDB } from '@/utils/connectToDB';
// import Order from '@/models/ConfirmOrder';

// export async function POST(request: Request) {
//   await connectToDB();

//   try {
//     const body = await request.json();
//     console.log('Received body:', body); // Debugging log
//     const { orders } = body;

//     // Validate that orders is an array
//     if (!Array.isArray(orders) || orders.length === 0) {
//       return NextResponse.json({ success: false, message: 'Invalid order data' }, { status: 400 });
//     }

//     // Validate each order in the array
//     for (const order of orders) {
//       if (
//         !order.name ||          // Ensure name exists
//         !Array.isArray(order.items) || order.items.length === 0 ||   // Ensure items is an array
//         typeof order.totalPrice !== 'number' || order.totalPrice <= 0    // Ensure totalPrice is valid
//       ) {
//         return NextResponse.json({ success: false, message: 'Missing or invalid fields in order' }, { status: 400 });
//       }
//     }

//     // Create new orders
//     const newOrders = await Order.create(orders);

//     return NextResponse.json({ success: true, message: 'Orders created successfully', orders: newOrders }, { status: 201 });
//   } catch (error) {
//     console.error('Error creating orders:', error);
//     return NextResponse.json({ success: false, message: 'Error creating orders' }, { status: 500 });
//   }
// }


// // /pages/api/setorder.ts or /app/api/setorder/route.ts
// import { NextResponse } from 'next/server';
// import { connectToDB } from '@/utils/connectToDB';
// import Order from '@/models/ConfirmOrder';

// export async function POST(request: Request) {
//   await connectToDB();

//   try {
//     const body = await request.json();
//     const { orders } = body;

//     // Validate that orders is an array
//     if (!Array.isArray(orders) || orders.length === 0) {
//       return NextResponse.json({ success: false, message: 'Invalid order data' }, { status: 400 });
//     }

//     // Validate each order in the array
//     for (const order of orders) {
//       if (
//         !order.name ||          // Ensure name exists
//         !Array.isArray(order.items) || order.items.length === 0 ||   // Ensure items is an array
//         typeof order.totalPrice !== 'number' || order.totalPrice <= 0    // Ensure totalPrice is valid
//       ) {
//         return NextResponse.json({ success: false, message: 'Missing or invalid fields in order' }, { status: 400 });
//       }
//     }

//     // Create new orders
//     const newOrders = await Order.create(orders);

//     return NextResponse.json({ success: true, message: 'Orders created successfully', orders: newOrders }, { status: 201 });
//   } catch (error) {
//     console.error('Error creating orders:', error);
//     return NextResponse.json({ success: false, message: 'Error creating orders' }, { status: 500 });
//   }
// }



// import { NextResponse } from 'next/server';
// import { connectToDB } from '@/utils/connectToDB';
// import Order from '@/models/ConfirmOrder';

// export async function POST(request: Request) {
//   await connectToDB();

//   try {
//     const body = await request.json();
//     const { orders } = body;

//     // Validate that orders is an array
//     if (!Array.isArray(orders) || orders.length === 0) {
//       return NextResponse.json({ success: false, message: 'Invalid order data' }, { status: 400 });
//     }

//     // Validate each order in the array
//     for (const order of orders) {
//       if (
//         !order.name ||          // Ensure name exists
//         !Array.isArray(order.menu) || order.menu.length === 0 ||   // Ensure menu is an array
//         !Array.isArray(order.img) || order.img.length === 0 ||     // Ensure img is an array
//         typeof order.quantities !== 'number' || order.quantities <= 0 ||  // Ensure quantities is valid
//         typeof order.totalPrice !== 'number' || order.totalPrice <= 0    // Ensure totalPrice is valid
//       ) {
//         return NextResponse.json({ success: false, message: 'Missing or invalid fields in order' }, { status: 400 });
//       }
//     }

//     // Create new orders
//     const newOrders = await Order.create(orders);

//     return NextResponse.json({ success: true, message: 'Orders created successfully', orders: newOrders }, { status: 201 });
//   } catch (error) {
//     console.error('Error creating orders:', error);
//     return NextResponse.json({ success: false, message: 'Error creating orders' }, { status: 500 });
//   }
// }

// export async function GET() {
//   // Example GET handler if you need it
//   return NextResponse.json({ success: true, message: 'GET method is working' }, { status: 200 });
// }


// import { NextResponse } from 'next/server';
// import { connectToDB } from '@/utils/connectToDB';
// import Order from '@/models/ConfirmOrder';

// export async function POST(request: Request) {
//   await connectToDB();

//   try {
//     const body = await request.json();
//     const { orders } = body;

//     if (!Array.isArray(orders) || orders.length === 0) {
//       return NextResponse.json({ success: false, message: 'Invalid order data' }, { status: 400 });
//     }

//     // Validate each order
//     for (const order of orders) {
//       if (!order.menu || !order.img || !order.quantities || !order.totalPrice) {
//         return NextResponse.json({ success: false, message: 'Missing required fields in an order' }, { status: 400 });
//       }
//     }

//     // Create new orders
//     const newOrders = await Order.create(orders);

//     return NextResponse.json({ success: true, message: 'Orders created successfully', orders: newOrders }, { status: 201 });
//   } catch (error) {
//     console.error('Error creating orders:', error);
//     return NextResponse.json({ success: false, message: 'Error creating orders' }, { status: 500 });
//   }
// }

// export async function GET() {
//   // Example GET handler if you need it
//   return NextResponse.json({ success: true, message: 'GET method is working' }, { status: 200 });
// }



// import { NextResponse } from 'next/server';
// import { connectToDB } from '@/utils/connectToDB';
// import Order from '@/models/ConfirmOrder';
// import { NextApiRequest, NextApiResponse } from 'next';

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ success: false, message: 'Method not allowed' })
//   }

//   await connectToDB()

//   try {
//     const { orders } = req.body

//     if (!Array.isArray(orders) || orders.length === 0) {
//       return res.status(400).json({ success: false, message: 'Invalid order data' })
//     }

//     // Validate each order
//     for (const order of orders) {
//       if (!order.menu || !order.img || !order.quantities || !order.totalPrice) {
//         return res.status(400).json({ success: false, message: 'Missing required fields in an order' })
//       }
//     }

//     // Create new orders
//     const newOrders = await Order.create(orders)

//     res.status(201).json({ success: true, message: 'Orders created successfully', orders: newOrders })
//   } catch (error) {
//     console.error('Error creating orders:', error)
//     res.status(500).json({ success: false, message: 'Error creating orders' })
//   }
// }

// import { NextResponse } from 'next/server';
// import { connectToDB } from '@/utils/connectToDB';
// import Order from '@/models/ConfirmOrder';

// export async function POST(req: Request) {
//   await connectToDB();

//   try {
//     const orderData = await req.json();

//     // Validate input
//     if (!orderData.menu || !orderData.img || !orderData.quantities || !orderData.totalPrice) {
//       return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 });
//     }

//     // Create new order
//     const newOrder = new Order(orderData);

//     // Save order to database
//     await newOrder.save();

//     return NextResponse.json({ success: true, message: 'Order created successfully', order: newOrder }, { status: 201 });
//   } catch (error) {
//     console.error('Error creating order:', error);
//     return NextResponse.json({ success: false, message: 'Error creating order' }, { status: 500 });
//   }
// }
