import { Link } from "react-router-dom";
import tabletImg from "../../assets/product-images/tablets.webp"; // Assuming this is a fallback or default image

const CategorySlideCard = ({ category }) => {
  return (
    <Link to={`/c/${category.name}`}>
      <div className="fade-up bg-white text-black rounded-xl p-5 flex flex-col items-center justify-center shadow-md">
        <img
          src={category.img || tabletImg} // Use category.img or fallback
          alt={category.name}
          className="w-28 h-28 object-contain mb-4"
        />
        <p className="font-medium text-base text-center">{category.name}</p>
      </div>
    </Link>
  );
};

export default CategorySlideCard;
