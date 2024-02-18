import { makePayment } from "@/lib/payment/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Card = ({ track }) => {
  return (
    <div className="group relative flex min-h-[380px] w-full max-w-[300px] flex-col overflow-hidden rounded-xl bg-[#1588ff] shadow-md transition-all hover:shadow-lg md:min-h-[300px] mx-3 text-white">
      <button onClick={() => makePayment()}>click to buy</button>

      <Link
        href={`/events/${track._id}`}
        style={{ backgroundImage: `url(${track.imageUrl})` }}
        className="flex-center flex-grow bg-gray-50 bg-cover bg-no-repeat bg-center text-grey-500"
      />
      <div className="flex min-h-[100px] flex-col gap-3 p-5 md:gap-4">
        <Link href={`/events/${track._id}`}>
          <p className="p-medium-16 md:p-medium-20 line-clamp-2 flex-1">
            {track.title}
          </p>
        </Link>
        <div className="flex-between w-full">
          <p className="p-medium-14 md:p-medium-16 text-grey-600">
            {track.author}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
