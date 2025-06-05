import { categoryData } from "../../constants/categoryData";
import CategoryCard from "./CategoryCard";
const Category = () => {
  return (
    <div className="flex justify-around items-center mt-[-18rem]  ">
      {categoryData.map((data, index) => (
        <CategoryCard data={data} key={index} />
      ))}
    </div>
  );
};

export default Category;
