import LoginForm from "@/components/shared/LoginForm";
import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <div className="flex justify-center items-center w-[100vw] h-[100vh] bg-[#363849]">
      <div className="w-full flex items-center">
        <div className="w-[100%] sm:w-[70%] h-[80%] lg:w-[50%] ">
          <LoginForm />
        </div>
        <div className="w-[40%] hidden sm:block lg:w-[50%]">
          <Image
            src="/assets/login.svg"
            className="w-[80%] "
            width={500}
            height={500}
          />
        </div>
      </div>
    </div>
  );
};

export default page;
