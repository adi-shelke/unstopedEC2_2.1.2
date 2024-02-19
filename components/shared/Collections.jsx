"use client";
import React from "react";
import { useEffect, useState } from "react";
import Card from "./Card";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
const Collections = () => {
  const [user, setuser] = useState({});
  const [tracks, settracks] = useState([]);
  const verifyUser = async () => {
    try {
      const res = await fetch("/api/auth/getMe");
      const data = await res.json();
      console.log(data.data);
      setuser(data.data); // Set user state
    } catch (error) {
      console.error("Error verifying user:", error);
    }
  };

  const getTracks = async (userId) => {
    try {
      console.log("user Id is", userId);
      const res = await fetch("/api/files/getTracks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });
      const data = await res.json();
      if (data.tracks.length === 0) {
        console.log("No tracks");
        return;
      }
      settracks(data.tracks); // Set tracks state
    } catch (error) {
      console.error("Error fetching tracks:", error);
    }
  };

  useEffect(() => {
    const construct = async () => {
      console.log("inside useEffect");
      await verifyUser(); // Call verifyUser to set user state
    };
    construct();
  }, []); // Empty dependency array to run once on mount

  useEffect(() => {
    if (user._id) { // Only call getTracks if user._id is truthy
      getTracks(user._id);
    }
  }, [user]);
  return (
    <div className="w-full bg-black h-[100%]">
      <div className="w-full flex justify-center">
        <div className="w-full flex justify-center h-[400px] items-center">
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
