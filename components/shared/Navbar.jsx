import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="h-[60px] flex items-center w-full justify-between bg-[#363849] mt-4 px-7">
      <div className="text-white">
        <Link href="/">
          <p>BeatMakers</p>
        </Link>
      </div>
      <div className="h-[70%] rounded-full flex w-[60%]  justify-center">
        <input className=" h-full rounded-full w-[70%] mx-2 px-2" />
        <Image
          src="/assets/icons/search.png"
          width={30}
          height={15}
          alt="search"
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
              />
              <p>Profile</p>
            </span>
          </Link>
        </li>
        <li>
          <Link href="/">
            <span>
              <Image
                src="/assets/icons/tracks.png"
                width={20}
                height={20}
                className=""
              />
              Tracks
            </span>
          </Link>
        </li>
        <li>
          <Link href="/auth/login">
            <span>
              <Image src="/assets/icons/login.png" width={20} height={20} />
              Login
            </span>
          </Link>
        </li>
        {/* <li>
          <a href="#">
            <span>
              Summary
            </span>
          </a>
        </li> */}
      </ul>
    </div>
  );
};

export default Navbar;
