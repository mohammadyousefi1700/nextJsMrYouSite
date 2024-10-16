import axiosInstance from "@/app/axiosInstance/axiosInctance";
import { ID } from "appwrite";
import { cookies } from "next/headers";

export async function POST(request) {
  const { email, password, name } = await request.json();
  try {
    const response = await axiosInstance.post("/account", {
      userId: ID.unique(),
      email,
      password,
      name,
    });

    if (response.status === 201) {
      const loginResponse = await axiosInstance.post(
        "/account/sessions/email",
        {
          email,
          password,
        }
      );

      const setCookieHeader = loginResponse.headers["set-cookie"];
      if (setCookieHeader) {
        cookies().set("whoAmI", setCookieHeader[0]);
      }
    }

    if (response.headers["set-cookie"]) {
      cookies().set("whoAmI", response.headers["set-cookie"][0]);
    }

    return new Response(JSON.stringify({ message: "Login successful" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    // console.error("Error logging in:", error);
    console.log("error.message", error.message);

    return new Response(JSON.stringify({ error: error.message }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }
}
