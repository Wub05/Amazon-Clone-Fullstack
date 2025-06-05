import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { baseUrl } from "../../api/baseURL";
import axios from "axios";
import ProductCard from "../../components/product/ProductCard";
import Layout from "../../components/Layout/Layout";
import Loader from "../../components/loader/Loader";

const ProductDetail = () => {
  const [eachProduct, setEachProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //to get the dynamic routing variable(params)
  const { productId } = useParams();

  //always when fetching!
  useEffect(() => {
    setIsLoading(true); //before fetching!
    (async () => {
      try {
        const singleProduct = await axios.get(`
           ${baseUrl}/products/${productId}`);
        setEachProduct(singleProduct?.data);
        setIsLoading(false); //after fetching
      } catch (error) {
        console.log("Each product fetch > :❌", error);
        setIsLoading(false); //during error
      }
    })();
  }, []);

  return (
    <Layout>
      {/* show only the loader if it is loading! */}
      {isLoading ? (
        <Loader />
      ) : (
        <div className="items-center mt-[10%] mx-[5%]">
          <ProductCard
            key={eachProduct.id}
            data={eachProduct}
            _flex={true}
            addDesc={true}
            showButton={true}
          />
        </div>
      )}
    </Layout>
  );
};

export default ProductDetail;
