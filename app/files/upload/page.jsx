"use client";
import { useState } from "react";

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const fileSizeLimit = 8 * 1024 * 1024; // 8 MB

    if (selectedFile && selectedFile.size <= fileSizeLimit) {
      setFile(selectedFile);
      setError(null);
    } else {
      setFile(null);
      setError("Please select a file that is smaller than 8 MB.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (file) {
      // TODO: Submit the file to the backend route
      console.log("File submitted:", file);
      const form = new FormData();
      form.append("file", file);
      const response = await fetch("/api/files/upload", {
        method: "POST",
        body: form,
      }).then((res) => res.json());
      console.log("response: ", response);
    } else {
      setError("Please select a file to upload.");
    }
  };

  return (
    <div className="container p-4 flex justify-center items-center w-[100vw] bg-[#363849]  h-[100vh]">
      <div className="bg-[#3a5ba0] text-white p-4 rounded-lg w-[40%] h-[40%]">
        <h1 className="text-2xl font-bold mb-4">Upload Audio File</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="fileInput" className="block mb-2 font-medium">
              Select an audio file (max 8 MB):
            </label>
            <input
              type="file"
              id="fileInput"
              accept="audio/*"
              onChange={handleFileChange}
              className=" w-full px-3 py-2  hover:shadow-lg duration-300 ease-in-out hover:shadow-black border border-gray-700 bg-[#ffffff] rounded-md placeholder-gray-500 text-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {file && <span className="text-gray-500">{file.name}</span>}
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>
          <button
            type="submit"
            className="bg-gray-800 text-white rounded-md hover:bg-[#FF8911] px-3 py-2"
          >
            Upload
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadPage;
