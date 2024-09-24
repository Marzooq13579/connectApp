"use client";
import React from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const LogoutComponent = () => {
  const router = useRouter();

  function handleLogout() {
    Cookies.remove("token");
    toast.error("Logged Out!");
    router.push("/login");
  }

  return (
    <button type="button" className="btn-primary" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutComponent;
