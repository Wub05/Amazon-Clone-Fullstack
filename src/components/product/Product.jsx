import { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";

const Product = () => {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const fetchedData = await axios.get(
          "https://fakestoreapi.com/products"
        );

        setProduct(fetchedData.data);
      } catch (error) {
        console.log("Fetch Error", error);
      }
    })();
  }, []);
  return (
    <div className="relative mx-10 text-black  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 mt-11 ">
      {product?.map((item, index) => (
        <ProductCard key={index} data={item} _flex={false} showButton={true} />
      ))}
    </div>
  );
};

export default Product;
