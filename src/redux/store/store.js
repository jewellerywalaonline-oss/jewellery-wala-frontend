import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth";
import cartReducer from "../features/cart";
import wishlistReducer from "../features/wishlist";
import filtersReducer from "../features/filters";
import uiReducer from "../features/uiSlice";
import logoReducer from "../features/logo";

export const makeStore = (preloadedState) => {
  const store = configureStore({
    reducer: {
      auth: authReducer,
      cart: cartReducer,
      wishlist: wishlistReducer,
      filters: filtersReducer,
      ui: uiReducer,
      logo: logoReducer,
    },
    preloadedState,
  });

  // Dispatch a REPLACE_STATE action to let each slice handle its own preloaded state
  if (preloadedState) {
    store.dispatch({
      type: "REPLACE_STATE",
      payload: preloadedState,
    });
  }

  return store;
};
