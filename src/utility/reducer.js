import { Type } from "./action_type";

export const initialState = {
  cart: [],
  user: null,
};
export const reducer = (state, action) => {
  switch (action.type) {
    case Type.ADD_TO_CART:
      //check for the existing item in cart
      const existingItem = state.cart.find(
        (item) => item.id === action.item.id
      );

      //if not exist
      if (!existingItem) {
        return {
          ...state,
          cart: [...state.cart, { ...action.item, amount: 1 }],
        };
      } else {
        const updatedCart = state.cart.map((item) =>
          item.id === action.item.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );

        return {
          ...state,
          cart: updatedCart,
        };
      }

    case Type.REMOVE_FROM_CART:
      //find an index of the target item
      const index = state.cart.findIndex((item) => item.id === action.id);

      //Cart
      let newCart = [...state.cart];

      if (index >= 0) {
        //check if the item exists
        if (newCart[index].amount > 1) {
          newCart[index] = {
            ...newCart[index],
            amount: newCart[index].amount - 1,
          };
        } else {
          newCart.splice(index, 1); //remove item, with provided index
        }
      }
      return {
        ...state,
        cart: newCart,
      };
    case Type.ADD_USER:
      return {
        ...state,
        user: action.user,
      };
    case Type.EMPTY_CART:
      return {
        ...state,
        cart: [],
      };

    default:
      return state;
  }
};
