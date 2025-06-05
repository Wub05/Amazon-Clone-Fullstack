import { Link } from "react-router-dom";
import { imagesData } from "../constants/images";
import { CiLocationOn } from "react-icons/ci";
import { IoSearchOutline } from "react-icons/io5";
import { DataContext } from "./dataProvider/DataProvider";
import { useContext } from "react";
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import LowerHeader from "./LowerHeader";
import { auth } from "../utility/firebase";

const Header = () => {
  //useContext
  const [{ cart, user }, dispatch] = useContext(DataContext);

  // Total cart items
  const total_items = cart?.reduce((amount, item) => amount + item.amount, 0);

  return (
    <header className="sticky bg-header_bg text-white top-0 z-50 ">
      <section className="relative flex justify-around items-center gap-1 py-6 h-[3.5rem] ">
        <div className="flex items-center gap-1 left-0 ml-[-5.5rem] mr-[6rem]  ">
          {/* logo */}
          <Link to="/">
            <img
              src={imagesData.Amazon_Logo}
              alt="amazon logo"
              className="w-full h-[9rem] mr-[-2rem]"
            />
          </Link>
          {/* delivery */}
          <span>
            <CiLocationOn
              size={20}
              className="font-bold mr-[-0.2rem] mb-[-0.3rem]"
            />
          </span>
          <div className="leading-[1.9rem]">
            <p className="text-xs mb-[-0.35rem] text-[#d8d3d3]">Delivered to</p>
            <span className="font-bold text-[1rem]">United Ethiopia</span>
          </div>
        </div>

        <div className="flex items-center w-[48%] ml-[-15rem] mr-[-7.5rem] focus-within:outline focus-within:outline-3 rounded-md focus-within:outline-[#e36e33]">
          {/* search */}

          <select className="text-black bg-[#D4D4D4] py-[0.51rem] pl-[0.7rem] pr-[0.1rem] mr-[-0.1rem] text-lg rounded-l-md max-w-14 cursor-pointer ">
            <option value="" defaultValue="All">
              All
            </option>
            <option value="">All in all</option>
          </select>
          <input
            type="text"
            name=""
            id=""
            placeholder="search product"
            className="p-2 w-full text-black outline-none"
          />
          {/* icon */}
          <IoSearchOutline className=" bg-[#F3A847] outline-2 outline-[#ca872f] w-[4rem] h-[2.5rem] rounded-r-md" />
        </div>

        {/* right side sections */}
        <div className="flex justify-evenly min-w-[15%]  mr-[-4rem] px-5 my-3  h-auto">
          <div className="flex items-center mt-2 h-[33px] ml-[-49px] p-1 mr-[0.5rem] object-contain hover:border-[1px] border-[#ede5e487] rounded-md">
            <img
              src={imagesData.USA_flag}
              alt="usa flag"
              width={27}
              height={30}
            />
            <select name="" id="" className="text-sm bg-black">
              <option value="">EN</option>
            </select>
          </div>

          {/* the 3 right edge items */}

          <Link
            to="/auth"
            className="leading-3 mt-2 px-[1rem] hover:border-[1px] border-[#ede5e487] rounded-md text-nowrap"
          >
            {" "}
            {user ? (
              <>
                <p className="text-sm px-2 mx-2 ">
                  <span className="text-yellow-700 mb-1">
                    Hello, {user?.email?.split("@")[0]} {/*split the string  */}
                  </span>
                </p>
                <span
                  className="text-md font-bold mx-2 text-nowrap hover:text-red-800 "
                  onClick={() => auth.signOut()}
                >
                  Sign Out
                </span>
              </>
            ) : (
              <>
                <p className="text-sm px-2 mx-2 ">Sign In</p>
                <span className="text-md font-bold mx-[-10px] text-nowrap ">
                  Account & Lists
                </span>
              </>
            )}
          </Link>
          {/* orders */}
          <Link
            to="/orders"
            className="mr-[10px] mt-2 px-1 leading-[0.9] mx-auto hover:border-[1px] border-[#ede5e487] rounded-md"
          >
            <p className="text-sm pl-2">Returns</p>
            <span className="text-md font-bold mx-2">&Orders</span>
          </Link>
          {/* cart */}
          <Link
            to="/cart"
            className=" flex flex-col content-end ml-[-5px] px-1 
            leading-[1px] border-[2px] border-[#ede5e487] rounded-md"
          >
            <span className="ml-[10px] mt-4 pb-[2px] text-yellow-500 font-bold text-md rounded-sm text-bold">
              {total_items}
            </span>
            <span className="my-auto object-contain">
              <PiShoppingCartSimpleBold size={25} />
            </span>
          </Link>
        </div>
      </section>
      <LowerHeader />
    </header>
  );
};

export default Header;
