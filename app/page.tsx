// import { cookies } from "next/headers";
import axiosInstance from "./axiosInstance/axiosInctance";
import Card from "./dashboard/components/PageComponent/mainPageComponent/Card";
import { FetchData } from "./components/FetchData";
import Search from "./components/Search/search";

export const revalidate = 60; // revalidate at most every hour

type Document = {
  description: string;
  location: string;
  price: string;
  images: string;
  productName: string;
  category: string;
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: any[];
  categories: any | null;
  $databaseId: string;
  $collectionId: string;
};

// تعریف تایپ برای داده‌های کل
type DataResponse = {
  total: number;
  documents: Document[];
};

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  console.log(searchParams);

  const fetchData = async () => {
    // try {
    const response = await axiosInstance.get(
      `/databases/${process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID}/collections/${process.env.NEXT_PUBLIC_APPWRITE_POST}/documents`,

      {
        headers: {
          // Cookie:
          //   "a_session_65132bbcaa49f6f7a7d0=eyJpZCI6IjY2Y2MzNTM2NDE4YjI3MWY0MjE0Iiwic2VjcmV0IjoiMmIzODdhNzYyZTA4Zjk0M2MzYjc4OWEwMTBmOGE4YmM3NDNiOTM3YmY1MDEyMWVjMzAyNGI3Yzc2ZWM5MmM4YjA2ZTlmMzE1YjhjNzk5NzBiZWE3NmFkYTJjN2U5YmUwYWNlMTUzNDg4NWU1NWU2ZWQ4MjBkZjA3YzlmYTdhZGM3N2U2MWQwYzIxMDUxZWQ5NDc4YjQ4MGU5ZGVmOWJjZmRhZDBhNzVlMmZlOTZlMzRmMGNjOTczZTNlZjRhMmJlMzI0MjlhYjE2YzU3OGQ1ZWNlMTljOTU4MDNlNjdjZGM2NzVkNzY5ZDI1NTI0ODA5N2IzZjZhOWI2NDJmNzJiZiJ9",
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    return await response.data;
  };

  return (
    <>
      <Search />
      <FetchData request={fetchData}>
        {(data: DataResponse) => {
          return (
            <div className="w-full mb-3">
              <section className=" flex w-full h-full items-center justify-center flex-wrap gap-x-5">
                <div className="grid grid-cols-1 gap-y-9 xl:grid-cols-4 2xl:grid-cols-5 px-3 mt-3 gap-5 h-full sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {data.documents.length ? (
                    data.documents.map((item, index) => {
                      return <Card index={index} data={item} key={index} />;
                    })
                  ) : (
                    <div>موردی برای نمایش وجود ندارد</div>
                  )}
                </div>
              </section>
            </div>
          );
        }}
      </FetchData>
    </>
  );
}
