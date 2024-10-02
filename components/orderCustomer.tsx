import Image from 'next/image'
import React, { useEffect } from 'react'
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaCircleMinus } from "react-icons/fa6";
import { FaCirclePlus } from "react-icons/fa6";

type props = {
    menu: string,
    img: any,
    quantites: number,
    remove: () => void,
    increase: () => void,
    decrease: () => void,
}

function OrderCustumer({ menu, img, quantites, remove, increase, decrease }: props) {
    const price = quantites * 10;

    return (
        <div className='grid grid-cols-2 border-y border-primary py-2'>
            <div className='flex items-center'>
                <Image src={img} alt='' width={110} height={110} className='col-span-1 object-cover rounded-lg' />
            </div>
            <div className='grid gap-3'>
                <div className='flex items-center justify-between'>
                    <h2 className='text-lg font-medium'>{menu}</h2>
                    <RiDeleteBin6Line size={20} color='#E95322' onClick={remove}/>
                </div>
                <div className='flex flex-col items-end gap-3'>
                    <h2 className='text-[#E95322] font-medium'>฿{price}</h2>
                    <div className='flex items-center gap-3'>
                        <FaCircleMinus size={20} color='#E95322' onClick={decrease}/>
                        <h2 className=''>{quantites}</h2>
                        <FaCirclePlus size={20} color='#E95322' onClick={increase}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderCustumer