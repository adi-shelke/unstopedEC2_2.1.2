"use client";
import { submitDataSignup } from "@/lib/auth/utils";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from 'next/navigation'

const SignUp = () => {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    repeatpassword: "",
  });

  const [errors, setErrors] = useState({});
  const [loginError, setloginError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    const newErrors = {};
    if (!formData.name) {
      newErrors.name = "Please enter your name";
    }
    if (!formData.email) {
      newErrors.email = "Please enter your email";
    }
    if (!formData.password) {
      newErrors.password = "Please enter your password";
    }
    if (!formData.repeatpassword) {
      newErrors.repeatpassword = "Please enter your confirm password";
    }
    if (formData.password !== formData.repeatpassword) {
      newErrors.repeatpassword = "Password does not match";
    }

    setErrors(newErrors);

    // Submit form if no errors
    if (Object.keys(newErrors).length === 0) {
      // Here you can submit the form data
      const result = await submitDataSignup(formData);
      if (result.status == 500) setloginError(true);
      else
      router.push('/')
      console.log("Form submitted:", formData);
    }
  };
  return (
    <div className="flex items-center">
      <form className=" mx-auto p-6 rounded-lg shadow-md bg-[#3a5ba0] w-[60%] sm:w-[50%]">
        <h2 className="text-2xl font-bold mb-4 text-white">Sign up</h2>
        <div className="mb-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className={`w-full px-3 py-2 hover:shadow-lg duration-500 ease-in-out hover:shadow-black border border-gray-700 bg-white rounded-md placeholder-gray-500 text-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
              errors.name ? "border-red-500" : ""
            }`}
          />
          {errors.name && (
            <p className="text-[#e89b3e] text-sm mt-1">{errors.name}</p>
          )}
        </div>
        <div className="mb-4">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className={`w-full px-3 py-2  hover:shadow-lg duration-500 ease-in-out hover:shadow-black border border-gray-700 bg-white rounded-md placeholder-gray-500 text-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm${
              errors.email ? "border-red-500" : ""
            }`}
          />
          {errors.email && (
            <p className="text-[#e89b3e] text-sm mt-1">{errors.email}</p>
          )}
        </div>
        <div className="mb-4">
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className={`w-full px-3 py-2   hover:shadow-lg duration-500 ease-in-out hover:shadow-black border border-gray-700 bg-[#ffffff] rounded-md placeholder-gray-500 text-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
              errors.email ? "border-red-500 " : ""
            }`}
          />
          {errors.password && (
            <p className="text-[#e89b3e] text-sm mt-1">{errors.password}</p>
          )}
        </div>
        <div className="mb-4">
          <input
            type="password"
            name="repeatpassword"
            value={formData.repeatpassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            className={`w-full px-3 py-2   hover:shadow-lg duration-500 ease-in-out hover:shadow-black border border-gray-700 bg-white rounded-md placeholder-gray-500 text-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
              errors.repeatpassword ? "border-red-500" : ""
            }`}
          />
          {errors.repeatpassword && (
            <p className="text-[#e89b3e] text-sm mt-1">
              {errors.repeatpassword}
            </p>
          )}
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full py-2 bg-gray-800 text-white rounded-md hover:bg-[#FF8911] focus:outline-none focus:bg-blue-600"
        >
          Sign up
        </button>
        {loginError && (
          <p className="mt-2 text-[#e89b3e] font-bold">Internal Server Error</p>
        )}

        <p className="mt-2 text-white">
          Alread have account?{" "}
          <Link href="/auth/login" className="underline hover:text-[#FF8911]">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
