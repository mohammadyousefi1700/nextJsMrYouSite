import axiosInstance from "@/app/axiosInstance/axiosInctance";
import { FetchData } from "@/app/components/FetchData/FetchData";
import { HandleSeparateThreeDigits } from "@/app/components/SeparateThreeDigits";
import { Query } from "node-appwrite";
// import ButtonAddOrder from "../components/Button";
import Comment from "../components/comment";
import dynamic from "next/dynamic";
import { cookies } from "next/headers";

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const user = cookies().get("whoAmI");

  const ButtonAddOrder = dynamic(() => import("../components/Button"), {
    ssr: false,
  });
  const fetchDocumentId = async (id: string, signal?: AbortSignal) => {
    const response = await axiosInstance.get(
      `/databases/${process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID}/collections/${process.env.NEXT_PUBLIC_APPWRITE_POST}/documents/${id}`,
      {
        signal,
      }
    );

    return response.data;
  };

  const fetchPerformanceSalesRequest = async (signal?: AbortSignal) => {
    const responseComments = await axiosInstance.get(
      `/databases/${process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID}/collections/${process.env.NEXT_SCORE_SALES}/documents`,
      {
        params: [Query.startsWith("id", "66edf17dceb196d3f92e")],
        signal,
      }
    );
    return responseComments.data;
  };
  const AllRequest = async (abortSignal?: AbortSignal) => {
    return Promise.all([
      fetchDocumentId(id, abortSignal),
      fetchPerformanceSalesRequest(abortSignal),
    ]);
  };
  return (
    <FetchData request={AllRequest}>
      {(data) => {
        // console.log(data);

        return (
          <div className="flex mb-20 mt-14 w-full flex-col justify-center items-center ">
            <div className="flex sm:flex-col xs:flex-col sm:items-center xs:items-center justify-evenly items-end w-full">
              <div className="lg:w-96 xs:order-last sm:order-last md:w-96 flex flex-col h-fit mt-11 px-2 py-2 gap-y-1 xl:w-[400px] sm:w-80 xs:w-60  items-start  object-cover  border-box rounded-lg border-2 shadow-yellow-300 shadow-2xl">
                <span className="border-b-2 w-full shadow-yellow-100 shadow-md ">
                  نام فروشنده: {data[0].saleProvider}
                </span>

                <span>آدرس:{data[0].location}</span>
              </div>

              <div className=" p-1 items-center w-fit object-cover  border-box rounded-lg border-2 shadow-2xl">
                <img
                  src={data[0].images}
                  alt={data[0].productName}
                  width={100}
                  height={100}
                  className="sm:w-80 shadow-lg shadow-yellow-200 lg:w-[400px] object-fill xl:h-72 md:w-96 xl:w-[400px] xs:w-80"
                />
              </div>
              <div className="lg:w-96 md:w-96 flex flex-col mt-10 px-2 py-2 gap-y-1 xl:w-[400px] sm:w-80 xs:w-60  items-center  object-cover  border-box rounded-lg border-2 shadow-yellow-300 shadow-2xl">
                <span className="border-b-2 font-normal items-center flex flex-col w-full shadow-yellow-100 shadow-md ">
                  <p>نام کالا</p>
                  {data[0].productName}
                </span>
                <span className="border-b-2 flex flex-col w-full text-sm font-normal font-mono shadow-yellow-100 items-center shadow-md">
                  <p> قیمت کالا</p> {HandleSeparateThreeDigits(data[0].price)}
                </span>
                <span className="flex font-normal flex-col items-center flex-wrap w-full">
                  <p> آدرس</p>
                  {data[0].location}
                </span>
                <ButtonAddOrder user={user as any} productPost={data[0]} />
              </div>
            </div>

            <div className="flex items-center mt-20 flex-col w-full">
              {/* <textarea className="w-96 h-52 xs:px-5 xs:w-80 resize-none outline-none  rounded-lg border-[3px] bg-white" />
              <div className="flex mr-64 xs:mr-48 mt-5 gap-x-4 !text-white font-normal">
                <button className="w-12 bg-gray-400 rounded-lg">لغو</button>
                <button className="w-12 bg-[#ef4056] rounded-lg">ثبت</button>
              </div> */}
              <p className="font-medium text-2xl mt-4">نظرات</p>
              <Comment documents={data[1].documents} />
            </div>
          </div>
        );
      }}
    </FetchData>
  );
}
