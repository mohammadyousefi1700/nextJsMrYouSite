"use client";
import axiosInstance from "@/app/axiosInstance/axiosInctance";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { GiBrutalHelm } from "react-icons/gi";
import { HiChevronDown, HiOutlineUser } from "react-icons/hi";

type Props = {
  data?: any;
};

function UserInfo(props: Props) {
  const { data } = props;
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const LogOut = async () => {
    try {
      await axiosInstance.delete(`/account/sessions/${data.$id}`);
    } catch (error) {
      console.error("Error during logout", error);
    }
  };
  if (data) {
    return (
      <div className="relative ml-2 sm:ml-5 md:ml-5 lg:ml-5 xs:ml-5">
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
          className={`absolute text-black  ml-2 top-12 left-0 w-40  bg-white shadow-lg rounded-lg border transition-all duration-500 transform ${
            isOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-4 pointer-events-none"
          }`}
        >
          <div className="relative p-1 ">
            <span className="">نام کاربری: </span>
            <span>{data?.name}</span>
          </div>
          <button onClick={() => LogOut()} className="p-1">
            خروج
          </button>
        </div>
      </div>
    );
  } else if (pathname !== "/signUp" && pathname !== "/login") {
    return (
      <div className="flex     items-center rounded-lg ml-3">
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
    );
  }
}

export default UserInfo;
