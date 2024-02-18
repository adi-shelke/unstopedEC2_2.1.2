import Feed from "@/components/shared/Feed";
import Navbar from "@/components/shared/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-[100vw] bg-[#363849]">
      <Navbar />
      <div className="w-full flex justify-center items-center">
        {/* <Image src="/assets/home.svg" height={500} width={500} alt="landing" /> */}
        <Feed />
      </div>
    </div>
  );
}
