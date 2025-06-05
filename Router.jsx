import { HashRouter, Route, Routes } from "react-router";
import Landing from "./src/pages/landing/Landing";
import Auth from "./src/pages/auth/Auth";
import Payment from "./src/pages/payment/Payment";
import Cart from "./src/pages/cart/Cart";
import Orders from "./src/pages/orders/Orders";
import Results from "./src/pages/results/Results";
import ProductDetail from "./src/pages/productDetail/ProductDetail";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ProtectedRoute from "./src/components/protectedRoute/ProtectedRoute";

//could be called outside the function, to avoid repeated rerender(contains public key)
const stripePromise = loadStripe(
  "pk_test_51RVUW4Q6qdyTnErFnZQgD05Rhy8FAOMDvTkqeERZbaqczT1zIR5Q3CptAZBwfIfGCiiWpTUP1AQ0VGvARUoXW9ci001L0autJr"
);

const PageRouter = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/payments"
          element={
            <ProtectedRoute
              msg={"You must login to pay!"}
              redirect={"/payments"}
            >
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
            </ProtectedRoute>
          }
        />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="/orders"
          element={
            <ProtectedRoute
              msg={"You must login to access your orders"}
              redirect={"/orders"}
            >
              <Orders />
            </ProtectedRoute>
          }
        />
        <Route path="/category/:categoryName" element={<Results />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
        <Route path="*" element="404" /> {/*//404 page*/}
      </Routes>
    </HashRouter>
  );
};

export default PageRouter;
