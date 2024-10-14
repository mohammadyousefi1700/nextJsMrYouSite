import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import axiosInstance from "./axiosInstance/axiosInctance";

const auth = {
  user: undefined,
  sessionCookie: undefined,

  getUser: async () => {
    // گرفتن کوکی session
    const sessionCookie = cookies().get("whoAmI");
    if (!sessionCookie) {
      auth.user = null; // اگر کوکی وجود نداشت، کاربر را null قرار می‌دهیم
      return null; // در اینجا خروجی null است
    }

    auth.sessionCookie = sessionCookie;

    try {
      const response = await axiosInstance.get("/account", {
        headers: {
          Cookie: auth.sessionCookie.value,
        },
      });
      console.log(response);
      console.log("auth.user", auth.user);

      // بررسی نتیجه و ست کردن کاربر
      if (response) {
        auth.user = await axiosInstance
          .get("/account", {
            headers: {
              Cookie: auth.sessionCookie.value,
            },
          })
          .then((res) => res.data); // اگر داده‌ای دریافت کردیم، auth.user را به آن مقداردهی می‌کنیم
      } else {
        auth.user = null; // اگر داده‌ای وجود نداشت، کاربر را null قرار می‌دهیم
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      auth.user = null; // در صورت بروز خطا، کاربر را null قرار می‌دهیم
    }

    return auth.user; // در اینجا، کاربر برمی‌گردد
  },

  createSessionClient: async function (formData) {
    "use server";
    const data = Object.fromEntries(formData);
    const { email, password } = data;

    try {
      const response = await axiosInstance.post("/account/sessions/email", {
        email,
        password,
      });

      if (response.headers["set-cookie"]) {
        // تنظیم کوکی
        cookies().set("whoAmI", response.headers["set-cookie"][0]);
      }

      // بعد از ساختن session هدایت به صفحه اصلی
      redirect("/");
    } catch (err) {
      console.error("Error creating session:", err);
    }
  },

  deleteSession: async () => {
    "use server";
    auth.sessionCookie = cookies().get("whoAmI");

    try {
      if (auth.sessionCookie) {
        await axiosInstance.delete("/account/sessions/current", {
          headers: {
            Cookie: auth.sessionCookie.value,
          },
        });
      }
    } catch (error) {
      console.error("Error deleting session:", error);
    }

    // پاک کردن کوکی و هدایت به صفحه لاگین
    cookies().delete("whoAmI");
    auth.user = null;
    auth.sessionCookie = null;
    redirect("/login");
  },
};

export default auth;
