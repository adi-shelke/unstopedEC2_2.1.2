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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (file) {
      // TODO: Submit the file to the backend route
      console.log("File submitted:", file);
    } else {
      setError("Please select a file to upload.");
    }
  };

  return (
    <div className="container mx-auto p-4 flex justify-center items-center bg-gray-200 min-h-screen">
      <div className="bg-white p-4 rounded-lg">
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
              className="hidden"
            />
            <label
              htmlFor="fileInput"
              className="block bg-black  text-white py-2 px-4 rounded cursor-pointer hover:bg-blue-600"
            >
              Choose File
            </label>
            {file && <span className="text-gray-500">{file.name}</span>}
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Upload
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadPage;
