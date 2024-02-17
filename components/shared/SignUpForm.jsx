"use client";
import Link from "next/link";
import React, { useState } from "react";

const SignUp = () => {
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
    if (!formData.firstName) {
      newErrors.firstName = "Please enter your first name";
    }
    if (!formData.lastName) {
      newErrors.lastName = "Please enter your last name";
    }
    if (!formData.email) {
      newErrors.email = "Please enter your email";
    }
    if (!formData.password) {
      newErrors.password = "Please enter your password";
    }

    setErrors(newErrors);

    // Submit form if no errors
    if (Object.keys(newErrors).length === 0) {
      // Here you can submit the form data
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
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
            className={`w-full px-3 py-2 hover:shadow-lg duration-500 ease-in-out hover:shadow-black border border-gray-700 bg-white rounded-md placeholder-gray-500 text-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
              errors.firstName ? "border-red-500" : ""
            }`}
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
          )}
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            className={`w-full px-3 py-2  hover:shadow-lg duration-500 ease-in-out hover:shadow-black border border-gray-700 bg-white rounded-md placeholder-gray-500 text-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm${
              errors.lastName ? "border-red-500" : ""
            }`}
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
          )}
        </div>
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
          Sign up
        </button>

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
