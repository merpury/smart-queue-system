import { NextResponse } from 'next/server';
import { connectToDB } from '@/utils/connectToDB';
import Order, {IOrder} from '@/models/ConfirmOrder';
import { Types } from 'mongoose';

export async function GET() {
  try {
    await connectToDB();

    const orders = await Order.find().lean() as IOrder[];

    
    // แปลงข้อมูล Mongoose Document เป็น JSON และรวมข้อมูลทั้งหมด
    const ordersJSON = orders.map((order)=> ({
      _id: (order._id as Types.ObjectId).toString(),
      name: order.name,
      items: order.items.map((item: { menu: any; img: any; quantities: any; price: any; }) => ({
        menu: item.menu,
        img: item.img,
        quantities: item.quantities,
        price: item.price,
      })),
      totalPrice: order.totalPrice,
      note: order.note,
      createdAt: order.createdAt.toISOString(),
    }));

    return NextResponse.json({ success: true, data: ordersJSON });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({ success: false, message: 'Error fetching orders' });
  }
}