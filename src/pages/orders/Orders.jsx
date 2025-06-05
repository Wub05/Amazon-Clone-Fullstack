import { useContext, useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { DataContext } from "../../components/dataProvider/DataProvider";
import {
  collection,
  doc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../../utility/firebase";
import ProductCard from "../../components/product/ProductCard";

const Orders = () => {
  const [{ cart, user }, dispatch] = useContext(DataContext); //context
  const [orders, setOrders] = useState([]); // store orders

  useEffect(() => {
    if (user) {
      const ordersRef = collection(doc(db, "users", user.uid), "orders");
      const q = query(ordersRef, orderBy("created", "desc"));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        console.log(snapshot);

        const orders = snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));
        setOrders(orders);
      });

      return () => unsubscribe(); // cleanup listener on unmount
    } else {
      console.log("user ID not found!");
      setOrders([]);
    }
  }, [user]);
  return (
    <Layout>
      <div>
        <h1 className="relative w-auto mx-10 my-10 p-10 font-bold text-3xl bg-[#2222215e] outline outline-2 outline-[#dda010] rounded-md">
          My Orders
        </h1>

        <div className="p-5">
          {orders?.map((eachOrder, index) => (
            <div key={index}>
              <p className="bg-[#c17f0d31] my-3 p-5">
                <span className="font-bold text-red-700">Order-Id: </span>
                {eachOrder?.id}
              </p>
              {eachOrder?.data?.cart?.map((order, i) => (
                <ProductCard
                  _flex={true}
                  data={order}
                  key={i}
                  className="mx-5"
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
