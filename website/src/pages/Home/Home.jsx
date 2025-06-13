import bgImg from "./../../assets/background-images/refurbishment_process.webp";
import Hero from "../../components/Hero/Hero";
import OurHighlights from "../../components/OurHighlights/OurHighlights";
import CtaBanner from "../../components/CtaBanner/CtaBanner";
import RecommendedForYou from "../../components/RecommendedForYou/RecommendedForYou";
import Review from "../../components/Review/Review";
import TopBrands from "../../components/TopBrands/TopBrands";
import RefurbProcess from "../../components/RefurbProcess/RefurbProcess";
import EnvironmentalPromotion from "../../components/EnvironmentalPromotion/EnvironmentalPromotion";
import Faq from "../../components/Faq/Faq";
import NewsLetter from "../../components/NewsLetter/NewsLetter";
import TopCategories from "../../components/TopCategories/TopCategories";

const Home = () => {
  return (
    <>
      <img
        src={bgImg}
        alt="refurbishment process"
        className="fixed top-0 left-0 w-screen h-screen -z-1"
      />
      <Hero />
      <TopCategories/>
      <OurHighlights />
      <RecommendedForYou />
      <Review />
      <CtaBanner />
      <RefurbProcess />
      <EnvironmentalPromotion />
      <Faq />
      <NewsLetter />
    </>
  );
};

export default Home;
