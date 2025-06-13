import Navbar from "../Navbar/Navbar"
import QuickLinkBar from "../QuickLinkBar/QuickLinkBar"
import PromotionBanner from "../PromotionBanner/PromotionBanner"

const Header = () => {
  return (
    <div className="bg-custom-bg1">
        <Navbar />
        <QuickLinkBar />
        <PromotionBanner promotionVisible={true} />
    </div>
  )
}

export default Header