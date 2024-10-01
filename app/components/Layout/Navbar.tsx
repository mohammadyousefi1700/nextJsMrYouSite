// async function fetchUserData() {
//   const { account } = await AuthAppwriteClient();
//   //   console.log(
//   //     "accountsssssssss",
//   //     account.getSession().then((res) => console.log(res))
//   //   );

// import auth from "@/app/auth";
// import Image from "next/image";
// import profilePic from "../../../public/download.ico";
import Link from "next/link";
import UserInfo from "./UserInfo";
// import MenuDropDown from "../DropDown/dropDown";
// import {
//   ChevronDownOutline,
//   LockClosedOutline,
//   User,
//   UserCircle,
// } from "heroicons-react";
// import { ChevronDownOutline, LockClosedOutline, User } from "";
// }

async function Navbar() {
  //   console.log(auth.user);

  return (
    <header className="w-full top-0  z-50  flex fixed justify-between h-10 text-[#fffb00] bg-[#0d0d0d]">
      {/* <Image className="w-8 h-8 rounded-full" src={profilePic} alt="logo" /> */}
      <Link
        href={"/"}
        style={{ fontFamily: "Lucida Handwriting" }}
        className="p-2  cursor-pointer"
      >
        MR_YOU
      </Link>
      <UserInfo />
    </header>
  );
}
export default Navbar;
