import Rating from "@mui/material/Rating";
import CurrencyFormat from "../CurrencyFormat";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Type } from "../../utility/action_type";
import { DataContext } from "../dataProvider/DataProvider";

const ProductCard = ({ data, _flex, addDesc, showButton }) => {
  const { id, title, image, price, rating, description } = data;

  const [state, dispatch] = useContext(DataContext);

  const addToCart = () => {
    dispatch({
      type: Type.ADD_TO_CART,
      item: {
        id,
        title,
        image,
        price,
        rating,
        description,
      },
    });
  };

  return (
    <div
      className={`group
      ${
        _flex
          ? "relative flex gap-[10px] h-auto px-[1%]"
          : "p-3 shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.12)] rounded-xl transform hover:scale-95 transition duration-300 px-5"
      }
    `}
    >
      <Link to={`/products/${id}`} className={`${_flex ? " w-[30%] " : ""}`}>
        <div
          className={`${
            _flex
              ? " flex-1 flex justify-center items-center overflow-hidden w-[80%] h-[60%] mx-auto my-[5%] "
              : ""
          }`}
        >
          <img
            src={image}
            alt={id}
            className={` object-contain ${
              _flex ? " max-h-full max-w-full " : "h-[200px] p-3"
            }`}
          />
        </div>
      </Link>

      <div
        className={` h-auto ${
          _flex ? "flex my-[1%] text-md w-[50%] gap-1 flex-col" : "w-full"
        } `}
      >
        <h3 className={`${_flex ? "text-lg font-bold" : ""}`}>{title}</h3>

        {/* description */}
        {addDesc && <p className="text-sm">{description}</p>}

        <div className={`${_flex ? "text-lg font-bold" : ""}`}>
          {/* rating  */}
          <Rating value={rating?.rate} precision={0.1} />

          {/* rating counter */}
          <small>{rating?.count}</small>
        </div>

        <div className={`${_flex ? "text-xl font-bold" : ""}`}>
          {/* price */}
          <CurrencyFormat amount={price} />
        </div>

        {showButton && (
          <button
            className={`rounded-sm px-5 mb-3 bg-[#e182347d] font-bold cursor-pointer py-1 ${
              _flex
                ? "block w-[30%] mt-[2%] transform hover:scale-110 transition-all duration-300"
                : " hidden group-hover:block w-[50%] absolute left-[25%] bottom-0"
            } `}
            onClick={addToCart}
          >
            Add to cart
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
