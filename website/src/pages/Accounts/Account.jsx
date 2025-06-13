import React from "react";
import AccountOptions from "./AccountOptions";
import RecommendedForYou from "../../components/RecommendedForYou/RecommendedForYou";
import NewsLetter from "../../components/NewsLetter/NewsLetter";

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
