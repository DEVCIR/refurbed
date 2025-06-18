import Navbar from "../Navbar/Index";
import QuickLinkBar from "../QuickLinkBar/Index";
import PromotionBanner from "../PromotionBanner/Index";

const Header = () => {
  return (
    <div className="bg-custom-bg1">
      <Navbar />
      <QuickLinkBar />
      <PromotionBanner promotionVisible={true} />
    </div>
  );
};

export default Header;
