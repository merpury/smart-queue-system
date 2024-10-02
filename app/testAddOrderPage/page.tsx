'use client';

import React, { useState } from 'react';
import { orderData } from '../order/orderData'; // นำเข้าข้อมูลจาก orderData

const AddOrderPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  
  const addRandomOrder = async () => {
    setLoading(true);
    setResponseMessage('');

    // สุ่มข้อมูลจาก orderData
    const randomIndex = Math.floor(Math.random() * orderData.length);
    const randomMenu = orderData[randomIndex];

    // ข้อมูลมั่วๆ ตามโครงสร้างที่ต้องการ
    const randomOrder = {
      menu: randomMenu.name,
      img: randomMenu.image.src, // ส่งเฉพาะ URL ของภาพ
      quantities: Math.floor(Math.random() * 10) + 1, // จำนวนแบบสุ่ม
      totalPrice: (Math.floor(Math.random() * 100) + 1) * 100, // ราคาสุ่ม
    };

    console.log('Order data to be sent:', JSON.stringify(randomOrder, null, 2));

    try {
      const response = await fetch('/api/setorders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(randomOrder),
      });

      const result = await response.json();

      console.log('Response from API:', JSON.stringify(result, null, 2));

      if (result.success) {
        setResponseMessage('Order created successfully!');
      } else {
        setResponseMessage('Failed to create order: ' + result.message);
      }
    } catch (error) {
      console.log('Error:', error);
      setResponseMessage('Error: ' + error);
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Add Random Order</h1>
      <button onClick={addRandomOrder} disabled={loading}>
        {loading ? 'Adding...' : 'Add Random Order'}
      </button>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default AddOrderPage;
