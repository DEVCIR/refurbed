import React from "react";
import AccountOptions from "./AccountOptions";
import RecommendedForYou from "@/components/RecommendedForYou/Index";
import NewsLetter from "@/components/NewsLetter/Index";

const Account = () => {
  return (
    <>
      <AccountOptions />
      <RecommendedForYou />
      <NewsLetter />
    </>
  );
};

export default Account;
