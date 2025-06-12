"use client";
import React, { useEffect, useState } from "react";

interface Props {
  success?: string;
  error?: string;
  Icon?: React.ElementType;
}
const Toast = ({ success, error, Icon }: Props) => {
  return (
    <div>
      {success ? (
        <div
          className={`absolute inset-0 p-7  bg-green-300 rounded-sm text-black font-semibold capitalize flex  items-center justify-start text-[14px] gap-2 transition-all transform duration-500  animate-in `}
        >
          <span>{Icon && <Icon />}</span>
          <span className="">{success}</span>
        </div>
      ) : (
        <div
          className={`absolute inset-0 p-7  bg-red-300 rounded-sm text-black font-semibold capitalize flex  items-center justify-start text-[14px] gap-2 transition-all transform duration-500  animate-in `}
        >
          <span>{Icon && <Icon />}</span>
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};
export default Toast;
