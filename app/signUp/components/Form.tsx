"use client";
import Image from "next/image";
import Logo from "../../../public/logo.png";
const FormSignUp = ({ createSessionClient }: { createSessionClient: any }) => {
  return (
    <form
      onSubmit={createSessionClient}
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
  );
};

export default FormSignUp;
