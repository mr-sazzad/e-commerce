import React, { useState } from "react";

type SortBySectionProps = {
  handleSort: (value: string) => void;
};

const SortBySection: React.FC<SortBySectionProps> = ({ handleSort }) => {
  const [active, setActive] = useState(false);

  const onClick = (value: string) => {
    setActive(false);
    handleSort(value);
  };

  return (
    <div className="my-4">
      <div className="w-full">
        <div
          className="border border-gray-200 rounded-lg w-full"
          onClick={() => setActive(!active)}
        >
          <div className="flex items-center justify-between bg-[#9F7A49] text-white text-lg font-bold px-4 py-1 cursor-pointer">
            Sort By
            <svg
              className={`transform transition-transform ${
                active ? "rotate-180" : ""
              }`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              width="18"
              height="18"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
          {active && (
            <div className="p-4">
              <p
                onClick={() => onClick("a-z")}
                className="custom-option cursor-pointer transition-colors duration-300"
              >
                Alphabetically, A-Z
              </p>
              <p
                onClick={() => onClick("z-a")}
                className="custom-option cursor-pointer transition-colors duration-300"
              >
                Alphabetically, Z-A
              </p>
              <p
                onClick={() => onClick("low-high")}
                className="custom-option cursor-pointer transition-colors duration-300"
              >
                Price, low to high
              </p>
              <p
                onClick={() => onClick("high-low")}
                className="custom-option cursor-pointer transition-colors duration-300"
              >
                Price, High to Low
              </p>
            </div>
          )}
        </div>
      </div>
      <style jsx>{`
        .custom-option {
          padding: 10px;
        }
        .custom-option:hover {
          background-color: #9f7a49;
          color: white;
        }
      `}</style>
    </div>
  );
};

export default SortBySection;
