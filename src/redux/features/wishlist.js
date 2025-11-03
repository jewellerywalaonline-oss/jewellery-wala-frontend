import { createSlice } from "@reduxjs/toolkit";


const getInitialState = (preloadedState) => ({
  wishlistItems: preloadedState?._data?.items || [],
  totalQuantity: preloadedState?._data?.items?.length || 0,
});

const initialState = getInitialState();

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  extraReducers: (builder) => {
    builder.addCase('REPLACE_STATE', (state, action) => {
      const newState = getInitialState(action.payload?.wishlist);
      return { ...state, ...newState };
    });
  },
  reducers: {
    addToWishlist: (state, action) => {
      if (state.wishlistItems.find(item => item._id === action.payload)) {
        return;
      } else {
        state.wishlistItems.push(action.payload);
      }
      
    },
    removeFromWishlist: (state, action) => {
      state.wishlistItems = state.wishlistItems.filter(
        (item) => item._id !== action.payload
      );
      state.totalQuantity = state.wishlistItems.length;
    },
  },
});



export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;