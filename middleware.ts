// import { NextRequest, NextResponse } from "next/server";

// export default async function middleware(request: NextRequest) {
//   const user = request.cookies.get("whoAmI");
//   if (!user && request.nextUrl.pathname.startsWith("/dashboard")) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   if (user && request.nextUrl.pathname.startsWith("/login")) {
//     return NextResponse.redirect(new URL("/", request.url));
//   }

//   if (user && request.nextUrl.pathname.startsWith("/signUp")) {
//     return NextResponse.redirect(new URL("/", request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/dashboard/:path*", "/dashboard", "/login", "/signUp"],
// };
/////////////////////////////////////////////////////
import { createProxyMiddleware } from "http-proxy-middleware";
import { NextRequest, NextResponse } from "next/server";

// تنظیمات پروکسی
const proxy = createProxyMiddleware({
  target: "http://10.202.10.202", // آدرس IP مقصد
  changeOrigin: true,
  pathRewrite: {
    "^/proxy": "", // حذف `/proxy` از URL
  },
  onProxyReq: (proxyReq, req, res) => {
    // اضافه کردن هدرهای مورد نیاز
    proxyReq.setHeader(
      "X-Appwrite-Project",
      process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID
    );
    proxyReq.setHeader("X-Appwrite-Key", process.env.NEXT_PUBLIC_APPWRITE_KEY);
  },
});

// تابع middleware
export default async function middleware(request: NextRequest) {
  const user = request.cookies.get("whoAmI");

  if (!user && request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (user && request.nextUrl.pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (user && request.nextUrl.pathname.startsWith("/signUp")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // استفاده از پروکسی
  const response = NextResponse.next();

  // استفاده از پروکسی
  await new Promise((resolve, reject) => {
    proxy(request, response, (err) => {
      if (err) {
        console.error("Proxy error:", err);
        return reject(err);
      }
      resolve(response);
    });
  });

  return response;
}

export const config = {
  matcher: ["/dashboard/:path*", "/dashboard", "/login", "/signUp"],
};
