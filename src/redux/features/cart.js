import { createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";


const getInitialState = (preloadedState) => ({
  cartItems: preloadedState?._data?.items || [],
  totalPrice: preloadedState?._data?.totalPrice || 0,
  totalQuantity: preloadedState?._data?.totalItems || 0,
  buyNowItem: typeof window !== "undefined"
    && typeof window.sessionStorage !== "undefined"
    && sessionStorage.getItem("buyNowProduct")
    ? JSON.parse(sessionStorage.getItem("buyNowProduct"))
    : {
        productId: null,
        product: null,
        quantity: 1,
        colorId: null,
      },
});

const initialState = getInitialState();

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  extraReducers: (builder) => {
    builder.addCase("REPLACE_STATE", (state, action) => {
      const newState = getInitialState(action.payload?.cart);
      return { ...state, ...newState };
    });
  },
  reducers: {
    addToCart: (state, action) => {
      const { productId, quantity = 1, colorId } = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.productId === productId && item.colorId === colorId
      );

      if (existingItem) {
        if (existingItem.quantity + quantity > 10) {
          toast.error("Maximum quantity limit of 10 reached");
          return;
        }
        existingItem.quantity += quantity;
        // toast.success("Item quantity updated");
      } else {
        state.cartItems.push({
          ...action.payload,
          quantity: quantity,
        });
        // toast.success("Item added to cart");
      }
      state.totalQuantity = state.cartItems.reduce(
        (total, item) => total + item.quantity,
        0
      );
    },
    removeFromCart: (state, action) => {
      const { productId, colorId } = action.payload;
      state.cartItems = state.cartItems.filter(
        (item) => !(item.productId === productId && item.colorId === colorId)
      );
      state.totalQuantity = state.cartItems.reduce(
        (total, item) => total + item.quantity,
        0
      );
    },
    updateQuantity: (state, action) => {
      const { productId, quantity, colorId } = action.payload;
      const item = state.cartItems.find(
        (item) => item.productId === productId && item.colorId === colorId
      );

      if (item) {
        if (quantity > 10) {
          toast.error("Maximum quantity limit is 10");
          return;
        }
        if (quantity < 1) {
          state.cartItems = state.cartItems.filter(
            (i) => !(i.productId === productId && i.colorId === colorId)
          );
          // toast.success("Item removed from cart");
        } else {
          item.quantity = quantity;
        }
        state.totalQuantity = state.cartItems.reduce(
          (total, item) => total + item.quantity,
          0
        );
      }
    },
    updateFullCart: (state, action) => {
      state.cartItems = action.payload;
      state.totalQuantity = action.payload.reduce(
        (total, item) => total + (item.quantity || 0),
        0
      );
    },
    setBuyNowItem: (state, action) => {
      state.buyNowItem = action.payload;
      sessionStorage.setItem("buyNowProduct", JSON.stringify(action.payload));
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  totalQuantity,
  updateQuantity,
  updateFullCart,
  setBuyNowItem,
} = cartSlice.actions;
export default cartSlice.reducer;
