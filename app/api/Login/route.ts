"use server";

import axiosInstance from "@/app/axiosInstance/axiosInctance";
import { cookies } from "next/headers";

export default async function createSessionClient(data) {
  const { email, password } = data; // دریافت داده‌های فرم

  try {
    const response = await axiosInstance.post("/account/sessions/email", {
      email,
      password,
    });

    // ذخیره کوکی‌ها
    cookies().set("whoAmI", response.headers["set-cookie"][0]);
  } catch (error) {
    console.error("Error creating session:", error);
  }
}
