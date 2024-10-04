"use client";

import clsx from "clsx";
import Link from "next/link";
import React, { useState } from "react";
import { HiChevronDoubleLeft } from "react-icons/hi";
import { sidebarLink } from "./sidebarLink";
import { usePathname } from "next/navigation";

function SideBar() {
  const [isDrag, setIsDrag] = useState<boolean>(false);
  const pathname = usePathname();

  return (
    <div
      className={clsx(
        `fixed sm:w-full sm:z-50 xs:z-50 xs:w-full sm:h-10 xs:h-10 top-0 md:z-[1000] xl:z-[1000] lg:z-[1000] flex flex-col bg-gray-700 transition-all duration-300 ease-in-out`,
        isDrag
          ? "xl:w-[252px] xl:h-[calc(100vh-20px)] xs:h-[200px]  sm:h-[200px] md:w-[252px] md:h-[calc(100vh-20px)] lg:w-[252px] lg:h-[calc(100vh-20px)]"
          : "w-[60px] h-[calc(100vh-20px)]",
        "mt-[40px] right-0 sm:h-10 xs:h-10"
      )}
    >
      {/* فلش تغییر سایز */}
      <HiChevronDoubleLeft
        onClick={() => setIsDrag((state) => !state)}
        className={clsx(
          `xs:mt-7 sm:mt-6 xs:duration-700 sm:duration-300  xs:right-56   sm:right-56    absolute w-[19px] transform transition-transform duration-300 cursor-pointer md:-left-3 lg:-left-3 xl:-left-3 bg-slate-300 rounded-md top-3 h-[19px]`,
          isDrag
            ? "rotate-180 sm:-rotate-90 sm:translate-y-40 sm:mt-6 xs:-rotate-90 xs:translate-y-40 "
            : "xs:translate-y-0 sm:rotate-90 sm:translate-y-0 xs:rotate-90"
        )}
      />
      <p
        className={`mx-auto text-xl font-bold text-white xl:hidden lg:hidden md:hidden ${
          isDrag && "hidden"
        }`}
      >
        داشبورد مدیریتی
      </p>
      {sidebarLink.map((item) => (
        <Link
          key={item.path}
          className={clsx(
            "flex mt-2 items-center  hover:transition-all mx-2 hover:duration-300 hover:rounded-md active:text-white hover:p-2 hover:text-white hover:bg-[rgba(255,255,255,0.10)] gap-2 text-sm font-normal text-center text-slate-400",
            isDrag === false
              ? "justify-center xs:visible sm:visible"
              : "xs:visible sm:visible",
            pathname === item.path &&
              "!text-white  bg-[rgba(255,255,255,0.10)] p-2 rounded-md"
          )}
          href={item.path}
        >
          <div className={`flex ${!isDrag ? "sm:hidden xs:hidden " : ""}`}>
            {" "}
            {item.icons}
            {isDrag ? item.title : null}
          </div>
        </Link>
      ))}
    </div>
  );
}

export default SideBar;
