// import { useRouter } from "next/router";

import axiosInstance from "@/app/axiosInstance/axiosInctance";
import { FetchData } from "@/app/components/FetchData";

export default function ProductPage({ params }: { params: { id: string } }) {
  const { id } = params;

  // const response=axiosInstance({url})
  const fetchDocumentId = async (id: string) => {
    const response = await axiosInstance.get(
      `/databases/${process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID}/collections/${process.env.NEXT_PUBLIC_APPWRITE_POST}/documents/${id}`
    );
    return response.data;
  };
  return (
    <FetchData request={() => fetchDocumentId(id)}>
      {(data) => {
        console.log(data);

        return (
          <div>
            <h1>Product {id}</h1>
            <p>Details about product {id}...</p>
          </div>
        );
      }}
    </FetchData>
  );
}
