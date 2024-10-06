import Link from "next/link";
import UserInfo from "./UserInfo";
import { cookies } from "next/headers";
import axiosInstance from "@/app/axiosInstance/axiosInctance";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";

async function Navbar() {
  const auth = cookies().get("whoAmI");
  const ShoppingIcons = dynamic(() => import("./ShoppingIcons"), {
    ssr: false,
  });

  const authenticated = auth
    ? axiosInstance.get("/account", {
        headers: {
          Cookie: auth.value,
        },
      })
    : null;
  async function deleteCookie() {
    "use server";
    const handle = async () => {
      return await cookies().delete("whoAmI");
    };
    return handle().then(() => redirect("/login"));
  }

  return (
    <header className="w-full top-0  z-[1000] flex fixed justify-between h-10 text-[#fffb00] bg-[#0d0d0d]">
      <Link
        href={"/"}
        style={{ fontFamily: "Lucida Handwriting" }}
        className="p-2  cursor-pointer"
      >
        MR_YOU
      </Link>
      <div className=" flex gap-x-3 justify-center">
        {auth && <ShoppingIcons />}
        <UserInfo
          auth={deleteCookie}
          data={auth ? (await authenticated).data : null}
        />{" "}
      </div>
    </header>
  );
}
export default Navbar;
