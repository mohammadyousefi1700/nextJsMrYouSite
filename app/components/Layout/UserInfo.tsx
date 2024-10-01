"use client";
import { useState } from "react";
import { HiChevronDown, HiOutlineUser } from "react-icons/hi";
import React from "react";

function UserInfo() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div>
      <span
        onClick={() => setIsOpen(!isOpen)}
        className="flex border-2 rounded-lg cursor-pointer mt-1.5"
      >
        <HiChevronDown className="w-6 h-6 -ml-2 " />

        <HiOutlineUser className="w-6 h-6 " />
      </span>
      {isOpen ? (
        <>
          <div className="w-32 shadow-lg shadow-yellow-200 absolute mt-2 top-[34px] tran rounded-lg left-0 ml-1 h-6 bg-[#FFFFFF] border "></div>
        </>
      ) : null}{" "}
      {/* {" "}
      <MenuDropDown
        classNameMenuButton="w-fit h-10 rounded-full"
        Option={
          <p className="flex items-center mr-auto">
            <UserCircle onPointerEnterCapture={{}} onPointerLeaveCapture={{}} />
            <ChevronDownOutline
              className="w-4 pt-2 text-white"
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            />
          </p>
        }
        menuItems={
          <div className="flex flex-col items-start p-2 pr-4 text-sm font-medium gap-y-3 w-36 ">
            <div className="">نام کاربری : {} </div>
            <form action={auth.deleteSession}>
              <button type="submit">
                <LockClosedOutline
                  onPointerEnterCapture={{}}
                  onPointerLeaveCapture={{}}
                  className="w-5 h-5 "
                />
                خروج
              </button>
            </form>
          </div>
        }
      /> */}
    </div>
  );
}

export default UserInfo;
