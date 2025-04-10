import React from "react";

const Cube = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 6 L18 6 L18 18 L6 18 Z"
        stroke="black"
        strokeWidth="1"
        fill="none"
      />
      <path
        d="M6 6 L10 2 L22 2 L18 6"
        stroke="black"
        strokeWidth="1"
        fill="none"
      />
      <path
        d="M18 18 L22 14 L22 2"
        stroke="black"
        strokeWidth="1"
        fill="none"
      />
      <path
        d="M6 18 L10 14 L22 14"
        stroke="black"
        strokeWidth="1"
        fill="none"
      />
      <path d="M10 2 L10 14" stroke="black" strokeWidth="1" fill="none" />
    </svg>
  );
};

export default Cube;
