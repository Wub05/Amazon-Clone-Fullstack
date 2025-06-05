import { useParams } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import { useState, useEffect } from "react";
import { baseUrl } from "../../api/baseURL";
import axios from "axios";
import ProductCard from "../../components/product/ProductCard";
import Loader from "../../components/loader/Loader";

const Results = () => {
  const [productCat, setProductCat] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const { categoryName } = useParams();
  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const productsData = await axios.get(
          `${baseUrl}/products/category/${categoryName.toLowerCase()}`
        ); // 📌It took more than an hour to detect, to change to lowerCase!

        setProductCat(productsData.data); //state updater
        setLoading(false);
      } catch (error) {
        console.log("Results Fetch Error:-> ❌", error);
        setLoading(false);
      }
    })();
  }, []);
  return (
    <Layout>
      {isLoading ? (
        <Loader />
      ) : (
        <section>
          <h1 className="p-8 text-5xl shadow-sm shadow-[#5a575790]">
            <span>Category /</span>
            <span className="bg-[#ede328b0] px-3 rounded-sm text-red-500 font-bold">
              {categoryName}
            </span>
          </h1>
          <div className="relative text-black  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-[80px] mx-7">
            {productCat?.map((product) => (
              <ProductCard
                key={product.id}
                data={product}
                _flex={false}
                showButton={true}
              />
            ))}
          </div>
        </section>
      )}
    </Layout>
  );
};

export default Results;
