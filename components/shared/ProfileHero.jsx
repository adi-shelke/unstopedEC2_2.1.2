"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const ProfileHero = () => {
  const [user, setuser] = useState({});
  const [menu, setmenu] = useState("mytracks");
  const verifyUser = async () => {
    const res = await fetch("/api/auth/getMe");
    const data = await res.json();
    console.log(data.data);
    setuser(data.data);
  };
  useEffect(() => {
    verifyUser();
  }, []);
  return (
    <div className="w-full h-[100%] flex items-center flex-col bg-[#363849]">
      <div className="w-full bg-blue-500">
        <div className="flex justify-center pt-5">
          <Image
            src="https://img.freepik.com/free-vector/gradient-karaoke-background_23-2150970013.jpg?size=626&ext=jpg&uid=R138337682&ga=GA1.1.1453579024.1708182845&semt=ais"
            width={200}
            height={150}
            alt="profilePicture"
            className="rounded-[200px]"
          />
        </div>
        <div className="flex justify-center text-white">
          <p>{user.name}</p>
        </div>
      </div>
      <div className="links h-[50px] bg-white w-full  flex items-center">
        <p
          className="mx-1 cursor-pointer hover:text-[#506ade]"
          onClick={() => setmenu("mytracks")}
        >
          My Tracks
        </p>
        <p
          className="mx-1 cursor-pointer hover:text-[#506ade]"
          onClick={() => setmenu("purchased")}
        >
          Purchased
        </p>
      </div>

      <div className="w-full text-white">
        {menu === "mytracks" ? (
          <div className="pl-2">
            <p className="mt-2 text-[25px] font-bold">My Tracks</p>
            <div>
              
            </div>
          </div>
        ) : (
          <div className="pl-2">
            <p className="mt-2 text-[25px] font-bold">Purchased</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileHero;
