"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import qrImage from "../images/qrCode.png";
// import { FiArrowLeft } from "react-icons/fi";
import {useRouter} from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import HeaderTitle from "@/components/headerTitle";
import { clearMenuList } from "@/redux/slices/counterSlice";

//npx next dev
const PaymentPage: React.FC = () => {
  // const [price, setPrice] = useState(50) //สามารถเปลี่ยนตัวแปรข้างในให้สอดคล้องกับราคาที่ส่งมา
  const [timeLeft, setTimeLeft] = useState(300); // 300 วินาที (5 นาที)
  const router = useRouter();
  const totalPrice = useSelector((state: RootState) => state.menu.totalPrice);
  const dispatch = useDispatch();

  useEffect(() => {
    // อัปเดตเวลาทุกๆ วินาที
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    // ตั้งเวลา 5 นาที (300,000 มิลลิวินาที) เปลี่ยน path!
    const timer = setTimeout(() => {
      router.push("ConfirmOrder");
    }, 300000);

    // ล้าง interval และ timer เมื่อ component ถูก unmount
    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [router]);

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };
  //handle button เปลี่ยน path!
  const handleOkayButton = () => {
    dispatch(clearMenuList());
    router.push("queue");
  };
  const handleCancleButton = () => {
    router.push("ConfirmOrder")
  }
  const backToConfirm = () => {
    router.push("ConfirmOrder")
  };

  return (
    // <div className="min-h-screen grid items-center justify-center bg-gray-100">
    <div className='flex flex-col items-center gap-5 bg-primary pt-5 h-screen'>
        {/* header */}
        <HeaderTitle title={'Payment'} link={backToConfirm}/>
        {/* QR Code Section */}
        <div className='bg-white w-screen rounded-t-3xl px-8 py-2 relative h-full'>
        <div className="flex flex-col items-center m-1">
          <Image
            src={qrImage}
            alt="QR Code"
            width={325} // กำหนดขนาดที่ต้องการ
            height={200}
            className="object-contain mb-4 border-1 scale-[80%]"
          />
          <div className="bg-[#045188] border-1 border-red-200 rounded-lg">
            <p className=" text-center text-white text-s px-6 py-2">
              สแกน QR เพื่อชำระเงิน
              <br />
              ยอดชำระ {totalPrice} บาท
            </p>
          </div>
        </div>

        {/* Timer Message */}
        <p className="mt-4 text-red-500 text-center text-xs">
          กรุณาชำระเงินภายใน {formatTime(timeLeft)} นาที
        </p>

        {/* save qr for easily use */}
        <div className="mt-5 flex justify-center">
          <a href={qrImage.src} download="qrCode.png">
            <button className="bg-[#9D9B9B] text-white px-4 py-2 rounded-lg hover:bg-[#767676] text-s">
              Save QRCode
            </button>
          </a>
        </div>

        {/* Buttons */}
        <div className="mt-10 flex justify-around">
          <button className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 text-s"
            onClick={handleCancleButton}>
            ยกเลิก
          </button>
          <button className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 text-s"
            onClick={handleOkayButton}>
              ตกลง
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default PaymentPage;
