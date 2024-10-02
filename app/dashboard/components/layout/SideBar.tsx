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
        `fixed  top-0 mt-[40px]  right-0 z-[1000] flex flex-col bg-gray-700 [height:calc(100vh-20px)] ease-in-out  transition-all text-xs duration-300`,
        isDrag ? "w-[252px] " : "w-[60px]"
      )}
    >
      <HiChevronDoubleLeft
        onClick={() => setIsDrag((state) => !state)}
        className={clsx(
          `absolute w-[19px]  transform transition-transform duration-300 cursor-pointer -left-3 bg-slate-300 rounded-md top-3 h-[19px]`,
          isDrag ? "rotate-180" : ""
        )}
      />

      {sidebarLink.map((item) => (
        <Link
          key={item.path}
          className={clsx(
            item.path.length === 0 ? "!p-0" : "",
            "flex  mt-2 items-center hover:transition-all mx-2 hover:duration-300  hover:rounded-md active:text-white hover:p-2 hover:text-white hover:bg-[rgba(255,255,255,0.10)]  gap-2   text-sm font-normal text-center text-slate-400",
            isDrag === false ? "justify-center" : "",
            pathname === item.path &&
              "!text-white bg-[rgba(255,255,255,0.10)] p-2 rounded-md"
          )}
          href={item.path}
        >
          {item.icons}
          {isDrag ? item.title : null}
        </Link>
      ))}
    </div>
  );
}

export default SideBar;
