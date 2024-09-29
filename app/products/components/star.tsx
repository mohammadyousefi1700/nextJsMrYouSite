import React from "react";
import { GiRoundStar } from "react-icons/gi";
import { Data } from "./type";

function Star(data: Data) {
  return (
    <span className="flex ">
      <span className="text-neutral-400 text-xs">امتیاز :</span>
      {data &&
        data.documents.map((item) => {
          return (
            <div key={item.id} className="flex mr-1 mt-[2px] gap-[1px]">
              {[...Array(item.star)].map((_, index) => {
                return <GiRoundStar className="text-yellow-500" key={index} />;
              })}
            </div>
          );
        })}
    </span>
  );
}

export default Star;
