"use client";
import Link from "next/link";
import React, { useState } from "react";

const SignUp = () => {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    tags: "",
    file: "",
    genre: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const fileSizeLimit = 8 * 1024 * 1024; // 8 MB
    if (selectedFile && selectedFile.size <= fileSizeLimit) {
      setFormData({
        ...formData,
        file: selectedFile,
      });
      setErrors({});
    } else {
      setFormData({
        ...formData,
        file: null,
      });
      setErrors({ file: "Please select a file that is smaller than 8 MB." });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("file", formData.file);
    formDataToSend.append("tags", formData.tags);
    formDataToSend.append("genre", formData.genre);
    // Basic validation
    const newErrors = {};
    if (!formData.title || formData.length < 3) {
      newErrors.title = "Please enter valid title of track";
    }
    if (!formData.price || formData.price < 0) {
      newErrors.price = "Please enter valid price of track";
    }
    if (!formData.file) {
      newErrors.file = "Please select a file to upload";
    }

    setErrors(newErrors);

    // Submit form if no errors
    if (Object.keys(newErrors).length === 0) {
      // TODO: Submit the file to the backend route
      console.log("File submitted:", formData.file);
      const form = new FormData();
      for (const key in formData) {
        if (Object.hasOwnProperty.call(formData, key)) {
          form.append(key, formData[key]);
        }
      }
      const response = await fetch("/api/files/upload", {
        method: "POST",
        body: form,
      }).then((res) => res.json());
      console.log("response: ", response);
      console.log("Form submitted:", formData);
    }
  };

  return (
    <div className="flex items-center min-h-screen">
      <form className=" mx-auto p-6 rounded-lg shadow-md bg-[#3a5ba0] w-[60%] sm:w-[30%]">
        <h2 className="text-2xl font-bold mb-4 text-white">Sign up</h2>
        <div className="mb-4">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter title of track"
            className={`w-full px-3 py-2 hover:shadow-lg duration-500 ease-in-out hover:shadow-black border border-gray-700 bg-white rounded-md placeholder-gray-500 text-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
              errors?.title ? "border-red-500" : ""
            }`}
          />
          {errors?.title && (
            <p className="text-red-500 text-sm mt-1">{errors?.title}</p>
          )}
        </div>
        <div className="mb-4">
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter price of track"
            className={`w-full px-3 py-2  hover:shadow-lg duration-500 ease-in-out hover:shadow-black border border-gray-700 bg-white rounded-md placeholder-gray-500 text-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm${
              errors?.price ? "border-red-500" : ""
            }`}
          />
          {errors?.price && (
            <p className="text-red-500 text-sm mt-1">{errors?.price}</p>
          )}
        </div>
        <div className="mb-4">
          <input
            type="email"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="Enter tags"
            className={`w-full px-3 py-2   hover:shadow-lg duration-500 ease-in-out hover:shadow-black border border-gray-700 bg-[#ffffff] rounded-md placeholder-gray-500 text-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
              errors?.tags ? "border-red-500 " : ""
            }`}
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            placeholder="Enter genre of track"
            className={`w-full px-3 py-2   hover:shadow-lg duration-500 ease-in-out hover:shadow-black border border-gray-700 bg-[#ffffff] rounded-md placeholder-gray-500 text-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
              errors?.genre ? "border-red-500 " : ""
            }`}
          />
        </div>
        <div className="mb-4">
          <input
            type="file"
            name="file"
            onChange={handleFileChange}
            placeholder="Enter file"
            className={`w-full px-3 py-2   hover:shadow-lg duration-500 ease-in-out hover:shadow-black border border-gray-700 bg-[#ffffff] rounded-md placeholder-gray-500 text-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
              errors?.file ? "border-red-500 " : ""
            }`}
          />
          {errors?.file && (
            <p className="text-red-500 text-sm mt-1">{errors?.file}</p>
          )}
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full py-2 bg-gray-800 text-white rounded-md hover:bg-[#FF8911] focus:outline-none"
        >
          Upload File
        </button>
      </form>
    </div>
  );
};

export default SignUp;
