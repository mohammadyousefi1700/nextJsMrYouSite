import { FetchData } from "../components/FetchData";
import axiosInstance from "../axiosInstance/axiosInctance";
import Card from "../dashboard/components/PageComponent/mainPageComponent/Card";

async function fetchSearchResults(query: string) {
  const response = await axiosInstance.get(
    `/databases/${process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID}/collections/${process.env.NEXT_PUBLIC_APPWRITE_POST}/documents`,
    {
      params: { q: query },
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
  return response.data;
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { query?: string };
}) {
  const query = searchParams.query || "";
  console.log("query", query);

  return (
    <div className="w-full p-5">
      <h1 className="text-xl font-bold mb-5">نتایج جستجو برای: {query}</h1>
      <FetchData request={() => fetchSearchResults(query)}>
        {(data) => (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {data?.documents.length > 0 ? (
              data.documents.map((item: any, index: number) => (
                <Card key={index} data={item} index={index} />
              ))
            ) : (
              <p>نتیجه‌ای پیدا نشد</p>
            )}
          </div>
        )}
      </FetchData>
    </div>
  );
}
