import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(request: NextRequest) {
  const user = cookies().get("whoAmI");
  //   if(!user.value||)
  //   console.log(user);
  console.log("request", request.url.startsWith("/dashboard"));

  return NextResponse.next();
}
export const config = {
  matcher: ["/dashboard/:path*"],
};
