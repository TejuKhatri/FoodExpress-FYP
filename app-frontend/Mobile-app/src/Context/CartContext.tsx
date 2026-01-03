import React, { createContext, useContext, useMemo, useReducer } from "react";

export type FoodItem = {
  _id: string;
  name: string;
  price: number;
  image: string; // URL
};

type CartState = {
  cartItems: Record<string, number>;
  foodList: FoodItem[];
};

type CartAction =
  | { type: "SET_FOOD_LIST"; payload: FoodItem[] }
  | { type: "ADD_TO_CART"; payload: { id: string } }
  | { type: "REMOVE_FROM_CART"; payload: { id: string } }
  | { type: "CLEAR_CART" };

const initialState: CartState = {
  cartItems: {},
  foodList: [
    // ✅ sample data (replace with API later)
    { _id: "1", name: "Momo", price: 120, image: "https://via.placeholder.com/100" },
    { _id: "2", name: "Chowmein", price: 150, image: "https://via.placeholder.com/100" },
    { _id: "3", name: "Burger", price: 250, image: "https://via.placeholder.com/100" },
  ],
};

function reducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "SET_FOOD_LIST":
      return { ...state, foodList: action.payload };

    case "ADD_TO_CART": {
      const id = action.payload.id;
      const current = state.cartItems[id] ?? 0;
      return {
        ...state,
        cartItems: { ...state.cartItems, [id]: current + 1 },
      };
    }

    case "REMOVE_FROM_CART": {
      const id = action.payload.id;
      const current = state.cartItems[id] ?? 0;
      const next = Math.max(0, current - 1);

      const newCart = { ...state.cartItems, [id]: next };
      if (next === 0) delete newCart[id];

      return { ...state, cartItems: newCart };
    }

    case "CLEAR_CART":
      return { ...state, cartItems: {} };

    default:
      return state;
  }
}

type CartContextType = {
  foodList: FoodItem[];
  cartItems: Record<string, number>;
  addToCart: (id: string) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  setFoodList: (items: FoodItem[]) => void;
  getTotalCartAmount: () => number;
};

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addToCart = (id: string) =>
    dispatch({ type: "ADD_TO_CART", payload: { id } });

  const removeFromCart = (id: string) =>
    dispatch({ type: "REMOVE_FROM_CART", payload: { id } });

  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  const setFoodList = (items: FoodItem[]) =>
    dispatch({ type: "SET_FOOD_LIST", payload: items });

  const getTotalCartAmount = () => {
    let total = 0;
    for (const f of state.foodList) {
      const qty = state.cartItems[f._id] ?? 0;
      total += f.price * qty;
    }
    return total;
  };

  const value = useMemo<CartContextType>(
    () => ({
      foodList: state.foodList,
      cartItems: state.cartItems,
      addToCart,
      removeFromCart,
      clearCart,
      setFoodList,
      getTotalCartAmount,
    }),
    [state.foodList, state.cartItems]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = (): CartContextType => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
};
