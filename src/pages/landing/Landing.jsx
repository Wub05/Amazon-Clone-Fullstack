import React from "react";
import Carousel from "../../components/Carousel";
import Category from "../../components/category/Category";
import Product from "../../components/product/Product";
import Layout from "../../components/Layout/Layout";

const Landing = () => {
  return (
    <Layout>
      <Carousel />
      <Category />
      <Product />
    </Layout>
  );
};

export default Landing;
