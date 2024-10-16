import axiosInstance from "@/app/axiosInstance/axiosInctance";
import { cookies } from "next/headers";

export async function POST(request) {
  const { email, password } = await request.json();
  console.log("request", request);

  try {
    const response = await axiosInstance.post("/account/sessions/email", {
      email,
      password,
    });

    if (response.headers["set-cookie"]) {
      cookies().set("whoAmI", response.headers["set-cookie"][0]);
    }

    return new Response(JSON.stringify({ message: "Login successful" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error logging in:", error);
    if (error)
      return new Response(JSON.stringify({ error: "Invalid credentials" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
  }
}
