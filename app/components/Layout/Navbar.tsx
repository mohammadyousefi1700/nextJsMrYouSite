import Link from "next/link";
import UserInfo from "./UserInfo";
import { cookies } from "next/headers";
import axiosInstance from "@/app/axiosInstance/axiosInctance";
import dynamic from "next/dynamic";

async function Navbar() {
  const auth = cookies().get("whoAmI");
  const ShoppingIcons = dynamic(() => import("./ShoppingIcons"), {
    ssr: false,
  });
  const authenticated = axiosInstance.get("/account", {
    headers: {
      Cookie: auth.value,
    },
  });

  return (
    <header className="w-full top-0  z-50  flex fixed justify-between h-10 text-[#fffb00] bg-[#0d0d0d]">
      <Link
        href={"/"}
        style={{ fontFamily: "Lucida Handwriting" }}
        className="p-2  cursor-pointer"
      >
        MR_YOU
      </Link>
      <div className=" flex gap-x-3 justify-center">
        <ShoppingIcons />

        <UserInfo data={(await authenticated).data} />
      </div>
    </header>
  );
}
export default Navbar;
