import React from "react";

const PromotionBanner = ({ promotionVisible }) => {
  return (
    promotionVisible && (
      <div className="flex items-center justify-center text-center bg-custom-pri-light text-white py-3 text-sm font-medium gap-2">
        💰 Save 5% now on all Samsung devices – Code: SAMSUNG5
      </div>
    )
  );
};

export default PromotionBanner;
