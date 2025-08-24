import React from "react";

const RotatingDiscs: React.FC = () => {
  return (
    <div className=" w-full flex items-center justify-center overflow-hidden p-5">
         <style>
        {`
          @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          .animate-spin-slow {
            animation: spin-slow 20s linear infinite;
          }
        `}
      </style>
      {/* Center Disc */}
      <div className="flex justify-center items-center relative w-full max-w-[800px]">
        <div className="relative w-[clamp(300px,50vw,500px)] h-[clamp(300px,50vw,500px)] flex justify-center items-center">
          <img
            src="/ring.png"
            alt="Center Disc"
            className="absolute top-0 left-0 w-full h-full animate-spin-slow object-contain z-[1]"
          />
          <div className="absolute top-1/2 left-1/2 w-[80%] h-[80%] -translate-x-1/2 -translate-y-1/2 flex justify-center items-center z-[2] pointer-events-none">
            <img
              src="/icefoss.png"
              alt="ICEFOSS Logo"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RotatingDiscs;
