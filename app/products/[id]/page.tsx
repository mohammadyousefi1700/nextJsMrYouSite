// import { useRouter } from "next/router";

export default function ProductPage({ params }: { params: { id: string } }) {
  const { id } = params;

  // const response=axiosInstance({url})

  return (
    <div>
      <h1>Product {id}</h1>
      <p>Details about product {id}...</p>
    </div>
  );
}
