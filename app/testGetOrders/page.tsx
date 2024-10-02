'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { orderData } from '../order/orderData'; // Adjust path accordingly

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

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

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
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div>Loading orders...</div>;
  }

  return (
    <div>
      <h1>All Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order._id}>
              <h2>Order for: {order.name}</h2>
              <p>Total Price: ฿{order.totalPrice}</p>
              <p>Note: {order.note}</p>
              <p>Created At: {new Date(order.createdAt).toLocaleString()}</p>
              <h3>Items:</h3>
              <ul>
                {order.items.map((item, index) => (
                  <li key={index}>
                    <Image
                      src={item.img} // This should now point to the correct imported image
                      alt={item.menu}
                      width={100}
                      height={100}
                    />
                    <p>{item.menu}</p>
                    <p>Quantity: {item.quantities}</p>
                    <p>Price: ฿{item.price}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrdersPage;
