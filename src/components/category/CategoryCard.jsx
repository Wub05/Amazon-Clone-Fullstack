import { Link } from "react-router-dom";

const CategoryCard = ({ data }) => {
  return (
    <div className="group mb-10 relative p-5 bg-white h-[70vh] rounded-[5px] cursor-pointer text-3xl shadow-yellow-700 shadow-md ">
      <Link to={`/category/${data.category}`} className="flex flex-col">
        <span className="pb-5 mx-auto font-bold text-[#E36E33]">
          {data.category}
        </span>
        <img
          src={data.img_url}
          alt={data.title}
          className="w-[18rem] object-contain"
        />
        <p className="hidden absolute bottom-2 group-hover:block text-blue-800 font-bold text-sm">
          Shop now
        </p>
      </Link>
    </div>
  );
};

export default CategoryCard;
