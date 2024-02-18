import Feed from "@/components/shared/Feed";
import Hero from "@/components/shared/Hero";
import Navbar from "@/components/shared/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-[100vw] min-h-screen ">
      <Navbar />
      <div className="w-full flex justify-center items-center flex-col">
        <Hero />
        <Feed />
      </div>
    </div>
  );
}
