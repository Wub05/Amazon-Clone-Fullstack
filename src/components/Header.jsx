import { Link } from "react-router-dom";
import { imagesData } from "../constants/images";
import { CiLocationOn } from "react-icons/ci";
import { IoSearchOutline } from "react-icons/io5";
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import { useContext } from "react";
import { DataContext } from "./dataProvider/DataProvider";
import { auth } from "../utility/firebase";
import LowerHeader from "./LowerHeader";

const Header = () => {
  const [{ cart, user }] = useContext(DataContext);
  const total_items = cart?.reduce((amount, item) => amount + item.amount, 0);

  return (
    <header className="sticky top-0 z-50 bg-header_bg text-white">
      <section className="flex flex-wrap md:flex-nowrap justify-between items-center gap-3 py-4 px-4 h-auto md:h-[3.5rem]">
        {/* Logo & Delivery */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Link to="/">
            <img
              src={imagesData.Amazon_Logo}
              alt="amazon logo"
              className="w-[80px] h-auto md:h-[9rem] object-contain"
            />
          </Link>
          <CiLocationOn size={20} />
          <div className="hidden sm:block leading-5">
            <p className="text-xs text-[#d8d3d3]">Delivered to</p>
            <span className="font-bold text-sm md:text-base">
              United Ethiopia
            </span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex items-center w-full md:w-[48%] rounded-md overflow-hidden focus-within:outline focus-within:outline-2 md:focus-within:outline-3 focus-within:outline-[#e36e33]">
          <select className="h-10 text-black bg-[#D4D4D4] text-sm md:text-base px-2 rounded-none outline-none">
            <option value="">All</option>
            <option value="">All in all</option>
          </select>
          <input
            type="text"
            placeholder="search product"
            className="h-10 p-2 w-full text-black text-sm outline-none"
          />
          <button className="h-10 w-12 flex items-center justify-center bg-[#F3A847] hover:bg-[#dfa133]">
            <IoSearchOutline className="text-white text-xl" />
          </button>
        </div>

        {/* Right Controls */}
        <div className="flex items-center justify-end gap-3 w-full md:w-auto mt-3 md:mt-0">
          {/* Language Selector */}
          <div className="flex items-center p-1 hover:border border-[#ede5e487] rounded-md">
            <img
              src={imagesData.USA_flag}
              alt="usa flag"
              className="w-[24px] h-[20px] object-contain"
            />
            <select className="text-sm bg-black ml-1">
              <option value="">EN</option>
            </select>
          </div>

          {/* Auth */}
          <Link
            to="/auth"
            className="hover:border border-[#ede5e487] rounded-md px-2"
          >
            {user ? (
              <>
                <p className="text-xs">
                  <span className="text-yellow-700">
                    Hello, {user.email.split("@")[0]}
                  </span>
                </p>
                <span
                  className="text-sm font-bold hover:text-red-800"
                  onClick={() => auth.signOut()}
                >
                  Sign Out
                </span>
              </>
            ) : (
              <>
                <p className="text-xs">Sign In</p>
                <span className="text-sm font-bold">Account & Lists</span>
              </>
            )}
          </Link>

          {/* Orders */}
          <Link
            to="/orders"
            className="hover:border border-[#ede5e487] rounded-md px-2"
          >
            <p className="text-xs">Returns</p>
            <span className="text-sm font-bold">&Orders</span>
          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            className="relative hover:border border-[#ede5e487] rounded-md px-2"
          >
            <span className="absolute -top-2 right-0 text-yellow-500 font-bold text-xs">
              {total_items}
            </span>
            <PiShoppingCartSimpleBold size={25} />
          </Link>
        </div>
      </section>

      <LowerHeader />
    </header>
  );
};

export default Header;
