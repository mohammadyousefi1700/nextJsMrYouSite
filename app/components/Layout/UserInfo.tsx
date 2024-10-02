"use client";
import axiosInstance from "@/app/axiosInstance/axiosInctance";
import { useState } from "react";
import { HiChevronDown, HiOutlineUser } from "react-icons/hi";

type Props = {
  data: any;
};

function UserInfo(props: Props) {
  const { data } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const LogOut = async () => {
    try {
      await axiosInstance.delete(`/account/sessions/${data.$id}`);
    } catch (error) {
      console.error("Error during logout", error);
    }
  };
  return (
    <div className="relative">
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
          <span>{data.name}</span>
        </div>
        <button onClick={() => LogOut()} className="p-1">
          خروج
        </button>
      </div>
    </div>
  );
}

export default UserInfo;
