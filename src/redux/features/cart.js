import { createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";

const initialState = {
  cartItems: [],
  totalPrice: 0,
  totalQuantity: 0,
  buyNowItem: {
    productId: null,
    product: null,
    quantity: 1,
    colorId: null,
  },
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
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
      state.cartItems = action.payload.items;
      state.totalQuantity = action.payload.totalItems;
      state.totalPrice = action.payload.totalPrice;
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
