'use client'
// pages/index.js
import Link from 'next/link';
import Image from 'next/image';
import bg from '../images/bgHeader.svg';
import intro from '../images/intro.svg';
import User from '../images/user.svg';
import {SetStateAction, useState} from 'react';

const headerPage = () => {
  const [userName, setUserName] = useState('');
  
  const handleInput = (e: { target: { value: SetStateAction<string>; }; }) => {
    setUserName(e.target.value);
  };
  
  return (
    <div
      className="h-screen bg-cover bg-center flex flex-col p-4 w-full relative"
      style={{ backgroundImage: `url(${bg.src})`,
              }}
    >
       <div className="mt-10 ml-6">
          <Image
            src={intro}
            alt="intro"
          />
       </div>
       <div className="flex flex-col justify-between items-center" style={{marginTop:'17.5rem'}}>
          <div className='mb-20'>
            <Image
            src={User}
            alt="User"
          />
          </div>
          
          <div className="px-4 mb-10">
          <input
            type="text"
            placeholder="พิมพ์ชื่อของคุณ......"
            value={userName}
            onChange={handleInput}
            className="bg-white text-black px-10 py-4 rounded-full text-center shadow-lg border-2 border-[#CA7257] w-full max-w-md text-xl font-semibold"
          />
          </div>

          <div className="bt-10">
            <Link href={""}>
            <button className="bg-[#CA7257] text-white px-6 py-3 rounded-full shadow-lg">
              <h2 className="text-lg font-semibold">ยืนยัน</h2>
            </button>
            </Link>
          </div>
       </div>
    </div>
  );
}
export default headerPage;