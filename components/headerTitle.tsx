'use client'
import { useRouter } from 'next/navigation';
import React from 'react'
import { GrPrevious } from "react-icons/gr";

type props = {
  title: string
  link:() => void
}

function HeaderTitle({ title, link }: props) {
  
  return (
    <div className='w-full px-8'>
      <div className='flex justify-center items-center w-full py-5 relative'>
        <GrPrevious size={28} color='white' className='absolute left-4 font-bold' onClick={link} />
        <h1 className='text-white font-medium text-3xl'>{title}</h1>
      </div>
    </div>
  )
}

export default HeaderTitle