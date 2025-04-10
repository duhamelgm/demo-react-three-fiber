import React from "react";

const Cylinder = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <ellipse
        cx="50"
        cy="20"
        rx="30"
        ry="10"
        stroke="black"
        strokeWidth="4"
        fill="none"
      />
      <line x1="20" y1="20" x2="20" y2="80" stroke="black" strokeWidth="4" />
      <line x1="80" y1="20" x2="80" y2="80" stroke="black" strokeWidth="4" />
      <ellipse
        cx="50"
        cy="80"
        rx="30"
        ry="10"
        stroke="black"
        strokeWidth="4"
        fill="none"
      />
    </svg>
  );
};

export default Cylinder;
