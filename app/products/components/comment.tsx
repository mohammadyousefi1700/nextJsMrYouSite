import React from "react";
import { Data } from "./type";
import { GiRoundStar } from "react-icons/gi";
import Star from "./star";

async function Comment(data: Data) {
  return (
    <div className="mt-6 xl:w-[700px]  overflow-y-auto lg:w-[600px] xs:w-full sm:w-full md:w-[500px] rounded-sm px-4 ">
      {data.documents.length
        ? data.documents.map((item, index) => {
            return (
              <div
                key={index}
                className="w-full sm:px-3 border-t-[2px]  gap-y-5  h-fit"
              >
                <div className="!gap-y-2 flex flex-col">
                  <p>
                    <span className="text-neutral-400 text-xs">خریدار</span>:
                    <span> {item.commenter}</span>
                  </p>

                  <Star documents={data.documents} />
                  <p className="text-neutral-400 text-xs">توضیحات :</p>
                  {item.comments}
                </div>
              </div>
            );
          })
        : null}
    </div>
  );
}

export default Comment;
