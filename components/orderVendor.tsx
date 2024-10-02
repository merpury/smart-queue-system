import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'

type props = {
    name: string,
    queue: number,
    note: string,
    totalPrice: number,
}

function OrderVendor({ name, queue, note, totalPrice}: props) {
    const router = useRouter();

    const handleClick = () => {
          router.push('/Admin/order');
    };

    return (
        <div className='flex flex-col border-y border-primary py-2 p-6'>
            <div className='flex flex-row mb-3'>
                <div className='flex flex-row'>
                    <h2 className='text-xl font-medium'>{name}</h2>
                    <h2 className='text-xl font-medium ml-4'>No. {queue}</h2>
                </div>
                <h2 className='font-medium text-[#E95322] text-center ml-40'>${totalPrice}</h2>
            </div>
            <div className='flex flex-row justify-between'>
                <div className=' '>หมายเหตุ : {note}</div>
                <button onClick={handleClick}>
                    <div className='bg-[#FFDECF] text-[#E95322] rounded-full text-center w-[100px] py-1'>รายละเอียด</div>
                </button>
            </div>
        </div>
    );
}

export default OrderVendor