// async function fetchUserData() {
//   const { account } = await AuthAppwriteClient();
//   //   console.log(
//   //     "accountsssssssss",
//   //     account.getSession().then((res) => console.log(res))
//   //   );

import Link from "next/link";
import UserInfo from "./UserInfo";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { cookies } from "next/headers";
import axiosInstance from "@/app/axiosInstance/axiosInctance";
import ShoppingIcons from "./ShoppingIcons";
import dynamic from "next/dynamic";
// import { useStore } from "@/app/store/store";

async function Navbar() {
  //   console.log(auth.user);
  const auth = cookies().get("whoAmI");
  // const { getProductId } = useStore();
  const ShoppingIcons = dynamic(() => import("./ShoppingIcons"), {
    ssr: false,
  });
  const authenticated = axiosInstance.get("/account", {
    headers: {
      Cookie: auth.value,
    },
  });
  console.log((await authenticated).data);

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
      <div className=" flex gap-x-3 justify-center">
        <ShoppingIcons />

        <UserInfo data={(await authenticated).data} />
      </div>
    </header>
  );
}
export default Navbar;
