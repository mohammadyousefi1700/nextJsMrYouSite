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
      {/* <MenuDropDown
        classNameMenuButton="w-fit h-10 rounded-full"
        Option={
          <p className="flex items-center mr-auto">
            <UserCircle onPointerEnterCapture={{}} onPointerLeaveCapture={{}} />
            <ChevronDownOutline
              className="w-4 pt-2 text-white"
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            />
          </p>
        }
        menuItems={
          <div className="flex flex-col items-start p-2 pr-4 text-sm font-medium gap-y-3 w-36 ">
            <div className="">نام کاربری : {} </div>
            <form action={auth.deleteSession}>
              <button type="submit">
                <LockClosedOutline
                  onPointerEnterCapture={{}}
                  onPointerLeaveCapture={{}}
                  className="w-5 h-5 "
                />
                خروج
              </button>
            </form>
          </div>
        }
      /> */}
    </header>
  );
}
export default Navbar;
