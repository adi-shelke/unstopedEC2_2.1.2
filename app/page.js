import Feed from "@/components/shared/Feed";
import Navbar from "@/components/shared/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-[100vw] min-h-screen bg-[#686bff]">
      <Navbar />
      <div className="w-full flex justify-center items-center">
        <Feed />
      </div>
    </div>
  );
}
