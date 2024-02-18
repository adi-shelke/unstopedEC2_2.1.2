import Navbar from "@/components/shared/Navbar";
import React from "react";

const layout = ({ children }) => {
  return (
    <div className="w-[100vw] min-h-screen bg-[#363849]">
      <Navbar />
      {children}
    </div>
  );
};

export default layout;
