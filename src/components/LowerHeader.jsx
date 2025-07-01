import React, { useState } from "react";
import { RiMenuLine } from "react-icons/ri";

const LowerHeader = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    "Today's Deals",
    "Registry",
    "Today's Deal",
    "Prime Video",
    "Gift Cards",
    "Customer Service",
    "Sell",
  ];

  return (
    <section className="relative text-white bg-[#232F3E] py-0 px-3 text-sm z-40">
      <div className="flex items-center justify-between md:justify-start md:gap-4 py-2">
        {/* Hamburger toggle (mobile) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1 md:gap-0 md:hidden hover:outline hover:outline-1 outline-white p-1 rounded-sm"
        >
          <RiMenuLine />
          <span className="text-base">All</span>
        </button>

        {/* Static "All" menu (desktop) */}
        <div className="hidden md:flex text-sm items-center hover:outline hover:outline-1 outline-white p-1 rounded-sm">
          <RiMenuLine />
          <span className="ml-1 text-base">All</span>
        </div>

        {/* Menu Items (desktop) */}
        <div className="hidden md:flex items-center gap-4">
          {navItems.map((item, index) => (
            <div
              key={index}
              className="hover:outline hover:outline-1 outline-white p-1 rounded-sm"
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Toggle Dropdown (mobile only) */}
      {isOpen && (
        <div className="flex flex-col gap-2 mt-2 md:hidden">
          {navItems.map((item, index) => (
            <div
              key={index}
              className="hover:outline hover:outline-1 outline-white p-2 rounded-sm bg-[#2f3c4d]"
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default LowerHeader;
