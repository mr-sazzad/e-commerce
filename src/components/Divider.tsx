import React from "react";

const Divider = ({
  firstLetter,
  secondWard,
}: {
  firstLetter: string;
  secondWard: string;
}) => {
  return (
    <div className="flex flex-row items-center gap-1 w-full">
      <div>
        <p className="text-lg font-semibold text-gray-600">
          <span className="text-2xl font-bold">{firstLetter}</span>
          {secondWard}
        </p>
      </div>
      <div className="divider" />
    </div>
  );
};

export default Divider;
