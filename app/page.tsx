import axiosInstance from "./axiosInstance/axiosInctance";

export default function Home() {
  // const fetchData = async () => {
  //   // try {
  //   const response = await axiosInstance.get(
  //     `/databases/${process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID}/collections/${process.env.NEXT_PUBLIC_APPWRITE_POST}/documents`,

  //     {
  //       headers: {
  //         Cookie:
  //           "a_session_65132bbcaa49f6f7a7d0=eyJpZCI6IjY2Y2MzNTM2NDE4YjI3MWY0MjE0Iiwic2VjcmV0IjoiMmIzODdhNzYyZTA4Zjk0M2MzYjc4OWEwMTBmOGE4YmM3NDNiOTM3YmY1MDEyMWVjMzAyNGI3Yzc2ZWM5MmM4YjA2ZTlmMzE1YjhjNzk5NzBiZWE3NmFkYTJjN2U5YmUwYWNlMTUzNDg4NWU1NWU2ZWQ4MjBkZjA3YzlmYTdhZGM3N2U2MWQwYzIxMDUxZWQ5NDc4YjQ4MGU5ZGVmOWJjZmRhZDBhNzVlMmZlOTZlMzRmMGNjOTczZTNlZjRhMmJlMzI0MjlhYjE2YzU3OGQ1ZWNlMTljOTU4MDNlNjdjZGM2NzVkNzY5ZDI1NTI0ODA5N2IzZjZhOWI2NDJmNzJiZiJ9",
  //       },
  //     }
  //   );
  //   return response;
  // };
  // catch (error: unknown) {
  //   // تبدیل error به نوع قابل استفاده
  //   if (axios.isAxiosError(error)) {
  //     console.error("Error fetching data:", error.response?.data);
  //   } else {
  //     console.error(
  //       "An unexpected error occurred:",
  //       (error as Error).message
  //     );
  //   }
  // }
  // };
  // const fetchData1 = async () => {
  //   const response = await axiosInstance.get(
  //     `/account`,

  //     {
  //       headers: {
  //         Cookie:
  //           "a_session_65132bbcaa49f6f7a7d0=eyJpZCI6IjY2Y2MzNTM2NDE4YjI3MWY0MjE0Iiwic2VjcmV0IjoiMmIzODdhNzYyZTA4Zjk0M2MzYjc4OWEwMTBmOGE4YmM3NDNiOTM3YmY1MDEyMWVjMzAyNGI3Yzc2ZWM5MmM4YjA2ZTlmMzE1YjhjNzk5NzBiZWE3NmFkYTJjN2U5YmUwYWNlMTUzNDg4NWU1NWU2ZWQ4MjBkZjA3YzlmYTdhZGM3N2U2MWQwYzIxMDUxZWQ5NDc4YjQ4MGU5ZGVmOWJjZmRhZDBhNzVlMmZlOTZlMzRmMGNjOTczZTNlZjRhMmJlMzI0MjlhYjE2YzU3OGQ1ZWNlMTljOTU4MDNlNjdjZGM2NzVkNzY5ZDI1NTI0ODA5N2IzZjZhOWI2NDJmNzJiZiJ9",
  //       },
  //     }
  //   );
  //   console.log(response);
  // };
  // fetchData();
  // Promise.resolve([fetchData(), fetchData1()]);

  async function createSessionClient(formData) {
    "use server";
    const data = Object.fromEntries(formData);
    const { email, password } = data;
    axiosInstance
      .post("/account/sessions/email", {
        email,
        password,
      })
      .then((response) => console.log(response));
  }
  return (
    <div className="w-full flex justify-center items-center h-full text-center align-bottom">
      <form
        action={createSessionClient}
        className="flex flex-col items-center w-full max-w-[30rem] min-w-[10rem] bg-stone-300 p-3 gap-y-5"
      >
        <input
          className="bg-slate-500 w-full max-w-[30rem] min-w-[10rem]"
          autoComplete="off"
          type="email"
          name="email"
          placeholder="Email"
          required
        />
        <input
          className="w-52 bg-slate-500"
          autoComplete="off"
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
