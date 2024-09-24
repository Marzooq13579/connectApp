import React from "react";
import LogoutComponent from "./LogoutComponent";
import AddFriend from "./AddFriend";

const NavBar = () => {
  return (
    <div className="w-full flex justify-between">
      <div className="m-4">Logo</div>
      <div className="flex">
        <AddFriend/>
        <LogoutComponent />
      </div>
    </div>
  );
};

export default NavBar;
