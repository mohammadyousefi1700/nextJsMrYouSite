import Link from "next/link";
import UserInfo from "./UserInfo";
import dynamic from "next/dynamic";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import auth from "@/app/auth";

async function Navbar() {
  const ShoppingIcons = dynamic(() => import("./ShoppingIcons"), {
    ssr: false,
  });

  const user = await auth.getUser();
  console.log("user", await user);

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
        {(await user) && <ShoppingIcons />}
        <UserInfo
          auth={deleteCookie}
          data={user !== null ? await user.data : null}
        />{" "}
      </div>
    </header>
  );
}
export default Navbar;
