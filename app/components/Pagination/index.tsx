import classNames from "clsx";
import { AllHTMLAttributes, DetailedHTMLProps } from "react";

import { arrowsClassName, boxNumberClassName } from "./classNames";
import NumberBox from "./NumberBox";
import { PropType } from "./type";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
// -------------------colors--------------
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
    onchange,
    className,
    theme = "purple",
    numberClassName2,
  } = props;

  const pageNumbers = Array.from(Array(Math.ceil(total) + 1).keys());

  const changePage = (pageNumber: number) => {
    if (total)
      if (pageNumber > 0 && pageNumber - 1 < total) {
        onchange(pageNumber);
      }
  };

  const handleNumbersBetweenDots = () => {
    if (pageNumbers.length === 1) {
      return [1];
    } else if (pageNumbers[-1] <= 3) {
      return Array.from({ length: total }, (_, i) => i + 1);
    } else if (current === 1) {
      return pageNumbers.slice(current - 1, current + 3);
    } else if (current === pageNumbers.length - 1) {
      return pageNumbers.slice(current - 2);
    } else {
      return pageNumbers.slice(current - 2, current + 3);
    }
  };

  const parseStartArrowColor = () => {
    if (theme === "purple") {
      if (current === 1) return lightPurple;
      else return darkPurple;
    } else if (theme === "blue") {
      if (current === 1) return gray;
      else return blue;
    }
  };

  const parseEndArrowColor = () => {
    if (theme === "purple") {
      if (current === total) return lightPurple;
      else return darkPurple;
    } else if (theme === "blue") {
      if (current === total) return gray;
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
              onClick={() => changePage(current - 1)}
            >
              <GoArrowRight className="text-white" />
            </span>
            <div className={"flex flex-row mx-[0.875rem] "}>
              {current >= 4
                ? pageNumbers
                    .slice(1, 2)
                    .map((pageNumber: number, index: number) => (
                      <NumberBox
                        boxNumberClassName2={boxNumberClassName2}
                        key={index}
                        numberClassName2={numberClassName2}
                        pageNumber={pageNumber}
                        currentPage={current}
                        pageChange={() => {
                          changePage(pageNumber);
                        }}
                      />
                    ))
                : null}
              {current <= 4 ? null : (
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
                    currentPage={current}
                    pageChange={() => {
                      changePage(pageNumber);
                    }}
                  />
                )
              )}
              {pageNumbers.length - current <= 4 ? null : (
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
              {current >= pageNumbers.length - 3
                ? null
                : pageNumbers
                    .slice(pageNumbers.length - 1)
                    .map((pageNumber: number, index) => (
                      <NumberBox
                        boxNumberClassName2={boxNumberClassName2}
                        numberClassName2={numberClassName2}
                        key={index}
                        pageNumber={pageNumber}
                        currentPage={current}
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
              onClick={() => changePage(current + 1)}
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
