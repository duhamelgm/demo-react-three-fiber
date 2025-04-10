import React from "react";

const Sphere = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="10" stroke="black" strokeWidth="1" />
      <ellipse
        cx="12"
        cy="12"
        rx="10"
        ry="4"
        stroke="black"
        strokeWidth="1"
        fill="none"
      />
      <ellipse
        cx="12"
        cy="12"
        rx="4"
        ry="10"
        stroke="black"
        strokeWidth="1"
        fill="none"
      />
      <path
        d="M2 12a10 10 0 0 0 20 0"
        stroke="black"
        strokeWidth="1"
        fill="none"
      />
      <path
        d="M2 12a10 10 0 0 1 20 0"
        stroke="black"
        strokeWidth="1"
        fill="none"
      />
    </svg>
  );
};

export default Sphere;
