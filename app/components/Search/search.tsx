// "use client";

// import { useRouter } from "next/navigation";
// import { SetStateAction, useEffect, useState } from "react";
// import { useDebounce } from "use-debounce";

// function Search() {
//   const route = useRouter();

//   const [text, setText] = useState<SetStateAction<string>>("");
//   const [query] = useDebounce(text, 500);

//   useEffect(() => {
//     route.push(query.length > 1 ? `/product?search=${query}` : "");
//     // route.push(`/SearchProduct?=${query}`);
//   }, [query, route]);
//   return (
//     <div className="w-full justify-center  flex">
//       <input
//         type="text"
//         value={text as any}
//         onChange={(e) => setText(e.target.value)}
//         className="w-60 h-10 bg-slate-500"
//       />
//     </div>
//   );
// }

// export default Search;
////////////////////////////////////////
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

function Search() {
  const router = useRouter(); // برای ریدایرکت کردن به صفحه نتایج جستجو
  const [text, setText] = useState<string>("");
  const [query] = useDebounce(text, 500); // استفاده از Debounce برای کاهش تعداد درخواست‌ها

  useEffect(() => {
    // اگر query وجود داشته باشد به صفحه‌ی جستجو می‌رود، در غیر اینصورت به صفحه اصلی
    router.push(query.length > 1 ? `/search?query=${query}` : "/");
  }, [query, router]);

  return (
    <div className="w-full flex justify-center my-5">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)} // دریافت ورودی کاربر
        placeholder="جستجو..."
        className="w-60 h-10 px-3 bg-gray-100 border border-gray-300 rounded"
      />
    </div>
  );
}

export default Search;
