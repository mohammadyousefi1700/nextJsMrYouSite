import axiosInstance from "./axiosInstance/axiosInctance";
import { FetchData } from "./components/FetchData/FetchData";
import Search from "./components/Search/search";
import { Query } from "node-appwrite";
import Pagination from "./components/Pagination";
import { cookies } from "next/headers";
import Card from "./products/components/Card";

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

type DataResponse = {
  total: number;
  documents: Document[];
};

export default async function Home({
  searchParams,
}: {
  searchParams: { query: string; currentPage?: string };
}) {
  // const user = cookies().get("whoAmI");
  // console.log(user);

  const fetchData = async (query: string) => {
    const searchQuery = query || "";
    const queryBackend = [
      Query.startsWith("productName", searchQuery),
      Query.limit(50),
      Query.orderDesc("$createdAt"),
      Query.offset(
        Number(
          searchParams.currentPage === undefined ? 1 : searchParams.currentPage
        )
      ),
    ];

    try {
      const response = await axiosInstance.get(
        `/databases/${process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID}/collections/${process.env.NEXT_PUBLIC_APPWRITE_POST}/documents`,
        {
          params: {
            queries: queryBackend,
          },
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching data: ", error);
      return { documents: [] };
    }
  };
  return (
    <>
      <Search />
      <FetchData request={() => fetchData(searchParams.query)}>
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
                {data.total > 50 ? (
                  <Pagination
                    current={Number(searchParams.currentPage)}
                    total={Number(data?.total || 1) / Number(19)}
                  />
                ) : null}
              </section>
            </div>
          );
        }}
      </FetchData>
    </>
  );
}
