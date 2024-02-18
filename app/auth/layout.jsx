import Navbar from "@/components/shared/Navbar";
import React from "react";

const layout = ({ children }) => {
  return (
    <div className="bg-[#363849]">
      <Navbar />
      {children}
    </div>
  );
};

export default layout;
