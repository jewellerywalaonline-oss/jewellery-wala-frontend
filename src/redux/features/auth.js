import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  user: Cookies.get("user") || null,
  isLogin: !!Cookies.get("user"),
  details: {},
};

export const authSlice = createSlice({
  name: "auth",
  initialState,

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
