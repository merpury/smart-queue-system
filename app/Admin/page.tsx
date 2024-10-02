'use client';

import OrderVendor from '@/components/orderVendor';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { orderData } from '../order/orderData';

interface OrderItem {
    menu: string;
    img: string;
    quantities: number;
    price: number;
}

interface Order {
    _id: string;
    name: string;
    items: OrderItem[];
    totalPrice: number;
    note: string;
    createdAt: string;
}

const AdminPage = () => {
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('/api/getorders');
                const data = await response.json();

                if (data.success) {
                    // Map the image path from orderData to the orders' items
                    const mappedOrders = data.data.map((order: Order) => ({
                        ...order,
                        items: order.items.map((item) => {
                            const matchingData = orderData.find((dataItem) => dataItem.name === item.menu);
                            return {
                                ...item,
                                img: matchingData ? matchingData.image : item.img, // Fallback in case no match
                            };
                        }),
                    }));
                    setOrders(mappedOrders);
                } else {
                    console.error('Failed to fetch orders:', data.message);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchOrders();
    }, []);

    return (
        <div className='bg-[#CA7257] h-screen bg-cover flex flex-col w-full'>
            <h1 className='font-semibold text-3xl text-white flex justify-center p-10'>My Orders</h1>
            <div className="flex justify-start">
                <div className="w-full h-[90vh] py-6 px-4 bg-white rounded-t-3xl shadow-lg">
                    {orders.length > 0 ?
                        orders.map((menu) => (
                            <div key={menu.createdAt}>
                                <OrderVendor 
                                    name={menu.name} 
                                    queue={0} 
                                    note={menu.note} 
                                    totalPrice={menu.totalPrice}
                                    createdAt = {menu.createdAt}
                                    items={menu.items}
                                />
                            </div>
                        ))
                        :
                        <div>ยังไม่มีออเดอร์</div>}
                </div>
            </div>
        </div>
    );
}

export default AdminPage;