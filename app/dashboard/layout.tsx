// import type { Metadata } from "next";
// import "./globals.css";

// export const metadata: Metadata = {
//   icons: "../public/logo.png",
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

import React from "react";

export default function RootLayoutDashboard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full  h-screen">
      <div className="w-16 bg-red-700 "></div>
      <main>{children}</main>
    </div>
  );
}
