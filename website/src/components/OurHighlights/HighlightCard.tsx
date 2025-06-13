import { Link } from "react-router-dom";

const HighlightCard = ({ imageSrc, imageAlt, title, description, linkTo }) => {
  return (
    <div className="fade-up bg-white rounded-xl shadow-md overflow-hidden">
      <img
        src={imageSrc || "/placeholder.svg"}
        alt={imageAlt}
        className="w-full h-60 object-cover"
      />
      <div className="p-6 flex flex-col justify-between">
        <div className="flex flex-col items-center">
          <h3 className="text-2xl font-semibold mt-2">{title}</h3>
          <p className="text-custom-dark-text text-center mt-2 text-lg">
            {description}
          </p>
        </div>
        <div className="mt-6 flex justify-center">
          <Link to={linkTo}>
            <button className="bg-[#322d82] text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-800">
              Shop now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HighlightCard;
