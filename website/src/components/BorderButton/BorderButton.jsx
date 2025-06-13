import React from "react";

const BorderButton = (props) => {
  const { children, onclick } = props;

  return (
    <button onClick={onclick} className="px-6 py-3 text-sm font-semibold text-custom-pri-light border-1 border-custom-pri-light rounded-lg hover:border-custom-pri transition duration-200">
      {children}
    </button>
  );
};

export default BorderButton;