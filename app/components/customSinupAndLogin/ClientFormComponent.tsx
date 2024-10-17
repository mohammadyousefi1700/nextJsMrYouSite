"use client";
import { useState } from "react";
import Image from "next/image";
import Logo from "../../../public/logo.png";
import { GoAlertFill } from "react-icons/go";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ClientPageComponent() {
  const [errormessage, setErrorMassage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const pathName = usePathname();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (pathName === "/login") {
        const response = await fetch("/api/Login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
          const { error } = await response.json();
          throw new Error(error);
        }
      } else if (pathName === "/signUp") {
        const response = await fetch("/api/SignUp", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        });

        if (!response.ok) {
          const { error } = await response.json();
          throw new Error(error);
        }
      }
      setErrorMassage("");
      window.location.href = "/";
    } catch (error) {
      setErrorMassage(error.message);
      console.log(error);
    }
  };

  return (
    <div className="w-full flex flex-col bg-slate-900 p-2 justify-center  items-center !h-screen text-center ">
      <form
        onSubmit={handleSubmit}
        className="flex rounded-lg  flex-col shadow-[0_4px_8px_0px_rgba(0,0,0,0.2),0_6px_20px_0_rgba(0,0,0,0.19)] items-center  w-full max-w-[30rem] min-w-[10rem] bg-slate-700 p-3 gap-y-5"
      >
        <Image
          src={Logo}
          draggable={false}
          width={200}
          height={200}
          className="object-cover inline-block"
          alt="logo"
        />
        {errormessage && (
          <div className="flex font-sans text-base items-center gap-x-2 text-red-500">
            <GoAlertFill />
            {errormessage && "ورود نامعتبر , لطفا پسورد و ایمیل خود را چک کنید"}
            <GoAlertFill />
          </div>
        )}{" "}
        {pathName === "/signUp" && (
          <input
            className=" border-r-2 tex text-white placeholder:font-sans px-2 h-8 border-b-2 border-t-0 rounded-lg border-l-0 w-full focus:border-yellow-400 outline-none shadow-2xl  max-w-[30rem] min-w-[10rem] bg-slate-700"
            autoComplete="off"
            type="text"
            name="name"
            placeholder=" نام خود را وارد کنید..."
            required
            onChange={(e) => setName(e.target.value)}
          />
        )}
        <input
          className=" border-r-2 h-8 pla border-b-2 px-2 placeholder:font-sans text-white border-t-0 rounded-lg border-l-0 w-full focus:border-yellow-400 outline-none shadow-2xl  max-w-[30rem] min-w-[10rem] bg-slate-700"
          autoComplete="off"
          type="email"
          name="email"
          placeholder=" ایمیل خود را وارد کنید..."
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className=" border-r-2 placeholder:font-sans px-2 text-white h-8 border-b-2 border-t-0 rounded-lg border-l-0 w-full focus:border-yellow-400 outline-none shadow-2xl  max-w-[30rem] min-w-[10rem] bg-slate-700"
          autoComplete="off"
          type="password"
          name="password"
          placeholder="رمز ورود"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="border-yellow-500  text-center items-center pb-2 px-3 font-sans text-yellow-400   rounded-lg border-2"
          type="submit"
        >
          ورود
        </button>
        {pathName === "/login" ? (
          <Link
            className=" text-yellow-400  text-base font-sans  hover:text-yellow-100"
            href={"/signUp"}
          >
            ثبت نام
          </Link>
        ) : (
          <Link
            className=" text-yellow-400 text-base font-sans  hover:text-yellow-100"
            href={"/login"}
          >
            حساب دارم
          </Link>
        )}{" "}
      </form>
    </div>
  );
}
