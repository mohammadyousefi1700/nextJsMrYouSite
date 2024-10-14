"use client";
import { useState } from "react";
import Image from "next/image";
// import Logo from "../../public/logo.png";
import Logo from "../../../public/logo.png";
export default function LoginPage() {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault(); // جلوگیری از ارسال پیش‌فرض فرم

    try {
      const response = await fetch("/api/login", {
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

      setError(""); // پاک کردن خطا در صورت موفقیت
      window.location.href = "/"; // هدایت به صفحه اصلی
    } catch (error) {
      setError(error.message); // تنظیم پیام خطا
    }
  };

  return (
    <div className="w-full flex flex-col bg-slate-900 p-2 justify-center items-center !h-screen text-center align-bottom">
      <form
        onSubmit={handleSubmit}
        className="flex rounded-lg flex-col shadow-[0_4px_8px_0px_rgba(0,0,0,0.2),0_6px_20px_0_rgba(0,0,0,0.19)] items-center w-full max-w-[30rem] min-w-[10rem] bg-slate-700 p-3 gap-y-5"
      >
        <Image
          src={Logo}
          draggable={false}
          width={200}
          height={200}
          className="object-cover inline-block"
          alt="logo"
        />
        {error && <div className="text-red-500">{error}</div>}{" "}
        {/* نمایش پیام خطا */}
        <input
          className="border-r-2 h-8 border-b-2 border-t-0 rounded-lg border-l-0 w-full focus:border-yellow-400 outline-none shadow-2xl max-w-[30rem] min-w-[10rem] bg-slate-700"
          autoComplete="off"
          type="email"
          name="email"
          placeholder="ایمیل خود را وارد کنید..."
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)} // مدیریت ایمیل
        />
        <input
          className="border-r-2 h-8 border-b-2 border-t-0 rounded-lg border-l-0 w-full focus:border-yellow-400 outline-none shadow-2xl max-w-[30rem] min-w-[10rem] bg-slate-700"
          autoComplete="off"
          type="password"
          name="password"
          placeholder="رمز ورود"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)} // مدیریت پسورد
        />
        <button
          className="border-yellow-500 hover:text-yellow-100 hover:border-yellow-100 text-yellow-400 p-2 rounded-lg border-2"
          type="submit"
        >
          ورود
        </button>
      </form>
    </div>
  );
}
