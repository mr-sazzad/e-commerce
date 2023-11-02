import React from "react";

const Promotion = () => {
  return (
    <div className="max-w-[1200px] mx-auto lg:px-[50px] px-[30px]">
      <div className="flex flex-col gap-5 lg:flex-row lg:justify-between mt-5">
        <div className="flex-1 overflow-hidden">
          <div className="card-1-bg md:h-[270px] h-[250px] w-full relative overflow-hidden">
            <div className="w-full h-full bg-black/40 relative">
              <div className="z-[1000] absolute top-1/3 right-10">
                <h2 className="text-4xl font-semibold text-[#9F7A49]">
                  Romance in the air
                </h2>
                <p className="text-white mt-5">
                  WEAR YOUR STYLE WITH VERVE & ATTITUDE
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* second card */}
        <div className="flex-1 overflow-hidden">
          <div className="card-2-bg md:h-[270px] h-[250px] w-full relative">
            <div className="w-full h-full bg-black/70 relative">
              <div className="z-[1000] absolute top-1/3 right-10">
                <h2 className="text-4xl font-semibold text-[#9F7A49]">
                  Romance in the air
                </h2>
                <p className="text-white mt-5">
                  WEAR YOUR STYLE WITH VERVE & ATTITUDE
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Promotion;
