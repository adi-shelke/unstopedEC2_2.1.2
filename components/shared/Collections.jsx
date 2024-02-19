"use client";
import React from "react";
import { useEffect, useState } from "react";
import Card from "./Card";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
const Collections = ({ user }) => {
  const [tracks, settracks] = useState([]);
  const getTracks = async () => {
    const res = await fetch("/api/files/getTracks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: user._id }),
    });
    const data = await res.json();
    if (data.tracks.length === 0) {
      console.log("No tracks");
      return;
    }
    settracks(data.tracks);
  };
  
  useEffect(() => {
    getTracks();
  }, []);
  return (
    <div className="w-full bg-black h-[380px]">
      <div className="w-full flex justify-center">
        <div className="w-full flex justify-center">
          <Swiper
            breakpoints={{
              1400: {
                // width: 1024,

                slidesPerView: 3,
              },
              900: {
                // width: 1024,
                slidesPerView: 2,
              },
              500: {
                // width: 768,
                slidesPerView: 1,
              },
            }}
            style={{ paddingBottom: "30px" }}
            pagination={true}
            modules={[Pagination, Autoplay]}
            // autoplay={true}
            spaceBetween={50}
            slidesPerView={1}
          >
            {tracks.map((track, index) => (
              <SwiperSlide className="flex justify-center" key={index}>
                <Card key={index} track={track} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Collections;
