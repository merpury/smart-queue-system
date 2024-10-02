'use client'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface OrderItem {
    menu: string;
    img: string;
    quantities: number;
    price: number;
  }

type props = {
    name: string,
    queue: number,
    note: string,
    totalPrice: number,
    createdAt: string
    items: OrderItem[]
}

function OrderVendor({ name, queue, note, totalPrice, createdAt, items}: props) {
    const router = useRouter();

    const handleClick = () => {
          router.push({
            pathname: '/Admin/order',
            query: {items: JSON.stringify(items)}
          });
    };

    return (
        <div className='grid grid-cols-2 border-y border-primary py-2 p-6'>
            <div className='grid col-span-1 gap-2'>
                <div className=''>
                    <h1 className='text-[22px] font-medium'>{name} No. {queue}</h1>
                    <h2 className=''>หมายเหตุ : {note === '' ? '-' : note}</h2>
                </div>
                <h3 className='font-light text-sm'>{new Date(createdAt).toLocaleString()}</h3>
            </div>
            <div className='flex flex-col justify-between items-end'>                <h2 className='text-[#E95322]'>฿{totalPrice}</h2>
                <button
                    className='bg-[#E95322] text-white rounded-lg py-1 px-6 h-[35px]'
                    onClick={handleClick}
                >
                    Details
                </button>
            </div>
        </div>
    );
}

export default OrderVendor