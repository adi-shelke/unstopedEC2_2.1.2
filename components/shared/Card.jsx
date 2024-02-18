"use client";
import { makePayment } from "@/lib/payment/utils";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const Card = ({ track }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };
  const handleBuy = async (trackId) => {
    const result = await makePayment(trackId);
    const data = await result.json();
    console.log(data);
  }

  return (
    <div className="group relative flex min-h-[380px] w-full max-w-[300px] flex-col overflow-hidden rounded-xl bg-[#ff8d30] shadow-md transition-all hover:shadow-lg md:min-h-[300px] mx-3 text-white">
      <div
        style={{ backgroundImage: `url(${track.imageUrl})` }}
        className="flex-center flex-grow bg-gray-50 bg-cover bg-no-repeat bg-center text-grey-500"
      />
      <div className="flex min-h-[100px] flex-col gap-1 p-2 md:gap-1">
        <div className="w-full flex justify-between">
          <div className="metadata w-[50%]">
            <p
              className="p-medium-16 md:p-medium-20 line-clamp-2 flex-1"
              onClick={togglePlay}
            >
              {track.title}
            </p>
            <p className="p-medium-14 md:p-medium-16 text-grey-600">
              {track.author}
            </p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-black">{`₹ ${track.price}`}</p>
            <Image
              src="/assets/icons/cart.png"
              width={20}
              height={20}
              alt="cart"
              onClick={() => {
                handleBuy("65d20160013ab03326fdc5aa")
                // track._id todo when dynamic data is added put track._id here
                // makePayment("65d20160013ab03326fdc5aa");
              }}
            />
          </div>
        </div>
        <div>
          <audio
            src="https://dysspo-aws-upload-bucket-2.s3.ap-south-1.amazonaws.com/sample-3s.mp3"
            controls
            autoPlay={isPlaying}
            className="w-[100%] "
          ></audio>
        </div>
        {/* <div className="flex-between w-full"></div> */}
      </div>
    </div>
  );
};

export default Card;
