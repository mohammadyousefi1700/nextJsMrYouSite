import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import axiosInstance from "./axiosInstance/axiosInctance";

const auth = {
  getUser: async () => {
    const sessionCookie = cookies().get("whoAmI");
    if (!sessionCookie) {
      return null;
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
};

export default auth;
