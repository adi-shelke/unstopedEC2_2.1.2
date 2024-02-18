import Navbar from "@/components/shared/Navbar";
import ProfileHero from "@/components/shared/ProfileHero";
import React from "react";

export default function Profile() {
  return (
    <div className="w-full bg-[#363849] min-h-screen">
      <div>
        <Navbar />
      </div>
      <div className="w-full h-[100vh]">
        <div className="w-full h-[100%]">
          <ProfileHero />
        </div>
      </div>
    </div>
  );
}
