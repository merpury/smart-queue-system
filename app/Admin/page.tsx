'use client';

import OrderVendor from '@/components/orderVendor';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const AdminPage = () => {
    return (
        <div className='bg-[#CA7257] h-screen bg-cover flex flex-col w-full'>
            <h1 className='font-semibold text-3xl text-white flex justify-center p-10'>My Orders</h1>
            <div className="flex justify-start">
                <div className="w-full h-[90vh] py-6 px-4 bg-white rounded-t-3xl shadow-lg">
                    {/* <h2 className='bg-[#FFDECF] text-[#E95322] rounded-full text-center py-3 text-xl'>กำลังเตรียม</h2> */}
                    <OrderVendor name={'PP'} queue={1} note={'ประเทศไทย'} totalPrice={50}/>
                </div>
            </div>
        </div>
    );
}

export default AdminPage;