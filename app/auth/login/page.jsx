import LoginForm from "@/components/shared/LoginForm";
import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <div className="flex justify-center items-center w-[100vw] h-[100vh] bg-[#363849]">
      <div className="w-full flex items-center">
        <div className="w-[50%]">
          <LoginForm />
        </div>
        <div className="w-[50%]">
          <Image src="/assets/login.svg" width={500} height={500} />
        </div>
      </div>
    </div>
  );
};

export default page;
