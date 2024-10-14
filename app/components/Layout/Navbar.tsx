import Link from "next/link";
import UserInfo from "./UserInfo";
import dynamic from "next/dynamic";
import { cookies } from "next/headers";
import axiosInstance from "@/app/axiosInstance/axiosInctance";
import { redirect } from "next/navigation";
import auth from "@/app/auth";

async function Navbar() {
  const ShoppingIcons = dynamic(() => import("./ShoppingIcons"), {
    ssr: false,
  });
  // const auth = await cookies().get("whoAmI");

  // const authenticated = auth
  //   ? axiosInstance.get("/account", {
  //       headers: {
  //         Cookie: auth.value,
  //       },
  //     })
  //   : null;

  // console.log("auth.user", auth.user);
  const user = auth;
  console.log("user", user);

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
        {/* {(await auth) && <ShoppingIcons />} */}
        <UserInfo
          auth={deleteCookie}
          // data={auth ? (await authenticated).data : null}
        />{" "}
      </div>
    </header>
  );
}
export default Navbar;
