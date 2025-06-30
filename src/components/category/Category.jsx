import { categoryData } from "../../constants/categoryData";
import CategoryCard from "./CategoryCard";
const Category = () => {
  return (
    <div className="flex gap-8 items-center mt-[-18rem] mx-[3rem] ">
      {categoryData.map((data, index) => (
        <CategoryCard data={data} key={index} />
      ))}
    </div>
  );
};

export default Category;
