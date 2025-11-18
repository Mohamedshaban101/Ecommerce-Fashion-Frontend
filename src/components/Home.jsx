import React from "react";
import LatestProducts from "./common/LatestProducts";
import FeaturedProducts from "./common/FeaturedProducts";
import Hero from "./common/Hero";
import Header from "./common/Header";
import Footer from "./common/Footer";
import Layout from "./common/Layout";
// import ProductImg from '../assets/images/eight.jpg';
const Home = () => {
  return (
    <>
      <Layout>
        <Hero />
        <LatestProducts />
        <FeaturedProducts />
      </Layout>
    </>
  );
};

export default Home;
