import Image from "next/image";
import Link from "next/link";
import React from "react";

const Card = ({ track }) => {
  return (
    <div className="group relative flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[438px] mx-3">
      <Link
        href={`/events/${track._id}`}
        style={{ backgroundImage: `url(${track.imageUrl})` }}
        className="flex-center flex-grow bg-gray-50 bg-contain bg-no-repeat bg-center text-grey-500"
      />
      <div className="flex min-h-[230px] flex-col gap-3 p-5 md:gap-4">
        <Link href={`/events/${track._id}`}>
          <p className="p-medium-16 md:p-medium-20 line-clamp-2 flex-1 text-black">
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
