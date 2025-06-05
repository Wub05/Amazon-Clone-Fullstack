import React, { useContext, useState } from "react";
import Layout from "../../components/Layout/Layout";
import ProductCard from "../../components/product/ProductCard";
import { DataContext } from "../../components/dataProvider/DataProvider";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { axiosInstance } from "../../api/axios";
import { ClipLoader } from "react-spinners";
import { db } from "../../utility/firebase";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore"; //in modern firestore versions
import { Type } from "../../utility/action_type";

const payment = () => {
  const [{ user, cart }, dispatch] = useContext(DataContext); //context
  const [cardError, setCardError] = useState(null); //card error
  const [proccesing, setProccesing] = useState(false); //payment proccesing

  // Two special stripe hooks
  const stripe = useStripe();
  const elements = useElements();

  const navigate = useNavigate(); //navigate

  // Total cart items
  const total_items = cart?.reduce((amount, item) => amount + item.amount, 0);
  //Total price
  const total_price = cart?.reduce((prev_amount, item) => {
    return prev_amount + item.amount * item.price;
  }, 0);

  //function to handle card error
  const handleChange = (e) => {
    //handle error logic
    setCardError(e?.error?.message || "");
  };

  //*****function to handle the payment system********

  const handlePayment = async (e) => {
    e.preventDefault();

    setProccesing(true); //start loading...

    //1. accessing the firebase backend(functions), to get the "Client Secret"
    try {
      const response = await axiosInstance.post(
        `/payment/create?total=${total_price * 100}`
      );
      const clientSecret = response.data?.clientSecret;
      console.log(clientSecret); //key to process the payment

      //  2. React side payment confirmation
      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      //3. storing to the firebase database(firestore) and clear the Cart!

      try {
        // await db
        //   .collection("users")
        //   .doc(user.uid)
        //   .collection("orders")
        //   .doc(paymentIntent.id)
        //   .set({
        //     cart: cart,
        //     amount: paymentIntent.amount,
        //     created: payment.created,
        //   });
        await setDoc(doc(db, "users", user.uid, "orders", paymentIntent.id), {
          cart: cart,
          amount: parseFloat(paymentIntent.amount) / 100,
          created: paymentIntent.created,
        });
        console.log("Order stored!");
        //clear the cart after the successful payment!
        dispatch({ type: Type.EMPTY_CART });
      } catch (error) {
        console.error("Failed to write to Firestore:", error);
      }
    } catch (error) {
      console.log("failed to fetch!");
    }
    setProccesing(false); // stop loading...

    //navigate to "orders" page after each successful payment
    navigate("/orders", {
      state: { msg: "You have placed new order!" },
    });
  };

  return (
    <Layout>
      <section>
        {/* payment header */}
        <div className="py-5 pl-[30%] bg-[#bcb8bc7a]">
          Checkout [{total_items}] items
        </div>
        <div className="flex justify-around items-center my-3 py-4 mx-[2%] border-b-[5px]  ">
          <h1>Delivery Address</h1>
          <div>
            <p className="underline font-bold">{user?.email}</p>
            <p>React Lane</p>
            <p>Chikago, IL</p>
          </div>
        </div>

        {/* Delivery items list */}
        <div className="flex justify-between flex-nowrap mx-3 my-4 ">
          <div className="w-[60%]">
            {cart?.map((item, index) => (
              <ProductCard data={item} _flex={true} key={index} />
            ))}
          </div>

          {/* payment system */}
          <div className="w-[30%] h-[30vh] mx-auto p-4 outline outline-2 outline-[#eeae2fed] rounded-md">
            <h2 className="font-bold items-center mb-5 ">Payment Methods</h2>
            <div>
              {/* displays error */}
              <p className="text-red-600">{cardError ? cardError : ""}</p>
              <form>
                {/*stripe component that displays the payment card */}
                <CardElement className="p-4" />
              </form>
              <div>
                <p>
                  <span>Total Order </span>|
                  <span className="bg-yellow-500 p-1 rounded-md">
                    {" "}
                    ${total_price}
                  </span>
                </p>
              </div>
              <button
                type="submit"
                onClick={handlePayment}
                className="mt-3 bg-yellow-600 rounded-md w-[50%] hover:bg-yellow-400"
              >
                {proccesing ? (
                  <div className="flex gap-1 items-center justify-center">
                    <ClipLoader size={12} /> <p>please wait...</p>{" "}
                    {/*  loader setup*/}
                  </div>
                ) : (
                  "Pay"
                )}
              </button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default payment;
