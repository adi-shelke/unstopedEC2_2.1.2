import { auth } from "@/auth";
import Navbar from "@/components/shared/Navbar";
import ProfileHero from "@/components/shared/ProfileHero";
import { redirect } from "next/navigation";
import React from "react";

export default async function Profile() {
  const session = await auth();

  if (!session) {
    redirect("/auth/signin");
  }
  console.log("session: ", session);

  return (
    <div className="w-full bg-[#363849] min-h-screen">
      <div>
        <Navbar isSession={!!session} />
      </div>
      <div className="w-full h-[100vh]">
        <div className="w-full h-[100%]">
          <ProfileHero user={session.user} />
        </div>
      </div>
    </div>
  );
}
