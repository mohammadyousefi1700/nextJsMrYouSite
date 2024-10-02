import { useEffect, useRef, Fragment, ReactNode } from "react";
import React from "react";

export type ClickAwayCallback = (event: MouseEvent) => void;

export type ClickAwayListener = (children: ReactNode) => JSX.Element;

export const useClickAwayListener = (
  callback: ClickAwayCallback
): ClickAwayListener => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback(event);
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [callback]);

  const ClickAwayWrapper = (children: ReactNode) => {
    return (
      <Fragment>
        <div ref={ref}>{children}</div>
      </Fragment>
    );
  };

  ClickAwayWrapper.displayName = "ClickAwayWrapper";

  return ClickAwayWrapper;
};
