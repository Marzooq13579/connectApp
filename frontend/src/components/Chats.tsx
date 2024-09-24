import React from "react";
import ChatList from "./ChatList";
import Chat from "./Chat";

const Chats = () => {
  return (
    <div className="flex w-full h-screen justify-around items-center border border-solid">
      <ChatList/>
      <Chat/>
    </div>
  );
};

export default Chats;
