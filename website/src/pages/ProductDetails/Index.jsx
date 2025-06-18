import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ProductView from "@/components/ProductView/Index";
import RecommendedProducts from "@/components/RecommendedProducts/Index";
import Description from "@/components/Description/Description";
import RefurbProcess from "@/components/RefurbProcess/Index";
import bgImg from "./../../assets/background-images/refurbishment_process.webp";
import Review from "@/components/Review/Index";
import Faq from "@/components/Faq/Index";
import NewsLetter from "@/components/NewsLetter/Index";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const allProducts = useSelector((state) => state.products.allProducts);

  useEffect(() => {
    const foundProduct = allProducts.find(
      (product) => product.id === Number(id),
    );
    if (foundProduct) {
      setProduct(foundProduct);
      console.log("Found Product: ", foundProduct);
    }
  }, [id, allProducts]);

  if (product === null) return <div>Loading...</div>;

  if (!product) return <div>Not Available</div>;

  const categoryId = product.category?.id || null;
  const categoryName = product.category?.name || "";

  return (
    <>
      <img
        src={bgImg}
        alt="refurbishment process"
        className="fixed top-0 left-0 w-screen h-screen -z-1"
      />
      <ProductView product={product} />
      <RecommendedProducts
        id={product.id}
        category={categoryName}
        allProducts={allProducts}
      />

      <Description />
      <RefurbProcess />
      <Faq />
      <Review />
      <NewsLetter />
    </>
  );
};

export default ProductDetails;
