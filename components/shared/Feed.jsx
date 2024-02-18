"use client";
import React from "react";
import tracksData from "../../public/assets/data/tracks.json";
import Card from "./Card";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
const Feed = () => {
  const pop = tracksData.filter((track) => track.genre === "pop");
  const rock = tracksData.filter((track) => track.genre === "rock");
  const electronic = tracksData.filter((track) => track.genre === "electronic");

  return (
    <div
      id="feed"
      className="w-full flex justify-center mt-5 flex-col bg-[#686bff]"
    >
      <div className="w-[100%] flex justify-center">
        <p className="text-white pt-5 text-[30px] font-black">
          Explore fine music
        </p>
      </div>
      {/*trending */}
      <div className=" w-full flex flex-col items-center justify-center border-b-2  border-[#ff8d30]">
        <div className="justify-self-start w-full pl-3">
          <h1 className="text-3xl font-bold text-white my-5">Pop</h1>
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
            // autoplay={true}
            spaceBetween={50}
            slidesPerView={1}
          >
            {pop.map((track, index) => (
              <SwiperSlide className="flex justify-center" key={index}>
                <Card key={index} track={track} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <div className=" w-full flex flex-col items-center justify-center border-b-2  border-[#ff8d30]">
        <div className="justify-self-start w-full pl-3">
          <h1 className="text-3xl font-bold text-white my-5">Rock</h1>
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
            // autoplay={true}
            spaceBetween={50}
            slidesPerView={1}
          >
            {rock.map((track, index) => (
              <SwiperSlide className="flex justify-center" key={index}>
                <Card key={index} track={track} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <div className=" w-full flex flex-col items-center justify-center border-b-2  border-[#ff8d30]">
        <div className="justify-self-start w-full pl-3">
          <h1 className="text-3xl font-bold text-white my-5">Electronic</h1>
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
            // autoplay={true}
            spaceBetween={50}
            slidesPerView={1}
          >
            {electronic.map((track, index) => (
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

export default Feed;
