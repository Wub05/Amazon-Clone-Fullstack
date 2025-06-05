import { useContext } from "react";
import Layout from "../../components/Layout/Layout";
import { DataContext } from "../../components/dataProvider/DataProvider";
import ProductCard from "../../components/product/ProductCard";
import CurrencyFormat from "../../components/CurrencyFormat";
import { Link } from "react-router-dom";
import { Type } from "../../utility/action_type";
import { PiShoppingCartSimpleDuotone } from "react-icons/pi";

import { HiOutlineChevronUp } from "react-icons/hi";
import { HiOutlineChevronDown } from "react-icons/hi2";

const Cart = () => {
  // {cart,user}=state
  const [{ cart, user }, dispatch] = useContext(DataContext);

  //Total price
  const total_price = cart?.reduce((prev_amount, item) => {
    return prev_amount + item.amount * item.price;
  }, 0);
  //Total_items
  const total_items = cart?.reduce((amount, item) => amount + item.amount, 0);

  //Increment Handler
  const Increment = (item) => {
    dispatch({
      type: Type.ADD_TO_CART,
      item,
    });
  };

  //Decrement Handler
  const Decrement = (id) => {
    dispatch({
      type: Type.REMOVE_FROM_CART,
      id,
    });
  };

  return (
    <Layout>
      <div className="relative flex gap-6">
        <div className="p-8 mx-auto">
          <div className="mb-7 pl-[15%]  text-xl leading-[2rem] w-full">
            <h2 className=" text-md">Hello,</h2>
            <h3 className="text-2xl font-bold text-nowrap min-w-[40%] ">
              <span className="text-[#e0ab1aa8]">Welcome </span>
              <span>to your Shopping Cart</span>
            </h3>
          </div>
          <hr className="mt-[0.75rem] pb-[2%] mb-4" />

          {cart?.length === 0 ? (
            <h2 className="text-5xl mx-auto ">
              Drop something and <span className="text-[#e36e33]">Enjoy!</span>
              <span>
                <span className="text-5xl"> 😂</span>
                <PiShoppingCartSimpleDuotone size={330} />
              </span>
            </h2>
          ) : (
            cart?.map((item, index) => {
              return (
                <section className=" relative flex gap-5" key={index}>
                  <ProductCard
                    data={item}
                    _flex={true}
                    addDesc={true}
                    showButton={false}
                  />

                  <div className="flex flex-col text-nowrap p-5 my-auto mx-auto border-[1px] border-[#e36e33] rounded-md">
                    <button
                      onClick={() => Increment(item)}
                      className="hover:bg-yellow-500 mb-2"
                    >
                      <HiOutlineChevronUp />
                    </button>
                    <span className="mx-auto">{item.amount}</span>
                    <button
                      onClick={() => Decrement(item.id)}
                      className="hover:bg-yellow-500 mt-2"
                    >
                      <HiOutlineChevronDown />
                    </button>
                  </div>
                </section>
              );
            })
          )}
        </div>
        {cart?.length !== 0 && (
          <div className="w-[30%] py-3 px-5 mr-[17%] mt-3 border-[1px] border-[#e95924] rounded-md h-[3%] bg-[#e2c93a25] text-nowrap">
            <div className="flex flex-col gap-1">
              <p className="min-w-[30%] border-b-2 pl-1 mx-auto font-semibold text-[#292727ba] mb-[2px]">
                Subtotal: [{" "}
                <span className="text-md bg-[#dac33096] font-bold px-2 rounded-md">
                  {total_items}
                </span>{" "}
                ] items
              </p>
              <span className=" bg-[#3ce93355] min-w-[15%] mx-auto ring-2 ring-yellow-700 rounded-md px-2 py-1 font-bold">
                <CurrencyFormat amount={total_price} />
              </span>
            </div>
            <span className="mx-auto mb-1">
              <input type="checkbox" />
              <small className="ml-[2px]">This order contains a gift</small>
            </span>
            <br />
            <Link
              to="/payments"
              className=" bg-[#e182347d] px-2 rounded-md text-sm py-1 mx-auto  "
            >
              Continue to Checkout
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Cart;
