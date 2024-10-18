"use client";
import { useStore } from "@/app/store/store";
import React from "react";

function AddAddressCustomer() {
  const { location, addLocation } = useStore();

  return (
    <div className="flex xs:mx-auto xs:w-[350px] mt-11 xl:w-[900px] mb-36 flex-col sm:mx-auto lg:w-[600px] gap-y-4 md:w-[600px] sm:w-[400px] xs:mt-20 sm:flex-col md:flex-col border-2 xs:flex-col rounded-lg h-full py-4 px-4 shadow-xl bg-white">
      <span className="font-sans font-medium text-lg">
        <span className="text-red-600">*</span>آدرس:
      </span>
      <textarea
        value={location || undefined}
        onChange={(e) => {
          e.target.setCustomValidity("");
          addLocation(e.target.value);
        }}
        onInvalid={(e) => {
          e.preventDefault();
          const target = e.target as HTMLTextAreaElement;
          target.setCustomValidity("لطفاً این فیلد را پر کنید.");
        }}
        required
        placeholder="لطفا محل تحویل بار را مشخص کنید"
        className="w-full pr-1 indent-3 h-52 xs:px-5 xs:w-80 resize-none outline-none rounded-lg border-[3px] bg-white"
      />
    </div>
  );
}

export default AddAddressCustomer;
