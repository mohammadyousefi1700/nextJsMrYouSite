"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { GiMagnifyingGlass } from "react-icons/gi";
import { useDebounce } from "use-debounce";

function Search() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [text, setText] = useState<string>("");
  const [isFocused, setIsFocused] = useState(false);

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
    <div
      tabIndex={0}
      onFocus={() => setIsFocused(!isFocused)}
      onBlur={() => setIsFocused(!isFocused)}
      className={`border-2  py-2   rounded-lg   w-full  outline-none shadow-2xl mx-auto  max-w-[30rem] min-w-[10rem] bg-white mt-20 flex my-5 ${
        isFocused
          ? " border-b-yellow-400 border-r-yellow-400 border-t-white border-l-white shadow-2xl"
          : "border-gray-300"
      }`}
    >
      <GiMagnifyingGlass className="w-8 h-8 pr-1 pl-1 text-gray-500" />
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="جستجو..."
        className="w-full outline-none hover:outline-none rounded-lg"
        // className="w-60 h-10 px-3 bg-gray-100 border border-gray-300 rounded"
      />
    </div>
  );
}

export default Search;
