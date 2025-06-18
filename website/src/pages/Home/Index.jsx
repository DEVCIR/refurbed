import bgImg from "./../../assets/background-images/refurbishment_process.webp";
import Hero from "@/components/Hero/Index";
import OurHighlights from "@/components/OurHighlights/Index";
import CtaBanner from "@/components/CtaBanner/Index";
import RecommendedForYou from "@/components/RecommendedForYou/Index";
import Review from "@/components/Review/Index";
import RefurbProcess from "@/components/RefurbProcess/Index";
import EnvironmentalPromotion from "@/components/EnvironmentalPromotion/Index";
import Faq from "@/components/Faq/Index";
import NewsLetter from "@/components/NewsLetter/Index";
import TopCategories from "@/components/TopCategories/Index";

const Home = () => {
  return (
    <>
      <img
        src={bgImg}
        className="fixed top-0 left-0 w-screen h-screen -z-1"
        alt="refurbishment process"
      />
      <Hero />
      <TopCategories />
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
