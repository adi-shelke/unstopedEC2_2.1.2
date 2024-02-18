"use client";
import { submitDataLogin } from "@/lib/auth/utils";
import Link from "next/link";
import React, { useState } from "react";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Please enter your email";
    }
    if (!formData.password) {
      newErrors.pasword = "Please enter your password";
    }

    setErrors(newErrors);
    // Submit form if no errors
    if (Object.keys(newErrors).length === 0) {
      // Here you can submit the form data
      submitDataLogin(formData);
      console.log("Form submitted:", formData);
    }
  };
  return (
    <div className="flex items-center">
      <form className=" mx-auto p-6 rounded-lg shadow-md bg-[#3a5ba0] w-[50%]">
        <h2 className="text-2xl font-bold mb-4 text-white">Login</h2>
        <div className="mb-4">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className={`w-full px-3 py-2   hover:shadow-lg duration-500 ease-in-out hover:shadow-black border border-gray-700 bg-[#ffffff] rounded-md placeholder-gray-500 text-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
              errors.email ? "border-red-500 " : ""
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>
        <div className="mb-4">
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className={`w-full px-3 py-2   hover:shadow-lg duration-500 ease-in-out hover:shadow-black border border-gray-700 bg-white rounded-md placeholder-gray-500 text-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
              errors.password ? "border-red-500" : ""
            }`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full py-2 bg-gray-800 text-white rounded-md hover:bg-[#FF8911] focus:outline-none focus:bg-blue-600"
        >
          Login
        </button>
        <p className="mt-2 text-white">
          Don't have an account?{" "}
          <Link href="/auth/signup" className="underline hover:text-[#FF8911]">
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
