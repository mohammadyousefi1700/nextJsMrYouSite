"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "../../public/logo.png";
export type CreateSessionClientType = (formData: FormData) => Promise<void>;

function FormData({
  createSessionClient,
}: {
  createSessionClient: CreateSessionClientType;
}) {
  return (
    <>
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
        className="border-yellow-500 hover:text-yellow-100 hover:border-yellow-100 text-yellow-400 p-2 rounded-lg border-2"
        type="submit"
      >
        ورود
      </button>
      <Link
        className=" text-yellow-400  hover:text-yellow-100"
        href={"/signUp"}
      >
        ثبت نام
      </Link>
    </>
  );
}

export default FormData;
