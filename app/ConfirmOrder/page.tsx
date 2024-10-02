'use client'
import HeaderTitle from '@/components/headerTitle'
import OrderCustumer from '@/components/orderCustomer';
import { RootState } from '@/redux/store';
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addMenu, decreaseQuantityMenu, removeMenu, setPrice } from "@/redux/slices/counterSlice";

// Function to check if it's a new day
function isNewDay(lastDate: Date): boolean {
  const today = new Date();
  return (
    today.getFullYear() !== lastDate.getFullYear() ||
    today.getMonth() !== lastDate.getMonth() ||
    today.getDate() !== lastDate.getDate()
  );
}

// Function to get the next queue number
interface QueueEntry {
  queue: number;
  createdAt: Date;
}

async function getNextQueueNumber(): Promise<number> {
  try {
    const response = await fetch('api/getLastQueue'); 

    if (!response.ok) {
      throw new Error('Failed to fetch the last queue');
    }

    const lastEntryQueue: QueueEntry | null = await response.json(); // Parse the response

    let queue = 0;

    if (lastEntryQueue) {
      const lastDate = new Date(lastEntryQueue.createdAt); // Ensure createdAt is a Date object
      if (isNewDay(lastDate)) {
        queue = 1; // Reset queue for a new day
      } else {
        queue = lastEntryQueue.queue + 1; // Increment the queue for the current day
      }
    }

    return queue; // Return the next queue number
  } catch (error) {
    console.error('Error fetching the last queue:', error);
    return 1; // Default queue number in case of error
  }
}

function ConfirmOrder() {
  const router = useRouter()
  const menuLists = useSelector((state: RootState) => state.menu.menuLists)
  const dispatch = useDispatch()
  const [currentOrderName, setCurrentOrderName] = useState('')
  const [note, setNote] = useState('')

  const deleteMenu = (menuName: string) => {
    dispatch(removeMenu(menuName))
  }

  const handleIncrease = (quantities: number, menu: string, img: any) => {
    dispatch(addMenu({
      menu,
      img,
      quantities,
      price: 10
    }))
  };

  const handleDecrease = (menu: string) => {
    const existingItem = menuLists.find(item => item.menu === menu);
    if (existingItem && existingItem.quantities > 1) {
      dispatch(decreaseQuantityMenu(menu));
    }
  };

  const total = menuLists.reduce((sum, item) => sum + (item.quantities * 10), 0)

  useEffect(() => {
    dispatch(setPrice(total))
  }, [total, dispatch]);

  const backToOrder = () => {
    router.push('/order')
  }

  const goToPayment = async () => {
    if (!currentOrderName) {
      alert('Please enter an order name');
      return;
    }
  
    // Get the queue number
    const queue = await getNextQueueNumber();

    const orderData = {
      name: currentOrderName,
      items: menuLists.map(item => ({
        menu: item.menu,
        // img: item.img.src, // Use the src property of the imported image
        img: item.img.src,
        quantities: item.quantities,
        price: item.price || 10, // Provide a default price if it's missing
      })),
      totalPrice: total,
      note,
      queue: queue,
    };
  
    console.log('Sending order data:', orderData);
  
    try {
      const response = await fetch('/api/storeData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });
  
      console.log('Response status:', response.status);
  
      const data = await response.json();
      console.log('Response data:', data);
  
      if (response.ok) {
        if (data.success) {
          // Save queue to session storage
          sessionStorage.setItem('userQueue', String(queue));
          router.push('/payment');
        } else {
          throw new Error(data.error || 'Failed to save order');
        }
      } else {
        throw new Error(`Failed to save order: ${data.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error saving order:', error);
      // Check if error is an instance of Error
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      alert(`Failed to save order. Please try again. Error: ${errorMessage}`);
    }
  }

  return (
    <div className='flex flex-col items-center gap-5 bg-primary pt-5 h-screen'>
      <HeaderTitle title={'Confirm Order'} link={backToOrder} />
      <div className='bg-white w-screen rounded-t-3xl px-8 py-2 relative h-full'>
        {menuLists.length > 0 ? (
          <div>
            <h2 className='font-medium text-xl my-4'>Order Summary</h2>
            <input
              type='text'
              placeholder='Enter order name'
              value={currentOrderName}
              onChange={(e) => setCurrentOrderName(e.target.value)}
              className='border border-black rounded-xl px-4 py-2 mb-4 w-full'
            />
            <div>
              {menuLists.map((item) => (
                <OrderCustumer
                  key={item.menu}
                  menu={item.menu}
                  img={item.img}
                  quantites={item.quantities}
                  remove={() => deleteMenu(item.menu)}
                  increase={() => handleIncrease(item.quantities, item.menu, item.img)}
                  decrease={() => handleDecrease(item.menu)}
                />
              ))}
            </div>
            <div className='sticky bottom-0 left-0 w-full py-4 bg-white flex flex-col justify-center gap-6 border-t-2 border-primary'>
              <div className='flex justify-between items-center'>
                <h2 className='text-lg font-medium'>Total</h2>
                <h2 className='text-lg font-medium'>฿{total}</h2>
              </div>
              <div className='flex flex-col gap-2'>
                <h2 className='font-medium text-lg'>หมายเหตุ</h2>
                <input
                  type='text'
                  placeholder='ระบุหมายเหตุ เช่น ไม่ผัก น้ำเยอะ'
                  className='border border-black rounded-xl px-4 py-2'
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </div>
              <button className='bg-primary rounded-xl py-3' onClick={goToPayment}>
                <h2 className='text-white text-xl'>Confirm Order</h2>
              </button>
            </div>
          </div>
        ) : (
          <div className='flex flex-col justify-center items-center w-full rounded-t-3xl h-full'>
            <h2 className='text-2xl text-primary font-medium'>โปรดเลือกเมนูของคุณ</h2>
          </div>
        )}
      </div>
    </div>
  )
}

export default ConfirmOrder