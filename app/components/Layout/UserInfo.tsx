"use client";
import { useStore } from "@/app/store/store";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { GiBrutalHelm } from "react-icons/gi";
import { HiChevronDown, HiOutlineUser } from "react-icons/hi";
import { useClickAwayListener } from "../useClickAwayListener";
import { HiArrowLeftStartOnRectangle } from "react-icons/hi2";

type Props = {
  data?: any;
  auth: any;
};

function UserInfo(props: Props) {
  const { data, auth } = props;
  const pathname = usePathname();
  const { reset } = useStore();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleClickAway = () => {
    if (isOpen) setIsOpen(false);
  };
  const withClickAwayListener = useClickAwayListener(handleClickAway);
  return data ? (
    withClickAwayListener(
      <div className="relative z-50 ml-2 sm:ml-5 md:ml-5 lg:ml-5 xs:ml-5">
        <span
          onClick={() => setIsOpen(!isOpen)}
          className="flex border-[#fffb00] items-center border-2 rounded-lg p-1 mt-1.5 cursor-pointer transition-transform duration-300"
        >
          <HiChevronDown
            className={`w-5 h-5 transform transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
          <HiOutlineUser className="w-5 h-5" />
        </span>

        <div
          className={`absolute text-black py-2  ml-2 top-12 left-0 w-52  bg-white shadow-lg rounded-lg border transition-all duration-500 transform ${
            isOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-4 pointer-events-none"
          }`}
        >
          <div className="relative p-1 w-full">
            <span className="">نام کاربری: </span>
            {data && <span>{data?.name}</span>}
          </div>
          <button
            type="button"
            onClick={async () => {
              await auth();
              await reset();
            }}
            className="p-1 items-center  gap-x-1 flex"
          >
            <HiArrowLeftStartOnRectangle />

            <span>خروج</span>
          </button>
        </div>
      </div>
    )
  ) : (
    <div className="flex     items-center rounded-lg ml-3">
      {pathname !== "/signUp" && pathname !== "/login" ? (
        <div className="flex">
          <GiBrutalHelm className="w-8 h-8 px-1" />

          <Link
            className="border-l-2 font-normal text-lg -py-3 pl-1  border-gladiatorYellow"
            href={"/login"}
          >
            ورود
          </Link>
          <Link
            className=" pr-1 mt-1 font-normal text-lg -py-3   border-gladiatorYellow"
            href={"/signUp"}
          >
            ثبت نام
          </Link>
        </div>
      ) : null}
    </div>
  );
}

export default UserInfo;
