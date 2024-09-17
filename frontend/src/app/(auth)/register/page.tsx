import React from "react";
import {AuthModal} from "@/components/AuthModal";

const page = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <AuthModal action={"register"}/>
    </div>
  );
};

export default page;
