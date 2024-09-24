import LogoutComponent from "@/components/LogoutComponent";
import NavBar from "@/components/NavBar";
import Image from "next/image";
import Chats from "@/components/Chats";

export default function Home() {
  return (
    <>
      <NavBar />
      <Chats/>
    </>
  );
}
