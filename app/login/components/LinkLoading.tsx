"use client";

import React from "react";

function LinkLoading({ isLoading }: { isLoading: boolean }) {
  console.log("data", isLoading);

  return (
    <button
      className="border-yellow-500 hover:text-yellow-100 hover:border-yellow-100 text-yellow-400 p-2 rounded-lg border-2"
      type="submit"
    >
      ورود
    </button>
  );
}

export default LinkLoading;
