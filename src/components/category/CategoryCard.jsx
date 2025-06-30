import { Link } from "react-router-dom";

const CategoryCard = ({ data }) => {
  return (
    <div className="group mb-10 relative p-5 bg-white h-[50vh] rounded-md cursor-pointer text-3xl shadow-yellow-700 shadow-md transform hover:scale-110 transition duration-300">
      <Link to={`/category/${data.category}`} className="flex flex-col h-full">
        {/* Category Title */}
        <span className="pb-5 mx-auto font-bold text-[#E36E33] text-xl">
          {data.category}
        </span>

        {/* Image container to control sizing */}
        <div className="flex-1 flex items-center justify-center overflow-hidden">
          <img
            src={data.img_url}
            alt={data.title}
            className="max-h-full max-w-full object-contain"
          />
        </div>

        {/* Hover Text */}
        <p className="absolute bottom-2  left-1/2 -translate-x-1/2 hidden group-hover:block text-blue-800 font-bold text-lg transition-opacity duration-200">
          Shop now
        </p>
      </Link>
    </div>
  );
};

export default CategoryCard;
