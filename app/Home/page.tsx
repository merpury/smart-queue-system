// pages/index.js
'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import bg from '../images/bgHeader1.svg';
import intro from '../images/intro.svg';
import User from '../images/user.svg';
import sub from '../images/Subtract.png';
import { SetStateAction, useState } from 'react';
import { Inter, Mitr } from 'next/font/google';
import './clip-path.css';

const inter = Inter({ weight: ['700'], subsets: ['latin'] });
const mitr = Mitr({ weight: ['400'], subsets: ['thai'] });

const HeaderPage = () => {
  const [userName, setUserName] = useState<string>('');
  const [buttonDisable, setButtonDisable] = useState<boolean>(true);
  const router = useRouter();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
    setButtonDisable(e.target.value.trim() === '');
  };

  const handleClick = () => {
    if (userName.trim()) {
      router.push('/SelectShop');
    } else {
      // Optional: Provide feedback if needed
      console.log('Please enter your name before proceeding.');
    }
  };

  return (
    <div
      className="h-screen bg-cover bg-center flex flex-col w-full fix"
      style={{ backgroundImage: `url(${bg.src})` }}
    >
      <div className="mt-10 ml-6">
        <Image src={intro} alt="intro" />
      </div>

      <div className="relative mt-32">
        <div className="flex justify-center ">
            <Image src={User} alt="User" />
        </div>
        <Image src={sub} alt="sub" className="w-full h-auto" />

        <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4">

          <div className="px-4 w-full max-w-md">
            <input
              type="text"
              placeholder="พิมพ์ชื่อของคุณ......"
              value={userName}
              onChange={handleInput}
              className={`bg-white text-black px-10 py-4 rounded-full text-center shadow-lg border-2 border-[#CA7257] focus:border-orange-500 w-full max-w-md text-xl font-semibold ${mitr.className}`}
            />
          </div>

          <div className="mb-5">
            <button
              onClick={handleClick}
              className={`bg-[#CA7257] text-white px-6 py-3 rounded-full shadow-lg ${inter.className}`}
            >
              <h2 className="text-lg font-semibold">ยืนยัน</h2>
            </button>
          </div>
        </div>
      </div>
    </div> 
  );
}

export default HeaderPage;