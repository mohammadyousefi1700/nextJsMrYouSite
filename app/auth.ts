import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import axiosInstance from "./axiosInstance/axiosInctance";

const auth = {
  getUser: async () => {
    // گرفتن کوکی session
    const sessionCookie = cookies().get("whoAmI");
    if (!sessionCookie) {
      return null; // در اینجا خروجی null است
    }

    try {
      const response = await axiosInstance.get("/account", {
        headers: {
          Cookie: sessionCookie.value,
        },
      });
      return response;
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  },

  // createSessionClient: async function (formData) {
  //   "use server";
  //   const data = await Object.fromEntries(formData);
  //   const { email, password } = await data;

  //   try {
  //     const response = await axiosInstance.post("/account/sessions/email", {
  //       email,
  //       password,
  //     });

  //     if (response.headers["set-cookie"]) {
  //       // تنظیم کوکی
  //       cookies().set("whoAmI", response.headers["set-cookie"][0]);
  //     }

  //     // بعد از ساختن session هدایت به صفحه اصلی
  //     redirect("/");
  //   } catch (err) {
  //     console.error("Error creating session:", err);
  //   }
  // },

  deleteSession: async () => {
    "use server";
    const authUserLogOut = cookies().get("whoAmI");

    try {
      if (authUserLogOut) {
        await axiosInstance.delete("/account/sessions/current", {
          headers: {
            Cookie: authUserLogOut.value,
          },
        });
      }
    } catch (error) {
      console.error("Error deleting session:", error);
    }

    // پاک کردن کوکی و هدایت به صفحه لاگین
    cookies().delete("whoAmI");
    authUserLogOut.value = null;
    redirect("/login");
  },
};

export default auth;
