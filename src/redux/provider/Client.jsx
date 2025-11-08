"use client";

import { Provider } from "react-redux";

import { makeStore } from "../store/store";



export function Client({ children, preloadedState }) {
  const store = makeStore(preloadedState);



  return <Provider store={store}>{children}</Provider>;
}
