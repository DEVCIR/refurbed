import React from "react";
import PopularCategories from "../../components/PopularCategories/PopularCategories";
import ProductList from "../../components/ProductList/ProductList";
import Review from "../../components/Review/Review";
import NewsLetter from "../../components/NewsLetter/NewsLetter";

const Products = () => {
  return (
    <>
      <PopularCategories />
      <ProductList />
      <Review />
      <NewsLetter />
    </>
  );
};

export default Products;
