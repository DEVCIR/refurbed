import React from "react";
import PopularCategories from "@/components/PopularCategories/Index";
import ProductList from "@/components/ProductList/Index";
import Review from "@/components/Review/Index";
import NewsLetter from "@/components/NewsLetter/Index";

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
