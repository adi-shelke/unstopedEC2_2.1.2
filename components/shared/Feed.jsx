"use client";
import React from "react";
import tracksData from "../../public/assets/data/tracks.json";
import Card from "./Card";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
const Feed = () => {
  const { genres, trending } = tracksData.tracks;
  return (
    <div className="w-full flex justify-center mt-5 flex-col">
      {/*trending */}
      <div className=" w-full flex flex-col items-center justify-center border-b-2  border-indigo-500">
        <div className="justify-self-start w-full pl-3">
          <h1 className="text-3xl font-bold text-white my-5">Trending</h1>
        </div>
        <div className="flex w-[70%] justify-center">
          <Swiper
            breakpoints={{
                1400: {
                  // width: 768,

                  slidesPerView: 3,
                },
              900: {
                // width: 768,
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
            autoplay={true}
            spaceBetween={50}
            slidesPerView={1}
          >
            {trending.map((track, index) => (
              <SwiperSlide className="flex justify-center" key={index}>
                <Card key={index} track={track} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* genres */}

      {Object.keys(genres).map((genre, index) => (
        <div key={index} className="w-full flex flex-col items-center border-b-2  border-indigo-500">
          <div className="justify-self-start w-full pl-3">
            <h1 className="text-3xl font-bold text-white my-5">{genre}</h1>
          </div>
          <div className="flex w-[70%] justify-center">
            <Swiper
              breakpoints={{
                1400: {
                  // width: 768,

                  slidesPerView: 3,
                },
                900: {
                  // width: 768,
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
              autoplay={true}
              spaceBetween={50}
              slidesPerView={1}
            >
              {genres[genre].map((track, index) => (
                <SwiperSlide className="flex justify-center" key={index}>
                  <Card key={index} track={track} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Feed;
