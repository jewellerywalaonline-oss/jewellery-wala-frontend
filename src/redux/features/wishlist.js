import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishlistItems: [],
  totalQuantity: 0,
};

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      if (state.wishlistItems.find((item) => item._id === action.payload._id)) {
        return;
      } else {
        state.wishlistItems.push(action.payload);
        state.totalQuantity = state.wishlistItems.length;
      }
    },
    removeFromWishlist: (state, action) => {
      state.wishlistItems = state.wishlistItems.filter(
        (item) => item._id !== action.payload._id
      );
      state.totalQuantity = state.wishlistItems.length;
    },
    setWishlist: (state, action) => {
      state.wishlistItems = action.payload;
      state.totalQuantity = action.payload.length;
    },
  },
});

export const { addToWishlist, removeFromWishlist, setWishlist } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;
