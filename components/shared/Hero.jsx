"use client";
import Image from "next/image";
import React from "react";
import { useRef } from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="w-[100vw] h-[100vh] bg-[url('/assets/bg.jpg')] bg-cover flex ">
      <div className="w-[50%]  h-full flex text-white flex-col justify-center pl-4 px-5">
        <p className="text-[60px] font-bold">BeatMarket</p>
        <p className="mt-3 font-semibold text-[20px]">
          Empowering Producers, Inspiring Artists: Your Destination for Premium
          Beats and Creative Collaboration.
        </p>
        <Link href="/#feed">
          <Button className="w-[100px] bg-white text-black mt-3 duration-300 ease-in-out hover:bg-[#d18e4f] hover:text-white">
            Explore
          </Button>
        </Link>
      </div>
      <div className="w-[50%] h-full"></div>
    </div>
  );
};

export default Hero;
