"use client";
import { useRouter, usePathname } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "@/redux/slice/authApiSlice";
import { setCredentials } from "@/redux/slice/authSlice";

import { jwtDecode, JwtPayload } from "jwt-decode";
import Cookies from "js-cookie";

interface AuthModalInterface {
  action: string;
}

interface jwtDecodeToken extends JwtPayload {
  username: string;
}

export const AuthModal: React.FC<AuthModalInterface> = ({ action }) => {
  const router = useRouter();
  const pathName = usePathname();

  const [register, setRegister] = useState(action == "register");

  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const [loginUser, {}] = useLoginUserMutation();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  function handleRedirect() {
    let redirectTo = register ? "login" : "register";

    router.push(redirectTo);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();

    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  async function handleSubmit() {
    console.log("formData value is", formData);

    if (register && formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    if (register) {
      try {
        const response = await registerUser(formData).unwrap();
        toast.success("User Registered Successfully!");
        router.push("/login");
      } catch (err) {
        console.error("Failed to register user:", err);
        toast.error("Error while registering the user");
      }
    } else {
      try {
        const loginResponse = await loginUser(formData).unwrap();

        let jwtToken = loginResponse.access_token;

        Cookies.set("token", jwtToken, { expires: 7 });

        // Decode token to extract user info (optional)
        const decoded = jwtDecode<jwtDecodeToken>(jwtToken);

        console.log("decode value is", decoded);

        dispatch(
          setCredentials({
            username: decoded.username,
          })
        );
        toast.success("Login Successful");
        router.push("/");
      } catch (err) {
        console.error("Failed to login", err);
        toast.error("Error during login");
      }
    }
  }

  return (
    <>
      <div className="flex flex-col gap-8 border-solid border-2 border-black p-5">
        <h1 className="flex justify-center underline">
          {register ? "Register" : "Login"}
        </h1>
        {register && (
          <div className="flex justify-around">
            <h3>Name :</h3>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-32"
            />
          </div>
        )}
        <div className="flex justify-around">
          <h3>Email : </h3>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-32"
          />
        </div>
        <div className="flex justify-around">
          <h3>Password : </h3>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-32"
          />
        </div>
        {register && (
          <div className="flex justify-end">
            <h3>Confirm Password :</h3>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-32"
            />
          </div>
        )}
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
        <button className="place-self-end" onClick={handleRedirect}>
          Go to {register ? "Login" : "Register"}
        </button>
      </div>
    </>
  );
};
