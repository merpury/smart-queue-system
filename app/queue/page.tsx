"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import waitImgame from '../images/queue1.png';
import locationImgame from "../images/location_logo.png";
import line from "../images/line_dot.svg";

const QueuePage: React.FC = () => {
    const [userQueue, setUserQueue] = useState<number>(0);
    const [currentQueue, setCurrentQueue] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchCurrentQueue = async () => {
        try {
            const response = await fetch('/api/getCurrentQueue');
            if (!response.ok) {
                throw new Error('Failed to fetch current queue');
            }
            const data = await response.json();
            setCurrentQueue(data.queue);
        } catch (err) {
            console.error(err);
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Unknown error occurred');
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const storedQueue = sessionStorage.getItem('userQueue');
        if (storedQueue) {
            setUserQueue(parseInt(storedQueue, 10));
        }

        fetchCurrentQueue();

        // Set up a timer to refresh the queue every 30 seconds
        // Bug: It's double fetch for the first time come to this page and when currentQueue is changed. (but it's worked)
        const intervalId = setInterval(() => {
            if (currentQueue !== userQueue) {
                fetchCurrentQueue();
            }
        }, 30000);

        if (currentQueue === userQueue) {
            clearInterval(intervalId);
        }

        return () => {
            clearInterval(intervalId);
        };
    }, [currentQueue, userQueue]);

    const currentDate = new Date().toLocaleDateString('th-TH', { timeZone: 'Asia/Bangkok' });

    // ฟังก์ชั่นในการตกแต่งเลขคิวให้เป็นแบบ 001, 023, 123
    const formatQueueNumber = (number: any) => {
        return String(number).padStart(3, '0');
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#CA7257]">
            <h1 className="text-3xl text-white p-4 font-medium mt-1">Queue </h1>
            <div className="bg-white shadow-md rounded-lg max-w-md w-full">

                {/* Queue Text Section */}
                <div className="mt-3 block p-2 justify-center">
                    <div className=" block justify-end">
                        {currentQueue !== userQueue && (
                            <>
                                <p className="text-center text-[#878787] text-2xl">
                                    คิวปัจจุบัน <br />
                                </p>
                                <p className="text-center text-[#CA7257] text-7xl">
                                    {formatQueueNumber(currentQueue)} <br />
                                </p>
                                <div className="block justify-end p-6">
                                    <p className="text-center text-[#878787] text-2xl">
                                        คิวของคุณ <br />
                                    </p>
                                    <p className="text-center text-[#CA7257] text-7xl">
                                        {formatQueueNumber(userQueue)} <br />
                                    </p>
                                </div>
                            </>
                        )}
                        {currentQueue === userQueue && (
                            <p className="text-center text-[#CA7257] text-5xl mt-4">
                                ถึงคิวคุณแล้ว!
                            </p>
                        )}
                        <p className="text-[#878787] text-center font-light text-xl p-3">
                            Date: {currentDate} <br />
                        </p>
                        <Image
                            src={line}
                            alt="line"
                            width={1200}
                            className="object-contain"
                        />
                    </div>
                </div>

                {/* Text Section */}
                <div className="flex flex-col items-center">
                    <div className="mt-6 flex justify-between items-center">
                        {/* Placeholder for Image */}
                        <Image
                            src={locationImgame}
                            alt="Waiting Image"
                            width={30} // กำหนดขนาดที่ต้องการ
                            height={30}
                            className="object-contain mr-2"
                        />
                        <p className="text-[#CA7257] font-light text-2xl">
                            ตลาดน้อยตึกเพียรวิจิตร<br />
                        </p>
                    </div>
                </div>

                {/* Image Section */}
                <div className="flex flex-col p-10 items-center">
                    {/* Placeholder for Image */}
                    <Image
                        src={waitImgame}
                        alt="Waiting Image"
                        width={320} // กำหนดขนาดที่ต้องการ
                        height={320}
                        className="object-contain"
                    />
                    <p className="text-center text-[#4d2000] font-bold text-4xl">
                        Please wait ...<br />
                    </p>
                </div>
            </div>
        </div>
    );
};

export default QueuePage;
