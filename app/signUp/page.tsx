import { Metadata } from "next";
import axiosInstance from "../axiosInstance/axiosInctance";
import { cookies } from "next/headers";
import Image from "next/image";
import Logo from "../../public/logo.png";
import { Client, Account, ID } from "appwrite";

export const metadata: Metadata = {
  title: "صحفه ثبت نام",
  description: "Generated by create next app",
};
export default function signUpPage() {
  async function createSessionClient(formData) {
    "use server";
    const data = Object.fromEntries(formData);
    const { email, password, username } = data;
    console.log(email, password, username);

    await axiosInstance
      .post("/account", {
        // userId: ID.unique(),
        ID,
        email,
        password,
        username,
      })
      .then((response) => {
        console.log(response);

        // cookies().set("whoAmI", response.headers["set-cookie"][0]);
      });
  }

  return (
    <div className="w-full flex flex-col bg-slate-900 p-2 justify-center  items-center !h-screen text-center align-bottom">
      <form
        action={createSessionClient}
        className="flex rounded-lg text-white  flex-col shadow-[0_4px_8px_0px_rgba(0,0,0,0.2),0_6px_20px_0_rgba(0,0,0,0.19)] items-center  w-full max-w-[30rem] min-w-[10rem] bg-slate-700 p-3 gap-y-5"
      >
        <Image
          src={Logo}
          draggable={false}
          width={200}
          height={200}
          className="object-cover inline-block"
          alt="logo"
        />
        <input
          className=" border-r-2 h-8 border-b-2 border-t-0 rounded-lg border-l-0 w-full focus:border-yellow-400 outline-none shadow-2xl  max-w-[30rem] min-w-[10rem] bg-slate-700"
          autoComplete="off"
          type="text"
          name="username"
          placeholder=" نام خود را وارد کنید..."
          required
        />
        <input
          className=" border-r-2 h-8 border-b-2 border-t-0 rounded-lg border-l-0 w-full focus:border-yellow-400 outline-none shadow-2xl  max-w-[30rem] min-w-[10rem] bg-slate-700"
          autoComplete="off"
          type="email"
          name="email"
          placeholder=" ایمیل خود را وارد کنید..."
          required
        />
        <input
          className=" border-r-2 h-8 border-b-2 border-t-0 rounded-lg border-l-0 w-full focus:border-yellow-400 outline-none shadow-2xl  max-w-[30rem] min-w-[10rem] bg-slate-700"
          autoComplete="off"
          type="password"
          name="password"
          placeholder="رمز ورود"
          required
        />
        <button
          className="border-yellow-500 text-yellow-400 p-2 rounded-lg border-2"
          type="submit"
        >
          ثبت نام
        </button>
      </form>
    </div>
  );
}
