import { signIn } from "@/auth";
import LoginForm from "@/components/shared/LoginForm";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import React from "react";

const page = () => {
  return (
    <div className="flex justify-center items-center w-[100vw] h-[100vh]">
      <div className="w-full flex items-center">
        <div className="w-[100%] sm:w-[70%] h-[80%] lg:w-[50%] ">
          <LoginForm
            signIn={async (formData) => {
              "use server";
              const res = await signIn("credentials", {
                ...formData,
                redirect: false,
              });
              console.log("res: ", res);
              redirect("/profile");
            }}
          />
        </div>
        <div className="w-[40%] hidden sm:block lg:w-[50%]">
          <Image
            src="/assets/login.svg"
            className="w-[80%] "
            width={500}
            height={500}
            alt="login image"
          />
        </div>
      </div>
    </div>
  );
};

export default page;
