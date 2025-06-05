import React from "react";
import { RiMenuLine } from "react-icons/ri";

const LowerHeader = () => {
  return (
    <section className="relative text-white bg-[#232F3E] py-0 px-3 text-sm z-100 ">
      <div className="flex gap-4 items-center">
        <div className="flex text-sm items-center hover:outline hover:outline-1 outline-white p-[0.25rem] rounded-sm ">
          <span>
            <RiMenuLine />
          </span>{" "}
          <span className="text-[1rem]">All</span>
        </div>
        <div className="hover:outline hover:outline-1 outline-white p-[0.35rem] rounded-sm">
          Today's Deals
        </div>
        <div className="hover:outline hover:outline-1 outline-white p-[0.35rem] rounded-sm">
          Registery
        </div>
        <div className="hover:outline hover:outline-1 outline-white p-[0.35rem] rounded-sm">
          Today's Deal
        </div>
        <div className="hover:outline hover:outline-1 outline-white p-[0.35rem] rounded-sm">
          Prime Video
        </div>
        <div className="hover:outline hover:outline-1 outline-white p-[0.35rem] rounded-sm">
          Gift Cards
        </div>
        <div className="hover:outline hover:outline-1 outline-white p-[0.35rem] rounded-sm">
          Customer Service
        </div>
        <div className="hover:outline hover:outline-1 outline-white p-[0.35rem] rounded-sm">
          Sell
        </div>
      </div>
    </section>
  );
};

export default LowerHeader;
