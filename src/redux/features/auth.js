import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import axios from "axios";

const getInitialState = (preloadedState) => ({
  user: Cookies.get("user") || preloadedState?._data?._id || null,
  isLogin: !!(Cookies.get("user") || preloadedState?._data?._id),
  details: preloadedState?._data || {},
});

const initialState = getInitialState();

export const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder.addCase("REPLACE_STATE", (state, action) => {
      const newState = getInitialState(action.payload?.auth);
      return { ...state, ...newState };
    });
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      Cookies.set("user", action.payload, {
        path: "/",
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        expires: 7,
      });
      state.isLogin = true;
    },
    logout: (state) => {
      state.user = null;
      state.details = {};
      Cookies.remove("user");
      state.isLogin = false;
    },
    register: (state, action) => {
      state.user = action.payload;
      Cookies.set("user", action.payload, {
        path: "/",
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        expires: 7,
      });
      state.isLogin = true;
    },
    setProfile: (state, action) => {
      state.details = action.payload;
    },
  },
});

export const { login, logout, register, setProfile } = authSlice.actions;
export default authSlice.reducer;


