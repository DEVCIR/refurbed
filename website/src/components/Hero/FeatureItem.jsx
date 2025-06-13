const FeatureItem = ({ Icon, text }) => {
  return (
    <div className="flex items-center gap-2 w-[40%] lg:w-auto">
      <Icon className="text-custom-accent text-4xl" />
      <span className="text-base">{text}</span>
    </div>
  );
};

export default FeatureItem;
