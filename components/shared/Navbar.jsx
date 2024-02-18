import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="h-[60px] flex items-center w-full justify-between bg-[#363849] px-7">
      <div className="text-white">
        <Link href="/">
          <p>BeatMarket</p>
        </Link>
      </div>
      <div className="h-[70%] rounded-full flex w-[60%]  justify-center">
        <input
          className=" h-full rounded-full w-[70%] mx-2 px-2"
          placeholder="Search tracks"
        />
        <Image
          src="/assets/icons/search.png"
          width={30}
          height={15}
          alt="search"
          className="w-auto"
        />
      </div>
      <ul className="">
        <li>
          <Link href="/profile">
            <span className="">
              <Image
                src="/assets/icons/profile.png"
                width={20}
                height={20}
                className=""
                alt="profile"
              />
              <p>Profile</p>
            </span>
          </Link>
        </li>
        <li>
          <Link href="/#feed">
            <span>
              <Image
                src="/assets/icons/tracks.png"
                width={20}
                height={20}
                className=""
                alt="tracks"
              />
              Tracks
            </span>
          </Link>
        </li>
        <li>
          <Link href="/files/upload">
            <span>
              <Image
                src="/assets/icons/upload.png"
                width={20}
                height={20}
                alt="login"
              />
            </span>
          </Link>
        </li>
        <li>
          <Link href="/auth/login">
            <span>
              <Image
                src="/assets/icons/login.png"
                width={20}
                height={20}
                alt="login"
              />
              Login
            </span>
          </Link>
        </li>
        <li>
          <Link href="/user/notifications">
            <Image
              src="/assets/icons/notification.png"
              width={20}
              height={20}
              alt="notification"
            />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
