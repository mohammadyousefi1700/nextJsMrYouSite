"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

function Search() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [text, setText] = useState<string>("");

  const [query] = useDebounce(text, 1000);
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );
  useEffect(() => {
    const newQueryString = `${createQueryString("query", query)}`;
    router.push(pathname + "?" + newQueryString);
  }, [router, query, pathname, createQueryString]);

  return (
    <div className="w-full flex justify-center my-5">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="جستجو..."
        // className="w-60 h-10 px-3 bg-gray-100 border border-gray-300 rounded"
        className=" border-2 h-8  rounded-lg  w-full focus:border-yellow-400 outline-none shadow-2xl  max-w-[30rem] min-w-[10rem] bg-white"
      />
    </div>
  );
}

export default Search;
