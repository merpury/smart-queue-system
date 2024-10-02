'use client'
import Image from 'next/image';
import React from 'react'
import Shabu from '../images/shabu.png'
import { useRouter } from 'next/navigation';
import HeaderTitle from '@/components/headerTitle';

function SelectShop() {

    const router = useRouter();

    const handleClick = () => {
        router.push('/order')
    }

    const backToHome = () => {
        router.push('/')
    }

    return (
        <div className='flex flex-col justify-center items-center gap-5 bg-primary pt-5 h-screen'>
            <HeaderTitle title='เลือกร้านค้า' link={backToHome}/>
            <div className='bg-white w-screen rounded-t-3xl py-8 flex flex-col items-center h-full'>
                <div
                    className='grid max-sm:w-[300px] w-[500px] rounded-[25px] shadow-config cursor-pointer'
                    onClick={handleClick}
                >
                    <Image
                        src={Shabu}
                        alt=''
                        className='object-cover rounded-t-[25px] h-[165px]'
                    />
                    <h2 className='py-4 pl-5'>ชาบูเสียบไม้</h2>
                </div>
            </div>
        </div>
    )
}

export default SelectShop