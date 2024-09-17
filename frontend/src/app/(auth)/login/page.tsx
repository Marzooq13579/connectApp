import { AuthModal } from "@/components/AuthModal";
import React from "react";

const page = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <AuthModal action={"login"}/>
    </div>
  );
};

export default page;
