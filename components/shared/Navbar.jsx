import React from "react";

const Navbar = () => {
  return (
    <div className="h-[60px] flex items-center w-full justify-center bg-[#363849] mt-4">
      <ul className="">
        <li>
          <a href="#">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="192"
                height="192"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <rect width="256" height="256" fill="none"></rect>
                <circle
                  cx="128"
                  cy="128"
                  r="96"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="16"
                ></circle>
                <circle
                  cx="128"
                  cy="120"
                  r="40"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="16"
                ></circle>
                <path
                  d="M63.79905,199.37405a72.02812,72.02812,0,0,1,128.40177-.00026"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="16"
                ></path>
              </svg>
              Account
            </span>
          </a>
        </li>
        <li>
          <a href="#" className="">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="192"
                height="192"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <rect width="256" height="256" fill="none"></rect>
                <path
                  d="M224,177.32122V78.67878a8,8,0,0,0-4.07791-6.9726l-88-49.5a8,8,0,0,0-7.84418,0l-88,49.5A8,8,0,0,0,32,78.67878v98.64244a8,8,0,0,0,4.07791,6.9726l88,49.5a8,8,0,0,0,7.84418,0l88-49.5A8,8,0,0,0,224,177.32122Z"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="16"
                ></path>
                <polyline
                  points="177.022 152.511 177.022 100.511 80 47"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="16"
                ></polyline>
                <polyline
                  points="222.897 74.627 128.949 128 33.108 74.617"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="16"
                ></polyline>
                <line
                  x1="128.94915"
                  y1="128"
                  x2="128.01036"
                  y2="234.82131"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="16"
                ></line>
              </svg>
              Shipping
            </span>
          </a>
        </li>
        <li>
          <a href="#">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="192"
                height="192"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <rect width="256" height="256" fill="none"></rect>
                <rect
                  x="24"
                  y="56"
                  width="208"
                  height="144"
                  rx="8"
                  strokeWidth="16"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                ></rect>
                <line
                  x1="167.99414"
                  y1="168"
                  x2="199.99414"
                  y2="168"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="16"
                ></line>
                <line
                  x1="119.99414"
                  y1="168"
                  x2="135.99414"
                  y2="168"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="16"
                ></line>
                <line
                  x1="23.99414"
                  y1="96.85228"
                  x2="231.99412"
                  y2="96.85228"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="16"
                ></line>
              </svg>
              Payment
            </span>
          </a>
        </li>
        <li>
          <a href="#">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="192"
                height="192"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <rect width="256" height="256" fill="none"></rect>
                <line
                  x1="96"
                  y1="152"
                  x2="160"
                  y2="152"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="16"
                ></line>
                <line
                  x1="96"
                  y1="120"
                  x2="160"
                  y2="120"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="16"
                ></line>
                <path
                  d="M160.00194,40H200a8,8,0,0,1,8,8V216a8,8,0,0,1-8,8H56a8,8,0,0,1-8-8V48a8,8,0,0,1,8-8H95.99783"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="16"
                ></path>
                <path
                  d="M88,72V64a40,40,0,0,1,80,0v8Z"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="16"
                ></path>
              </svg>
              Summary
            </span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
