"use client";

import classNames from "clsx";
import {
  AllHTMLAttributes,
  DetailedHTMLProps,
  useCallback,
  useEffect,
  useState,
} from "react";

import { arrowsClassName, boxNumberClassName } from "./classNames";
import NumberBox from "./NumberBox";
import { PropType } from "./type";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
// // -------------------colors--------------
const darkPurple = "#5F41B2";
const lightPurple = "#C0B8E3";
const gray = "#1e252b73";
const blue = "#4EBABE";
// -------------------end colors--------------

const Pagination = (
  props: PropType &
    DetailedHTMLProps<AllHTMLAttributes<HTMLDivElement>, HTMLDivElement>
) => {
  const {
    boxNumberClassName2,
    arrowsClassName2,
    total,
    current,
    className,
    theme = "purple",
    numberClassName2,
  } = props;

  const [currentPage, setCurrentPage] = useState(current || 1); // استفاده از useState برای مدیریت صفحه فعلی
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  useEffect(() => {
    const newQueryString = `${createQueryString(
      "currentPage",
      String(currentPage) === "NaN" || undefined ? "1" : String(currentPage)
    )}`;
    router.push(pathname + "?" + newQueryString);
  }, [router, pathname, createQueryString, currentPage]); // currentPage را به dependency اضافه کنید

  const pageNumbers = Array.from(Array(Math.ceil(total) + 1).keys());

  const changePage = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= total) {
      setCurrentPage(pageNumber); // اینجا صفحه فعلی را به‌روزرسانی کنید
    }
  };

  const handleNumbersBetweenDots = () => {
    if (pageNumbers.length === 1) {
      return [1];
    } else if (pageNumbers[-1] <= 3) {
      return Array.from({ length: total }, (_, i) => i + 1);
    } else if (currentPage === 1) {
      return pageNumbers.slice(currentPage - 1, currentPage + 3);
    } else if (currentPage === pageNumbers.length - 1) {
      return pageNumbers.slice(currentPage - 2);
    } else {
      return pageNumbers.slice(currentPage - 2, currentPage + 3);
    }
  };

  const parseStartArrowColor = () => {
    if (theme === "purple") {
      if (currentPage === 1) return lightPurple;
      else return darkPurple;
    } else if (theme === "blue") {
      if (currentPage === 1) return gray;
      else return blue;
    }
  };

  const parseEndArrowColor = () => {
    if (theme === "purple") {
      if (currentPage === total) return lightPurple;
      else return darkPurple;
    } else if (theme === "blue") {
      if (currentPage === total) return gray;
      else return blue;
    }
  };

  return (
    <>
      {total >= 1 ? (
        <div
          className={classNames(
            "flex flex-row justify-center mt-[27px] mb-[5rem] pb-3 w-full",
            className
          )}
        >
          <div className={"flex items-center "}>
            <span
              style={{ backgroundColor: `${parseStartArrowColor()}` }}
              className={classNames(
                arrowsClassName2 ? arrowsClassName2 : arrowsClassName
              )}
              onClick={() => changePage(currentPage - 1)}
            >
              <GoArrowRight className="text-white" />
            </span>
            <div className={"flex flex-row mx-[0.875rem] "}>
              {currentPage >= 4
                ? pageNumbers
                    .slice(1, 2)
                    .map((pageNumber: number, index: number) => (
                      <NumberBox
                        boxNumberClassName2={boxNumberClassName2}
                        key={index}
                        numberClassName2={numberClassName2}
                        pageNumber={pageNumber}
                        currentPage={currentPage}
                        pageChange={() => {
                          changePage(pageNumber);
                        }}
                      />
                    ))
                : null}
              {currentPage <= 4 ? null : (
                <div
                  className={classNames(
                    boxNumberClassName2
                      ? boxNumberClassName2
                      : boxNumberClassName
                  )}
                >
                  ...
                </div>
              )}
              {handleNumbersBetweenDots().map(
                (pageNumber: number, index: number) => (
                  <NumberBox
                    boxNumberClassName2={boxNumberClassName2}
                    key={index}
                    numberClassName2={numberClassName2}
                    pageNumber={pageNumber}
                    currentPage={currentPage}
                    pageChange={() => {
                      changePage(pageNumber);
                    }}
                  />
                )
              )}
              {pageNumbers.length - currentPage <= 4 ? null : (
                <div
                  className={classNames(
                    boxNumberClassName2
                      ? boxNumberClassName2
                      : boxNumberClassName
                  )}
                >
                  ...
                </div>
              )}
              {currentPage >= pageNumbers.length - 3
                ? null
                : pageNumbers
                    .slice(pageNumbers.length - 1)
                    .map((pageNumber: number, index) => (
                      <NumberBox
                        boxNumberClassName2={boxNumberClassName2}
                        numberClassName2={numberClassName2}
                        key={index}
                        pageNumber={pageNumber}
                        currentPage={currentPage}
                        pageChange={() => {
                          changePage(pageNumber);
                        }}
                      />
                    ))}
            </div>

            <span
              style={{ backgroundColor: `${parseEndArrowColor()}` }}
              className={classNames(
                arrowsClassName2 ? arrowsClassName2 : arrowsClassName
              )}
              onClick={() => changePage(currentPage + 1)}
            >
              <GoArrowLeft className="text-white w-7 h-5" />
            </span>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Pagination;
