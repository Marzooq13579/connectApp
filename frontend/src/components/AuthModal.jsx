"use client";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AuthModal = () => {
  const router = useRouter();
  const pathName = usePathname();

  const [register, setRegister] = useState(false);

  const [formData,setFormData] = useState({
    name : "",
    email : "",
    password : "",
    confirmPassword : ""
  })

  useEffect(() => {
    if (pathName.includes("register")) {
      console.log("register path");
      setRegister(true);
    }
  }, [pathName]);

  function handleRedirect(){
    let redirectTo = register ? "login" : "register"

    router.push(redirectTo)
  }


  function handleChange(e){

    e.preventDefault();

    const {name,value} = e.target

    setFormData({
      ...formData,
      [name] : value
    })

  }

  function handleSubmit(){
    console.log("formData value is",formData)

    if(formData.password!==formData.confirmPassword){
      toast.error("Passwords do not match!")
      return;
    }

    


  }


  return (
    <>
      <div className="flex flex-col gap-8 border-solid border-2 border-black p-5">
        <h1 className="flex justify-center underline">{register ? "Register" : "Login"}</h1>
        {register && (
          <div className="flex justify-around">
            <h3>Name :</h3>
            <input name="name" value={formData.name} onChange={handleChange} className="w-32" />
          </div>
        )}
        <div className="flex justify-around">
        <h3>Email : </h3>
        <input type="email" name="email" value={formData.email} onChange={handleChange}  className="w-32" />
        </div>
        <div className="flex justify-around">
        <h3>Password : </h3>
        <input type="password" name="password" value={formData.password}onChange={handleChange}  className="w-32" />
        </div>
        {register && (
          <div className="flex justify-end">
            <h3>Confirm Password :</h3>
            <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange}  className="w-32" />
          </div>
        )}
        <button type="submit" onClick={handleSubmit}>Submit</button>
        <button className="place-self-end" onClick={handleRedirect}>Go to {register ? "Login" : "Register" }</button>
      </div>
    </>
  );
};
