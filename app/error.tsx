"use client";

type ErrorProps = {
  error: Error;
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  // ...
  return (
    <div>
      {" "}
      <p className="mt-4 text-gray-500">{error.message}</p>
      <button
        type="button"
        onClick={() => {
          reset();
        }}
        className="inline-block px-5 py-3 mt-6 text-sm font-medium text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring cursor-pointer"
      >
        عملیات را مجدد انجام دهید
      </button>
    </div>
  );
}
